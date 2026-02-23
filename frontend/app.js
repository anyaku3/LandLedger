var parcelsData = [
  { id: 1,  status: "For Sale",   lat: 6.4358389, lng: 7.4933086, label: "14 Zik Avenue, Uwani, Enugu",                        size: "1,200 sqm", value: "₦180,000,000", owner: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", coOwners: [], previousOwners: ["0x2546BcD3c84621e976D8185a91A922aE77ECEc30"], disputes: "None", documentHash: "QmX7b9Kp2mN8vR4tL6wQ1sA3dF5gH7jM9nP0rT2uW4xY" },
  { id: 2,  status: "For Sale",   lat: 6.4535843, lng: 7.4813147, label: "7 Abakaliki Road, GRA, Enugu",                        size: "850 sqm",   value: "₦320,000,000", owner: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2", coOwners: [], previousOwners: [], disputes: "None", documentHash: "QmY9k2Lp3mR5vS6tM7wN1sB4dG6hI8jK0nQ2rU4wX5yZ" },
  { id: 3,  status: "For Sale",   lat: 6.4380956, lng: 7.4908429, label: "22 Ogui Road, Asata, Enugu",                          size: "2,000 sqm", value: "₦95,000,000",  owner: "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db", coOwners: [], previousOwners: ["0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB", "0x617F2E2fD72FD9D5503197092aC168c91465E7f2"], disputes: "Inheritance dispute — two siblings contesting ownership following death of original titleholder (2023, ongoing)", documentHash: "QmZ3p1Nq4mS6wT7uO8xP2tC5eH7iJ9kL1oR3sV5xY6zA" },
  { id: 4,  status: "For Sale",   lat: 6.4578371, lng: 7.5084497, label: "5 Chime Avenue, New Haven, Enugu",                    size: "600 sqm",   value: "₦120,000,000", owner: "0x17F6AD8Ef982297579C203069C1DbfFE4348c372", coOwners: ["0x5c6B0f7Bf3E7ce046C5A8A1aB1B2f1E4e8B9d3F1"], previousOwners: [], disputes: "None", documentHash: "QmA5q8Or5nT7xU8vP9yQ3uD6fI8jK0lM2pS4tW6yZ7aB" },
  { id: 5,  status: "For Sale",   lat: 6.4776484, lng: 7.4891473, label: "7 Dhamija Avenue, Trans-Ekulu, Enugu",                size: "1,500 sqm", value: "₦145,000,000", owner: "0x9Ac15dF80e1cBfC2b59C5c40E2f0A3c1B6d4E7A2", coOwners: [], previousOwners: [], disputes: "None", documentHash: "QmB7r4Ps6oU8yV9wQ0zA4vE7gJ9kL1mN3qT5uX7zA8bC" },
  { id: 6,  status: "Registered", lat: 6.4884808, lng: 7.4973599, label: "3 Edda Street, Nike Lake Road, Enugu",                size: "900 sqm",   value: "₦95,000,000",  owner: "0x3Fd8e1A2b3C4d5E6f7A8b9C0d1E2f3A4b5C6d7E8", coOwners: [], previousOwners: [], disputes: "None", documentHash: "QmC1d2E3f4A5b6C7d8E9f0A1b2C3d4E5f6A7b8C9d0E1" },
  { id: 7,  status: "Registered", lat: 6.4167648, lng: 7.4901098, label: "108 Agbani Road, Uwani, Enugu",                       size: "780 sqm",   value: "₦75,000,000",  owner: "0x1Ac2b3C4d5E6f7A8b9C0d1E2f3A4b5C6d7E8f9A0", coOwners: [], previousOwners: ["0x2Bd3c4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9a0B1"], disputes: "None", documentHash: "QmD2e3F4a5B6c7D8e9F0a1B2c3D4e5F6a7B8c9D0e1F2" },
  { id: 8,  status: "Registered", lat: 6.4391841, lng: 7.4929467, label: "9 Carter Street, Asata, Enugu",                       size: "1,100 sqm", value: "₦110,000,000", owner: "0x5Ef6a7B8c9D0e1F2a3B4c5D6e7F8a9B0c1D2e3F4", coOwners: ["0x6Fg7h8I9j0K1l2M3n4O5p6Q7r8S9t0U1v2W3x4Y5"], previousOwners: [], disputes: "None", documentHash: "QmE3f4A5b6C7d8E9f0A1b2C3d4E5f6A7b8C9d0E1f2A3" },
  { id: 9,  status: "Registered", lat: 6.4423280, lng: 7.4878740, label: "1 Temple Avenue, GRA, Enugu",                         size: "650 sqm",   value: "₦280,000,000", owner: "0x7Gh8i9J0k1L2m3N4o5P6q7R8s9T0u1V2w3X4y5Z6", coOwners: [], previousOwners: ["0x8Hi9j0K1l2M3n4O5p6Q7r8S9t0U1v2W3x4Y5z6A7"], disputes: "Prior purchase dispute — resolved 2021, court-confirmed current owner", documentHash: "QmF4a5B6c7D8e9F0a1B2c3D4e5F6a7B8c9D0e1F2a3B4" },
  { id: 10, status: "Registered", lat: 6.4402348, lng: 7.5030285, label: "46 Presidential Road, Asata, Enugu",                  size: "2,200 sqm", value: "₦410,000,000", owner: "0x9Ij0k1L2m3N4o5P6q7R8s9T0u1V2w3X4y5Z6a7B8", coOwners: [], previousOwners: [], disputes: "None", documentHash: "QmG5b6C7d8E9f0A1b2C3d4E5f6A7b8C9d0E1f2A3b4C5" },
  { id: 11, status: "Registered", lat: 6.4248375, lng: 7.4931297, label: "6 Robinson Street, Uwani, Enugu",                     size: "500 sqm",   value: "₦55,000,000",  owner: "0xAb1c2D3e4F5a6B7c8D9e0F1a2B3c4D5e6F7a8B9c0", coOwners: [], previousOwners: [], disputes: "None", documentHash: "QmH6c7D8e9F0a1B2c3D4e5F6a7B8c9D0e1F2a3B4c5D6" },
  { id: 12, status: "Registered", lat: 6.4803096, lng: 7.4956605, label: "3 Mission Avenue, Trans-Ekulu, Enugu",                size: "830 sqm",   value: "₦88,000,000",  owner: "0xBc2d3E4f5A6b7C8d9E0f1A2b3C4d5E6f7A8b9C0d1", coOwners: ["0xCd3e4F5a6B7c8D9e0F1a2B3c4D5e6F7a8B9c0D1e2"], previousOwners: [], disputes: "None", documentHash: "QmI7d8E9f0A1b2C3d4E5f6A7b8C9d0E1f2A3b4C5d6E7" },
  { id: 13, status: "Registered", lat: 6.4496494, lng: 7.5340543, label: "5 Idemili Drive, Independence Layout, Enugu",         size: "420 sqm",   value: "₦138,000,000", owner: "0xDe4f5A6b7C8d9E0f1A2b3C4d5E6f7A8b9C0d1E2f3", coOwners: [], previousOwners: [], disputes: "None", documentHash: "QmJ8e9F0a1B2c3D4e5F6a7B8c9D0e1F2a3B4c5D6e7F8" },
  { id: 14, status: "Registered", lat: 6.4582773, lng: 7.5600337, label: "10 Industrial Layout, Emene, Enugu",                  size: "3,500 sqm", value: "₦62,000,000",  owner: "0xEf5a6B7c8D9e0F1a2B3c4D5e6F7a8B9c0D1e2F3a4", coOwners: [], previousOwners: [], disputes: "Boundary dispute with adjacent plot (Plot 11) — filed 2022, pending Enugu State Land Tribunal", documentHash: "QmK9f0A1b2C3d4E5f6A7b8C9d0E1f2A3b4C5d6E7f8A9" },
  { id: 15, status: "Registered", lat: 6.4469281, lng: 7.5085478, label: "19 Nwafor Orizu Crescent, Asata, Enugu",              size: "700 sqm",   value: "₦68,000,000",  owner: "0xF0a1B2c3D4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9B0", coOwners: [], previousOwners: ["0xA1b2C3d4E5f6A7b8C9d0E1f2A3b4C5d6E7f8A9b0C1"], disputes: "None", documentHash: "QmL0a1B2c3D4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9B0" },
  { id: 16, status: "Registered", lat: 6.4136656, lng: 7.5069885, label: "2 Prince Okam Street, Maryland, Ogui, Enugu",         size: "960 sqm",   value: "₦32,000,000",  owner: "0xB2c3D4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9B0c1D2", coOwners: [], previousOwners: [], disputes: "None", documentHash: "QmM1b2C3d4E5f6A7b8C9d0E1f2A3b4C5d6E7f8A9b0C1" },
  { id: 17, status: "Registered", lat: 6.4565550, lng: 7.5274210, label: "9 Umuezebi Street, New Haven, Enugu",                 size: "540 sqm",   value: "₦115,000,000", owner: "0xC3d4E5f6A7b8C9d0E1f2A3b4C5d6E7f8A9b0C1d2E3", coOwners: ["0xD4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9B0c1D2e3F4"], previousOwners: [], disputes: "None", documentHash: "QmN2c3D4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9B0c1D2" },
  { id: 18, status: "Registered", lat: 6.4341369, lng: 7.4973617, label: "2 Obiagu Road, Asata, Enugu",                         size: "880 sqm",   value: "₦79,000,000",  owner: "0xE5f6A7b8C9d0E1f2A3b4C5d6E7f8A9b0C1d2E3f4A5", coOwners: [], previousOwners: [], disputes: "None", documentHash: "QmO3d4E5f6A7b8C9d0E1f2A3b4C5d6E7f8A9b0C1d2E3" },
  { id: 19, status: "Registered", lat: 6.4820401, lng: 7.5043434, label: "5 Amuri Road, Abakpa, Enugu",                         size: "1,300 sqm", value: "₦91,000,000",  owner: "0xF6a7B8c9D0e1F2a3B4c5D6e7F8a9B0c1D2e3F4a5B6", coOwners: [], previousOwners: [], disputes: "None", documentHash: "QmP4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9B0c1D2e3F4" },
  { id: 20, status: "Registered", lat: 6.3954144, lng: 7.4992267, label: "77 Ebony Paint Road, Awkunanaw, Enugu",               size: "610 sqm",   value: "₦49,000,000",  owner: "0xA7b8C9d0E1f2A3b4C5d6E7f8A9b0C1d2E3f4A5b6C7", coOwners: [], previousOwners: ["0xB8c9D0e1F2a3B4c5D6e7F8a9B0c1D2e3F4a5B6c7D8"], disputes: "None", documentHash: "QmQ5f6A7b8C9d0E1f2A3b4C5d6E7f8A9b0C1d2E3f4A5" },
  { id: 21, status: "Registered", lat: 6.4640311, lng: 7.5522510, label: "FH72+HXM, Ezuth Street, Thinkers Corner, Enugu",      size: "1,050 sqm", value: "₦87,000,000",  owner: "0xC9d0E1f2A3b4C5d6E7f8A9b0C1d2E3f4A5b6C7d8E9", coOwners: [], previousOwners: [], disputes: "None", documentHash: "QmR6a7B8c9D0e1F2a3B4c5D6e7F8a9B0c1D2e3F4a5B6" },
  { id: 22, status: "Registered", lat: 6.4191178, lng: 7.5314720, label: "CG9M+JJV, Ugwuaji, Enugu",                           size: "750 sqm",   value: "₦58,000,000",  owner: "0xD0e1F2a3B4c5D6e7F8a9B0c1D2e3F4a5B6c7D8e9F0", coOwners: [], previousOwners: [], disputes: "None", documentHash: "QmS7b8C9d0E1f2A3b4C5d6E7f8A9b0C1d2E3f4A5b6C7" }
];

var connectedWallet = null;
var selectedParcel = null;

var map = L.map("map", { zoomControl: false }).setView([6.4500, 7.5000], 13);

L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  maxZoom: 19
}).addTo(map);

