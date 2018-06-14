var HDWalletProvider = require("truffle-hdwallet-provider-privkey");
let testPrivateKey = 'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3';
let infuraRopsten = 'https://ropsten.infura.io/H4UAAWyThMPs2WB9LsHD ';
let infuraRinkeby = 'https://rinkeby.infura.io/H4UAAWyThMPs2WB9LsHD';
let infuraMainnet = 'https://mainnet.infura.io/H4UAAWyThMPs2WB9LsHD';

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    td: {
      host: "localhost",
      port: 9545,
      network_id: "*"
    },
    ganache: {
      host: "localhost",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(testPrivateKey, infuraRopsten)
      },
      network_id: 3,
      port: 8545,
      gas: 4700000
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(testPrivateKey, infuraRinkeby)
      },
      network_id: 4,
      port: 8545,
      gas: 4000000
    },
    live: {
      provider: function () {
        return new HDWalletProvider(testPrivateKey, infuraMainnet)
      },
      network_id: 1,
      port: 8545,
      gasPrice: 3000000000,
      gas: 4700000
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 999
    }
  }
};