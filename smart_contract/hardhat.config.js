require("@nomiclabs/hardhat-waffle");             //plugin to build smart contract tests

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url:'https://eth-ropsten.alchemyapi.io/v2/BLKlnZanSYxLYj4_ZWGnHiuc4mQ-99G8',             //url from alchemy.com
      accounts: [ '2c661f6e9f141a4b6668fd2e29bf0945fc3e3051d3a5491fb9045e8e309635f2' ]    //account address - export private key and paste here
    }
  }
};

