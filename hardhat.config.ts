import { HardhatUserConfig } from "hardhat/config";
// @ts-ignore
import "@nomicfoundation/hardhat-ethers";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    zeroG: {
      type: "http",
      url: "https://evmrpc-testnet.0g.ai",
      chainId: 16600,
      accounts: ["0x826ae3ec2c54eb861e74faf39b91de2caed4deb3b29503c1e0eecff2f917f52d"] 
    }
  }
};

export default config;