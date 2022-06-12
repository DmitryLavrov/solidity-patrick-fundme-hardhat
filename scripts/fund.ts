import {deployments, ethers, getNamedAccounts} from 'hardhat'

async function main() {
  let sendValue = ethers.utils.parseEther('1') // 1ETH
  const deployer = (await getNamedAccounts()).deployer
  // await deployments.fixture(['all'])
  const contractFundMe = await ethers.getContract('FundMe', deployer)

  console.log('Funding contract...')
  const txResponse = await contractFundMe.fund({value: sendValue})
  await txResponse.wait(1)

  console.log('Funded!',)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
