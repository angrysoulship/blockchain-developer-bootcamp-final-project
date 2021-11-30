require("@nomiclabs/hardhat-ethers");
const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim();
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.5.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
