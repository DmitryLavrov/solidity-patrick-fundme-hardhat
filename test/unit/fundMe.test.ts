import {beforeEach} from 'mocha'
import {deployments, getNamedAccounts, ethers, network} from 'hardhat'
import {FundMe, MockV3Aggregator} from '../../typechain'
import {assert, expect} from 'chai'
import {developmentChains} from '../../hardhat-helper.config'

!developmentChains.includes(network.name)
  ? describe.skip
  : describe('FundMe', () => {
    let contractFundMe: FundMe
    let deployer: string
    let contractMockV3Aggregator: MockV3Aggregator
    let sendValue = ethers.utils.parseEther('1') // 1ETH

    beforeEach(async () => {
      // Get accountZero
      deployer = (await getNamedAccounts()).deployer

      // Deploy all modules
      await deployments.fixture(['all'])

      //Get contract FundMe
      contractFundMe = await ethers.getContract('FundMe', deployer)

      //Get contract MockV3Aggregator
      contractMockV3Aggregator = await ethers.getContract('MockV3Aggregator', deployer)
    })

    describe('constructor', () => {
      it('set the MockV3Aggregator address correctly', async () => {
        const response = await contractFundMe.getPriceFeed()
        assert.equal(response, contractMockV3Aggregator.address)
      })
    })

    describe('function fund', () => {
      it('fails if we don\'t have enough ETH', async () => {
        expect(contractFundMe.fund()).to.be.revertedWith('You need to spend more ETH!')
      })
      it('addressToAmountFunded updated correctly', async () => {
        await contractFundMe.fund({value: sendValue})
        const response = await contractFundMe.getAddressToAmountFunded(deployer)
        assert.equal(response.toString(), sendValue.toString())
      })
      it('adds funder to array funders', async () => {
        await contractFundMe.fund({value: sendValue})
        const response = await contractFundMe.getFunder(0)
        assert.equal(response, deployer)
      })
    })

    describe('function withdraw', () => {
      beforeEach(async () => {
        await contractFundMe.fund({value: sendValue})
      })

      it('withdraw from a single funder', async () => {
        const startingFundMeBalance = await contractFundMe.provider.getBalance(contractFundMe.address)
        const startingDeployerBalance = await contractFundMe.provider.getBalance(deployer)

        const txResponse = await contractFundMe.withdraw()
        const txReceipt = await txResponse.wait(1)

        const endingFundMeBalance = await contractFundMe.provider.getBalance(contractFundMe.address)
        const endingDeployerBalance = await contractFundMe.provider.getBalance(deployer)

        const gasCost = txReceipt.gasUsed.mul(txReceipt.effectiveGasPrice)

        assert.isTrue(endingFundMeBalance.isZero())
        assert.equal(startingDeployerBalance.add(startingFundMeBalance).toString(),
          endingDeployerBalance.add(gasCost).toString())
      })
      it('withdraw from several funders', async () => {
        const accounts = await ethers.getSigners()
        for (let i = 1; i < 16; i++) {
          const contractFundMeConnectedToNonDeployer = await contractFundMe.connect(accounts[i])
          await contractFundMeConnectedToNonDeployer.fund({value: sendValue})
        }

        const startingFundMeBalance = await contractFundMe.provider.getBalance(contractFundMe.address)
        const startingDeployerBalance = await contractFundMe.provider.getBalance(deployer)

        const txResponse = await contractFundMe.withdraw()
        const txReceipt = await txResponse.wait(1)

        const endingFundMeBalance = await contractFundMe.provider.getBalance(contractFundMe.address)
        const endingDeployerBalance = await contractFundMe.provider.getBalance(deployer)

        const gasCost = txReceipt.gasUsed.mul(txReceipt.effectiveGasPrice)

        assert.isTrue(endingFundMeBalance.isZero())
        assert.equal(startingDeployerBalance.add(startingFundMeBalance).toString(),
          endingDeployerBalance.add(gasCost).toString())

        for (let i = 1; i < 16; i++) {
          assert.isTrue((await contractFundMe.getAddressToAmountFunded(accounts[i].address)).isZero())
        }
      })
      it('allows withdrawal only to the owner', async () => {
        const accounts = await ethers.getSigners()
        const attacker = accounts[2]
        const contractFundMeConnectedToAttacker = await contractFundMe.connect(attacker)

        expect(contractFundMeConnectedToAttacker.withdraw()).to.be.revertedWith('FundMe__NotOwner')
      })
      it('cheaperWithdraw from several funders', async () => {
        const accounts = await ethers.getSigners()
        for (let i = 1; i < 16; i++) {
          const contractFundMeConnectedToNonDeployer = await contractFundMe.connect(accounts[i])
          await contractFundMeConnectedToNonDeployer.fund({value: sendValue})
        }

        const startingFundMeBalance = await contractFundMe.provider.getBalance(contractFundMe.address)
        const startingDeployerBalance = await contractFundMe.provider.getBalance(deployer)

        const txResponse = await contractFundMe.cheaperWithdraw()
        const txReceipt = await txResponse.wait(1)

        const endingFundMeBalance = await contractFundMe.provider.getBalance(contractFundMe.address)
        const endingDeployerBalance = await contractFundMe.provider.getBalance(deployer)

        const gasCost = txReceipt.gasUsed.mul(txReceipt.effectiveGasPrice)

        assert.isTrue(endingFundMeBalance.isZero())
        assert.equal(startingDeployerBalance.add(startingFundMeBalance).toString(),
          endingDeployerBalance.add(gasCost).toString())

        for (let i = 1; i < 16; i++) {
          assert.isTrue((await contractFundMe.getAddressToAmountFunded(accounts[i].address)).isZero())
        }
      })


    })

  })
