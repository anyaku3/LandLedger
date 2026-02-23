import { ethers } from "ethers";
import { readFileSync } from "fs";

const PRIVATE_KEY = "0x826ae3ec2c54eb861e74faf39b91de2caed4deb3b29503c1e0eecff2f917f52d";
const RPC_URL = "https://evmrpc-testnet.0g.ai";

const artifact = JSON.parse(readFileSync("./artifacts/contracts/LandLedger.sol/LandLedger.json", "utf8"));

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

async function main() {
  console.log("Deploying from:", wallet.address);
  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  console.log("LandLedger deployed to:", address);
  console.log("Explorer: https://chainscan-newton.0g.ai/address/" + address);
}

main().catch(console.error);