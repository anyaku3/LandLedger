const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const SELLER_WALLET = "0xecf32e35d8f35095516d8ef2bdd2a9514fde3886";

app.use(express.static(path.join(__dirname, "frontend")));

// purchaseRequests[parcelId] = array of buyer requests
let purchaseRequests = {};
let parcelOwners = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.emit("currentState", { purchaseRequests, parcelOwners });

  // Buyer locks escrow and sends purchase request
  socket.on("purchaseRequest", (data) => {
    const { parcelId, buyerWallet, offerAmount, parcelValue } = data;
    const minRequired = Math.floor(parcelValue * 0.75);

    if (offerAmount < minRequired) {
      socket.emit("escrowRejected", {
        message: `Minimum escrow is ₦${minRequired.toLocaleString()} (75% of listed value). You offered ₦${offerAmount.toLocaleString()}.`
      });
      return;
    }

    // Initialize array for this parcel if needed
    if (!purchaseRequests[parcelId]) {
      purchaseRequests[parcelId] = [];
    }

    // Check if this buyer already has a pending request
    const existing = purchaseRequests[parcelId].find(r => r.buyerWallet.toLowerCase() === buyerWallet.toLowerCase());
    if (existing) {
      socket.emit("escrowRejected", { message: "You already have a pending request on this parcel." });
      return;
    }

    const request = {
      buyerWallet,
      offerAmount,
      parcelValue,
      status: "pending",
      timestamp: new Date().toISOString()
    };

    purchaseRequests[parcelId].push(request);

    // Notify seller with full list of buyers for this parcel
    io.emit("purchaseRequestsUpdated", {
      parcelId,
      requests: purchaseRequests[parcelId]
    });

    socket.emit("escrowLocked", {
      message: `✅ Escrow of ₦${offerAmount.toLocaleString()} locked. Seller is reviewing your request.`
    });

    console.log(`New request: Parcel ${parcelId} | Buyer: ${buyerWallet} | Offer: ₦${offerAmount.toLocaleString()}`);
  });

  // Seller accepts ONE specific buyer and sets agreed price
  socket.on("sellerAccept", (data) => {
    const { parcelId, buyerWallet, agreedPrice, sellerWallet } = data;

    if (sellerWallet.toLowerCase() !== SELLER_WALLET.toLowerCase()) {
      socket.emit("error", { message: "Unauthorized." });
      return;
    }

    const requests = purchaseRequests[parcelId];
    if (!requests) return;

    const request = requests.find(r => r.buyerWallet.toLowerCase() === buyerWallet.toLowerCase());
    if (!request) return;

    request.status = "accepted";
    request.agreedPrice = agreedPrice;

    // Notify the specific buyer
    io.emit("purchaseAccepted", {
      parcelId,
      agreedPrice,
      buyerWallet: request.buyerWallet,
      lockedAmount: request.offerAmount
    });

    console.log(`Accepted: Parcel ${parcelId} | Buyer: ${buyerWallet} | Agreed: ₦${agreedPrice.toLocaleString()}`);
  });

  // Seller rejects ONE specific buyer
  socket.on("sellerReject", (data) => {
    const { parcelId, buyerWallet, sellerWallet } = data;

    if (sellerWallet.toLowerCase() !== SELLER_WALLET.toLowerCase()) {
      socket.emit("error", { message: "Unauthorized." });
      return;
    }

    if (!purchaseRequests[parcelId]) return;

    purchaseRequests[parcelId] = purchaseRequests[parcelId].filter(
      r => r.buyerWallet.toLowerCase() !== buyerWallet.toLowerCase()
    );

    io.emit("purchaseRejected", {
      parcelId,
      buyerWallet,
      message: "Seller rejected your offer. Your escrow has been released."
    });

    // Update seller's list
    io.emit("purchaseRequestsUpdated", {
      parcelId,
      requests: purchaseRequests[parcelId]
    });
  });

  // Buyer completes transfer
  socket.on("completeTransfer", (data) => {
    const { parcelId, buyerWallet } = data;
    if (!purchaseRequests[parcelId]) return;

    const request = purchaseRequests[parcelId].find(
      r => r.buyerWallet.toLowerCase() === buyerWallet.toLowerCase() && r.status === "accepted"
    );
    if (!request) return;

    // Record ownership transfer
    parcelOwners[parcelId] = {
      newOwner: buyerWallet,
      previousOwner: SELLER_WALLET,
      agreedPrice: request.agreedPrice,
      transferTime: new Date().toISOString()
    };

    // Release escrow of all OTHER buyers (they lose this parcel)
    const otherBuyers = purchaseRequests[parcelId].filter(
      r => r.buyerWallet.toLowerCase() !== buyerWallet.toLowerCase()
    );

    otherBuyers.forEach(r => {
      io.emit("purchaseRejected", {
        parcelId,
        buyerWallet: r.buyerWallet,
        message: "This parcel was sold to another buyer. Your escrow has been released."
      });
    });

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
    const { parcelId, cancelledBy, buyerWallet } = data;
    if (!purchaseRequests[parcelId]) return;

    purchaseRequests[parcelId] = purchaseRequests[parcelId].filter(
      r => r.buyerWallet.toLowerCase() !== buyerWallet.toLowerCase()
    );

    io.emit("transactionCancelled", {
      parcelId,
      cancelledBy,
      buyerWallet,
      message: "Transaction cancelled. Escrow released back to buyer."
    });

    io.emit("purchaseRequestsUpdated", {
      parcelId,
      requests: purchaseRequests[parcelId]
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`LandLedger server running on http://localhost:${PORT}`);
  console.log(`Seller wallet: ${SELLER_WALLET}`);
  console.log(`Contract: 0x13E8EF43891bc65eD714965E124FCD60CBA0ca32`);
});