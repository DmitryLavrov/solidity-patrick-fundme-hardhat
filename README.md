## Getting Started

### Prerequisites

```shell
npm i npm@latest -g
npm init -y
```

### Installation

```shell
npm i -D hardhat
npx hardhat
```

√ What do you want to do? · Create an advanced sample project that uses TypeScript  
√ Hardhat project root: · C:\Projects\solidity-patrick-simplestorage-hardhat   
√ Do you want to add a .gitignore? (Y/n) ·
y

You need to install these dependencies to run the sample project:

```shell
npm install --save-dev "hardhat@^2.9.9" "@nomiclabs/hardhat-waffle@^2.0.0" "ethereum-waffle@^3.0.0" "chai@^4.2.0" "@nomiclabs/hardhat-ethers@^2.0.0" "ethers@^5.0.0" "@nomiclabs/hardhat-etherscan@^3.0.0" "dotenv@^16.0.0" "eslint@^7.29.0" "eslint-config-prettier@^8.3.0" "eslint-config-standard@^16.0.3" "eslint-plugin-import@^2.23.4" "eslint-plugin-node@^11.1.0" "eslint-plugin-prettier@^3.4.0" "eslint-plugin-promise@^5.1.0" "hardhat-gas-reporter@^1.0.4" "prettier@^2.3.2" "prettier-plugin-solidity@^1.0.0-beta.13" "solhint@^3.3.6" "solidity-coverage@^0.7.16" "@typechain/ethers-v5@^7.0.1" "@typechain/hardhat@^2.3.0" "@typescript-eslint/eslint-plugin@^4.29.1" "@typescript-eslint/parser@^4.29.1" "@types/chai@^4.2.21" "@types/node@^12.0.0" "@types/mocha@^9.0.0" "ts-node@^10.1.0" "typechain@^5.1.2" "typescript@^4.5.2"
```
```shell
npm i -D @chainlink/contracts
npm i -D hardhat-deploy
npm i -D @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers
```


## Resources

Lesson 7 of the FreeCodeCamp Solidity & Javascript Blockchain Course
* https://github.com/PatrickAlphaC/hardhat-fund-me-fcc

Chainlink Smart Contracts
* https://www.npmjs.com/package/@chainlink/contracts

Plugin hardhat-deploy
* https://www.npmjs.com/package/hardhat-deploy

Ethereum Data Feeds
* https://docs.chain.link/docs/ethereum-addresses/

🟡 smartcontractkit/chainlink
* https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/tests/MockV3Aggregator.sol
* https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/tests/MockV3Aggregator.sol

Chainlist - a list of EVM networks
* https://chainlist.org/

Solidity Style Guide
* https://docs.soliditylang.org/en/v0.8.14/style-guide.html?highlight=style

Reverted - testing with Waffle 
* https://ethereum-waffle.readthedocs.io/en/latest/matchers.html?highlight=reverted#revert

BigNumber methods
* https://docs.ethers.io/v5/api/utils/bignumber/#BigNumber--methods

Tx details: gasUsed and effectiveGasPrice
* https://docs.ethers.io/v5/api/providers/types/#types--transactions

🟡 Solidity console.log
* https://hardhat.org/tutorial/debugging-with-hardhat-network




# Usage

## Useful commands

```shell
# Check all smart projects with Solhint
npx solhint contracts/*.sol

# Delete folder artefacts and clear folder cash
npx hardhat clean

# Compile files in ./contracts
npx hardhat compile

# Deploy only modules with tags "mocks"
npx hardhat deploy --tags mocks

# Deploy to localhost
# First start node in separate terminal: npx hardhat node
npx hardhat deploy --network localhost

# Deploy to Ganache (and verify)
npx hardhat deploy --network ganache

# Generate typescript interfaces
npx hardhat typechain

# Run tests
npx hardhat test

# Code coverage for Solidity tests
npx hardhat coverage

# Run staging tests (on test network only)
npx hardhat deploy --network rinkeby
npx hardhat test --network rinkeby

# Run scripts on localhost
# First start node in separate terminal: npx hardhat node
npx hardhat run scripts/fund.ts --network localhost
npx hardhat run scripts/withdraw.ts --network localhost
```