L.control.zoom({ position: "bottomright" }).addTo(map);

function drawParcel(parcel) {
  var isForSale = parcel.status === "For Sale";
  var circle = L.circle([parcel.lat, parcel.lng], {
    radius: isForSale ? 15 : 10,
    color: "#f0c040",
    weight: isForSale ? 3 : 2,
    fillColor: isForSale ? "#f0c040" : "#1a1a2e",
    fillOpacity: isForSale ? 0.7 : 0.4,
    interactive: true
  }).addTo(map);

  circle.on("click", function(e) {
    L.DomEvent.stopPropagation(e);
    openParcelPanel(parcel);
  });
  circle.on("mouseover", function() { circle.setStyle({ fillOpacity: isForSale ? 0.95 : 0.65, weight: 3 }); });
  circle.on("mouseout",  function() { circle.setStyle({ fillOpacity: isForSale ? 0.7  : 0.4,  weight: isForSale ? 3 : 2 }); });
}

parcelsData.forEach(function(parcel) { drawParcel(parcel); });

function openParcelPanel(parcel) {
  selectedParcel = parcel;
  document.getElementById("parcelTitle").textContent    = parcel.label;
  document.getElementById("parcelLocation").textContent = parcel.label;
  document.getElementById("parcelStatus").innerHTML     = parcel.status === "For Sale"
    ? "<span style='color:#f0c040;font-weight:700;'>🟡 Listed For Sale</span>"
    : "<span style='color:#aaa;'>✅ Registered</span>";
  document.getElementById("parcelSize").textContent     = parcel.size;
  document.getElementById("parcelValue").textContent    = parcel.value;
  document.getElementById("parcelOwner").textContent    = parcel.owner;

  // Co-owners
  var coOwnerEl = document.getElementById("parcelCoOwners");
  if (parcel.coOwners && parcel.coOwners.length > 0) {
    coOwnerEl.textContent = parcel.coOwners.map(function(o) { return o.slice(0,8)+"..."+o.slice(-6); }).join(", ");
  } else {
    coOwnerEl.textContent = "None";
  }

  // Transfer history
  document.getElementById("parcelHistory").textContent =
    parcel.previousOwners.length > 0
      ? parcel.previousOwners.map(function(o) { return o.slice(0,8)+"..."+o.slice(-6); }).join(" → ")
      : "First owner — no transfer history";

  // Disputes
  var disputeEl = document.getElementById("parcelDisputes");
  if (parcel.disputes && parcel.disputes !== "None") {
    disputeEl.innerHTML = "<span style='color:#e05c5c;font-weight:600;'>⚠️ " + parcel.disputes + "</span>";
  } else {
    disputeEl.innerHTML = "<span style='color:#aaa;'>None</span>";
  }

  document.getElementById("documentSection").classList.add("hidden");
  document.getElementById("viewDocsBtn").classList.add("hidden");
  document.getElementById("statusMessage").textContent = "";

  var btn = document.getElementById("requestBtn");
  btn.textContent = "Request to Purchase";
  btn.disabled = false;
  btn.style.background = "#008751";
  btn.style.color = "#fff";
  btn.removeAttribute("data-step");
  btn.style.display = parcel.status === "For Sale" ? "block" : "none";

  document.getElementById("parcelPanel").classList.remove("hidden");
}

