import {task} from 'hardhat/config'
import '@nomiclabs/hardhat-ethers/internal/type-extensions'

export default task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})
