import {deployments, ethers, getNamedAccounts} from 'hardhat'

async function main() {
  const deployer = (await getNamedAccounts()).deployer
  const contractFundMe = await ethers.getContract('FundMe', deployer)

  console.log('Withdrawal from contract...')
  const txResponse = await contractFundMe.withdraw()
  await txResponse.wait(1)

  console.log('Withdrawn!',)

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
