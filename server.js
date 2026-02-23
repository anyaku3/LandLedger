const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const SELLER_WALLET = "0xecf32e35d8f35095516d8ef2bdd2a9514fde3886";

// Serve frontend files
app.use(express.static(path.join(__dirname, "frontend")));

// Store active purchase requests
let purchaseRequests = {};
// Store parcel ownership (starts with defaults, updates on transfer)
let parcelOwners = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Send current state to newly connected user
  socket.emit("currentState", { purchaseRequests, parcelOwners });

  // Buyer locks escrow and sends purchase request
  socket.on("purchaseRequest", (data) => {
    const { parcelId, buyerWallet, offerAmount, parcelValue } = data;
    const minRequired = parcelValue * 0.75;

    if (offerAmount < minRequired) {
      socket.emit("escrowRejected", {
        message: `Minimum escrow required is ₦${minRequired.toLocaleString()} (75% of parcel value). Your offer: ₦${offerAmount.toLocaleString()}`
      });
      return;
    }

    purchaseRequests[parcelId] = {
      buyerWallet,
      offerAmount,
      parcelValue,
      status: "pending",
      timestamp: new Date().toISOString()
    };

    // Notify all connected clients (seller will see it)
    io.emit("newPurchaseRequest", {
      parcelId,
      buyerWallet,
      offerAmount,
      parcelValue
    });

    socket.emit("escrowLocked", {
      message: `Escrow of ₦${offerAmount.toLocaleString()} locked. Waiting for seller to review your offer.`
    });

    console.log(`Purchase request: Parcel ${parcelId} | Buyer: ${buyerWallet} | Offer: ${offerAmount}`);
  });

  // Seller accepts and sets agreed price
  socket.on("sellerAccept", (data) => {
    const { parcelId, agreedPrice, sellerWallet } = data;

    if (sellerWallet.toLowerCase() !== SELLER_WALLET.toLowerCase()) {
      socket.emit("error", { message: "Unauthorized: Only the parcel owner can accept." });
      return;
    }

    const request = purchaseRequests[parcelId];
    if (!request) return;

    request.status = "accepted";
    request.agreedPrice = agreedPrice;

    io.emit("purchaseAccepted", {
      parcelId,
      agreedPrice,
      buyerWallet: request.buyerWallet,
      lockedAmount: request.offerAmount
    });

    console.log(`Seller accepted: Parcel ${parcelId} | Agreed price: ${agreedPrice}`);
  });

  // Seller rejects
  socket.on("sellerReject", (data) => {
    const { parcelId, sellerWallet } = data;

    if (sellerWallet.toLowerCase() !== SELLER_WALLET.toLowerCase()) {
      socket.emit("error", { message: "Unauthorized." });
      return;
    }

    const request = purchaseRequests[parcelId];
    if (!request) return;

    request.status = "rejected";
    io.emit("purchaseRejected", {
      parcelId,
      buyerWallet: request.buyerWallet,
      message: "Seller rejected the offer. Your escrow has been released."
    });

    delete purchaseRequests[parcelId];
  });

  // Buyer completes transfer
  socket.on("completeTransfer", (data) => {
    const { parcelId, buyerWallet } = data;
    const request = purchaseRequests[parcelId];
    if (!request || request.status !== "accepted") return;

    // Update ownership
    parcelOwners[parcelId] = {
      newOwner: buyerWallet,
      previousOwner: SELLER_WALLET,
      agreedPrice: request.agreedPrice,
      transferTime: new Date().toISOString()
    };

    io.emit("transferComplete", {
      parcelId,
      newOwner: buyerWallet,
      previousOwner: SELLER_WALLET,
      agreedPrice: request.agreedPrice
    });

    delete purchaseRequests[parcelId];
    console.log(`Transfer complete: Parcel ${parcelId} → ${buyerWallet}`);
  });

  // Either party cancels
  socket.on("cancelTransaction", (data) => {
    const { parcelId, cancelledBy } = data;
    const request = purchaseRequests[parcelId];
    if (!request) return;

    io.emit("transactionCancelled", {
      parcelId,
      cancelledBy,
      message: "Transaction cancelled. Escrow released back to buyer."
    });

    delete purchaseRequests[parcelId];
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`LandLedger server running on http://localhost:${PORT}`);
  console.log(`Seller wallet: ${SELLER_WALLET}`);
});