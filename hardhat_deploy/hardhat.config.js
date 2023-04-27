// require("@nomiclabs/hardhat-ethers");
// require("@nomicfoundation/hardhat-etherscan");
//require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");

const INFURA_API_KEY = "39aafadb8e5743f790b8dd5d44fac460";
const PRIVATE_KEY = "3704236986b74ef12e933c4a943dc7b018ee6370d19f27b20e3de2998ff93ff8";//process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.18",
  // networks: {
  //   mainnet: {
  //     url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
  //     accounts: [PRIVATE_KEY],
  //   },
  // },
  // etherscan: {
  //   apiKey: "4T1YQDCFPTYXWRT8U466FIS8JM4G7A8B22", // Replace with your Etherscan API key
  // },
  hardhat:{

  }
};
