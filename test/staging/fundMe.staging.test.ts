import {developmentChains} from '../../hardhat-helper.config'
import {deployments, ethers, getNamedAccounts, network} from 'hardhat'
import {FundMe, MockV3Aggregator} from '../../typechain'
import {beforeEach} from 'mocha'
import {assert} from 'chai'

developmentChains.includes(network.name)
  ? describe.skip
  : describe('FundMe', () => {
    let contractFundMe: FundMe
    let deployer: string
    let sendValue = ethers.utils.parseEther('0.1') // 1ETH

    beforeEach(async () => {
      // Get accountZero
      deployer = (await getNamedAccounts()).deployer

      //Get contract FundMe
      contractFundMe = await ethers.getContract('FundMe', deployer)
    })

    it('allow people to fund and withdraw', async () => {
      await contractFundMe.fund({value: sendValue})
      await contractFundMe.withdraw()
      const endingFundMeBalance = await contractFundMe.provider.getBalance(contractFundMe.address)
      assert.isTrue(endingFundMeBalance.isZero())
    })
  })