document.getElementById("closePanel").addEventListener("click", function() {
  document.getElementById("parcelPanel").classList.add("hidden");
});

document.getElementById("connectWallet").addEventListener("click", function() {
  if (typeof window.ethereum !== "undefined") {
    window.ethereum.request({ method: "eth_requestAccounts" })
      .then(function(accounts) {
        connectedWallet = accounts[0];
        document.getElementById("connectWallet").textContent = connectedWallet.slice(0,6)+"..."+connectedWallet.slice(-4);
        document.getElementById("connectWallet").style.background = "#f0c040";
        document.getElementById("connectWallet").style.color = "#000";
      }).catch(function() { alert("Wallet connection rejected."); });
  } else {
    connectedWallet = "0xDEMO1234567890abcdef1234567890abcdef1234";
    document.getElementById("connectWallet").textContent = "0xDEMO...1234";
    document.getElementById("connectWallet").style.background = "#f0c040";
    document.getElementById("connectWallet").style.color = "#000";
  }
});

document.getElementById("requestBtn").addEventListener("click", function() {
  var step = this.getAttribute("data-step");
  var msg  = document.getElementById("statusMessage");
  var btn  = this;

  if (step === "complete") {
    btn.disabled = true;
    btn.textContent = "Processing Transfer...";
    msg.textContent = "⛓️ Writing ownership transfer to blockchain...";
    msg.style.color = "#f0c040";
    setTimeout(function() {
      msg.style.color = "#008751";
      msg.textContent = "🏛️ Ownership transferred! NFT minted to your wallet.";
      btn.textContent = "✅ You Own This Property";
      btn.style.background = "#2a2a2a";
      btn.style.color = "#fff";
      document.getElementById("parcelOwner").textContent = connectedWallet;
      document.getElementById("parcelStatus").innerHTML = "<span style='color:#008751;font-weight:700;'>✅ Owned by You</span>";
    }, 2500);
    return;
  }

  if (!connectedWallet) {
    msg.textContent = "⚠️ Please connect your wallet first.";
    msg.style.color = "#f0c040";
    return;
  }
  if (!selectedParcel) return;

  btn.disabled = true;
  btn.textContent = "Sending Request...";
  msg.style.color = "#f0c040";
  msg.textContent = "⏳ Broadcasting purchase request to blockchain...";

  setTimeout(function() {
    msg.textContent = "📨 Owner notified. Awaiting acceptance...";
    setTimeout(function() {
      msg.style.color = "#008751";
      msg.textContent = "✅ Owner accepted! Document access granted.";
      document.getElementById("viewDocsBtn").classList.remove("hidden");
      setTimeout(function() {
        btn.textContent = "Complete Purchase & Transfer";
        btn.disabled = false;
        btn.style.background = "#f0c040";
        btn.style.color = "#000";
        btn.setAttribute("data-step", "complete");
      }, 1500);
    }, 2000);
  }, 2000);
});

document.getElementById("viewDocsBtn").addEventListener("click", function() {
  if (!selectedParcel) return;
  document.getElementById("documentHash").textContent = selectedParcel.documentHash;
  document.getElementById("documentSection").classList.remove("hidden");
});

document.getElementById("searchBtn").addEventListener("click", function() {
  var query = document.getElementById("searchInput").value.toLowerCase();
  var result = null;
  for (var i = 0; i < parcelsData.length; i++) {
    var p = parcelsData[i];
    if (p.label.toLowerCase().indexOf(query) !== -1 ||
        p.owner.toLowerCase().indexOf(query) !== -1 ||
        String(p.id) === query) { result = p; break; }
  }
  if (result) {
    map.setView([result.lat, result.lng], 17);
    openParcelPanel(result);
  } else {
    alert("No parcel found. Try a street name, area or parcel number.");
  }
});