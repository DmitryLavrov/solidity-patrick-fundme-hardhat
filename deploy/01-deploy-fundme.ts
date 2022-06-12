import {HardhatRuntimeEnvironment} from 'hardhat/types'
import {DeployFunction} from 'hardhat-deploy/types'
import {network} from 'hardhat'
import 'dotenv/config'
import {developmentChains, networkConfig} from '../hardhat-helper.config'
import {verify} from '../utils/verify'


const deployFundMe: DeployFunction = async function ({getNamedAccounts, deployments}: HardhatRuntimeEnvironment) {
  const {deploy, get, log} = deployments
  const {deployer} = await getNamedAccounts()
  const chainId = network.config.chainId || 31337

  let ethUsdPriceFeedAddress
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await get('MockV3Aggregator')
    ethUsdPriceFeedAddress = ethUsdAggregator.address
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId].ethUsdPriceFeed
  }

  const args = [ethUsdPriceFeedAddress]
  const contractFundMe = await deploy('FundMe', {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: networkConfig[chainId].blockConfirmations || 1
  })
  log("FundMe Deployed!")
  log("------------------------------------------------")

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    console.log('Waiting for block confirmations...')
    await verify(contractFundMe.address, args)
  }
}



export default deployFundMe
deployFundMe.tags = ["all", 'fundme']
