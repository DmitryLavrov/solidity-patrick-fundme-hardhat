export interface NetworkConfigItem {
  ethUsdPriceFeed?: string
  name: string
  blockConfirmations?: number
}

export interface NetworkConfig {
  [key: number]: NetworkConfigItem
}

const networkConfig: NetworkConfig = {
  4: {
    name: 'rinkeby',
    ethUsdPriceFeed: '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e',
    blockConfirmations: 3
  },
  42: {
    name: 'kovan',
    ethUsdPriceFeed: '0x9326BFA02ADD2366b30bacB125260Af641031331',
  },
  31337: {
    name: 'localhost',
  },
  1337: {
    name: 'ganache',
  }
}

const developmentChains = ['hardhat', 'localhost', 'ganache']

const DECIMALS = 8
const INITIAL_PRICE = 200000000000

export {
  networkConfig,
  developmentChains,
  DECIMALS,
  INITIAL_PRICE
}
