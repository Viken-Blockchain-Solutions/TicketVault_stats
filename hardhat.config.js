require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

let secret = require("./secret");

module.exports = {
  solidity: "0.8.12",
  networks: {
    ropsten: {
      url: secret.url,
      accounts: [secret.private_key]
    }
  },
  etherscan: {
    apiKey: secret.apiKey
  }
};