import { ethers } from "hardhat";

async function main() {
  console.log("Deploying LandLedger to 0G Chain...");
  const [deployer] = await ethers.getSigners();
  console.log("Deploying from wallet:", deployer.address);
  const LandLedger = await ethers.getContractFactory("LandLedger");
  const landLedger = await LandLedger.deploy();
  await landLedger.waitForDeployment();
  const address = await landLedger.getAddress();
  console.log("LandLedger deployed to:", address);
  console.log("Explorer: https://chainscan-newton.0g.ai/address/" + address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});