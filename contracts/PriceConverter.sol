// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice(AggregatorV3Interface _priceFeed) internal view returns (uint256) {
//        // Rinkeby ETH / USD Address
//        // https://docs.chain.link/docs/ethereum-addresses/
//        AggregatorV3Interface priceFeed = AggregatorV3Interface(
//            0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
//        );
        (, int256 answer, , , ) = _priceFeed.latestRoundData();
        // price = 176579000000 i.e. 1765 * 1e8
        return uint256(answer);
    }

    function getConversionRate(uint256 _weiAmount, AggregatorV3Interface _priceFeed) internal view returns (uint256) {
        uint256 ethPrice = getPrice(_priceFeed);
        uint256 ethAmountInUsd = (ethPrice * _weiAmount) / 1e8;
        // the actual ETH/USD conversation rate, multiplied by 1e18.
        return ethAmountInUsd;
    }
}
