import {DeployFunction} from 'hardhat-deploy/types'
import {HardhatRuntimeEnvironment} from 'hardhat/types'
import {network} from 'hardhat'
import {developmentChains, DECIMALS, INITIAL_PRICE} from '../hardhat-helper.config'

const deployMocks: DeployFunction = async function ({getNamedAccounts, deployments}: HardhatRuntimeEnvironment) {
  const {deploy, log} = deployments
  const {deployer} = await getNamedAccounts()
  const chainId = network.config.chainId
//--------------------------
  console.log('network.config.chainId',network.config.chainId)
  console.log('network.name',network.name)
  //--------------------------


  if (developmentChains.includes(network.name)) {
    log("Local network detected! Deploying mocks...")
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_PRICE],
    })
    log("Mocks Deployed!")
    log("------------------------------------------------")
  }

}

export default deployMocks
deployMocks.tags = ["all", "mocks"]
