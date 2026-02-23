const { ZgFile, Indexer } = require("@0glabs/0g-ts-sdk");
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

// 0G Testnet configuration
const RPC_URL = "https://evmrpc-testnet.0g.ai";
const INDEXER_URL = "https://indexer-storage-testnet-standard.0g.ai";

// Your wallet private key - paste it here when tokens arrive
const PRIVATE_KEY = "YOUR_PRIVATE_KEY_HERE";

async function uploadDocument() {
  console.log("🏛️  LandLedger - 0G Storage Upload");
  console.log("=====================================");

  // Create a sample land title document
  const sampleDocument = {
    title: "Certificate of Occupancy",
    parcel: "14 Zik Avenue, Uwani, Enugu",
    parcelId: 1,
    surveyPlan: "EN/UW/2019/0042",
    area: "1200 sqm",
    owner: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    issuedBy: "Enugu State Ministry of Lands",
    date: "2019-03-15",
    legalDescription: "Being all that piece of land situated at 14 Zik Avenue, Uwani, Enugu State, Nigeria. Bounded on the North by Plot 13, on the South by Plot 15, on the East by Zik Avenue, and on the West by the adjoining property.",
    verified: true,
    timestamp: new Date().toISOString()
  };

  // Save document to a temp file
  const docPath = path.join(__dirname, "temp_land_doc.json");
  fs.writeFileSync(docPath, JSON.stringify(sampleDocument, null, 2));
  console.log("📄 Sample land document created");

  try {
    // Connect to 0G network
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    console.log("🔗 Connected to 0G testnet");
    console.log("👛 Wallet:", wallet.address);

    // Check balance
    const balance = await provider.getBalance(wallet.address);
    console.log("💰 Balance:", ethers.formatEther(balance), "A0GI");

    if (balance === 0n) {
      console.log("❌ No tokens! Please get tokens from https://faucet.0g.ai first");
      return;
    }

    // Create 0G file object
    const zgFile = await ZgFile.fromFilePath(docPath);
    const [tree, treeErr] = await zgFile.merkleTree();
    if (treeErr) throw new Error("Merkle tree error: " + treeErr);

    const rootHash = tree.rootHash();
    console.log("\n📦 File prepared for upload");
    console.log("🌳 Root Hash:", rootHash);

    // Upload to 0G Storage
    console.log("\n⏳ Uploading to 0G Storage...");
    const indexer = new Indexer(INDEXER_URL);
    const [tx, uploadErr] = await indexer.upload(zgFile, 0, RPC_URL, wallet);
    if (uploadErr) throw new Error("Upload error: " + uploadErr);

    console.log("\n✅ SUCCESS! Document uploaded to 0G Storage");
    console.log("📋 Transaction Hash:", tx);
    console.log("🌳 Root Hash:", rootHash);
    console.log("\n--- SAVE THESE FOR YOUR DEMO ---");
    console.log("Root Hash:", rootHash);
    console.log("Transaction:", tx);
    console.log("--------------------------------");

    // Clean up temp file
    fs.unlinkSync(docPath);

  } catch (err) {
    console.error("❌ Error:", err.message);
    // Clean up temp file if it exists
    if (fs.existsSync(docPath)) fs.unlinkSync(docPath);
  }
}

uploadDocument();