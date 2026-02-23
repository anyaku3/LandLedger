// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LandLedger is ERC721, Ownable {
    uint256 private _tokenIdCounter;

    struct LandParcel {
        string location;
        string size;
        uint256 value;
        string documentHash;
        bool documentsRevealed;
        address[] previousOwners;
    }

    struct PurchaseRequest {
        address buyer;
        bool accepted;
        bool pending;
    }

    mapping(uint256 => LandParcel) public parcels;
    mapping(uint256 => PurchaseRequest) public purchaseRequests;
    mapping(uint256 => mapping(address => bool)) public canViewDocuments;

    event LandRegistered(uint256 tokenId, address owner, string location);
    event PurchaseRequested(uint256 tokenId, address buyer);
    event RequestAccepted(uint256 tokenId, address buyer);
    event OwnershipTransferred(uint256 tokenId, address from, address to);

    constructor() ERC721("LandLedger", "LAND") Ownable(msg.sender) {}

    function registerLand(
        address owner,
        string memory location,
        string memory size,
        uint256 value,
        string memory documentHash
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter++;
        _safeMint(owner, tokenId);

        address[] memory emptyOwners;
        parcels[tokenId] = LandParcel({
            location: location,
            size: size,
            value: value,
            documentHash: documentHash,
            documentsRevealed: false,
            previousOwners: emptyOwners
        });

        emit LandRegistered(tokenId, owner, location);
        return tokenId;
    }

    function requestPurchase(uint256 tokenId) public {
        require(ownerOf(tokenId) != msg.sender, "You already own this land");
        require(!purchaseRequests[tokenId].pending, "Request already pending");

        purchaseRequests[tokenId] = PurchaseRequest({
            buyer: msg.sender,
            accepted: false,
            pending: true
        });

        emit PurchaseRequested(tokenId, msg.sender);
    }

    function acceptRequest(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        require(purchaseRequests[tokenId].pending, "No pending request");

        address buyer = purchaseRequests[tokenId].buyer;
        canViewDocuments[tokenId][buyer] = true;
        purchaseRequests[tokenId].accepted = true;
        purchaseRequests[tokenId].pending = false;

        emit RequestAccepted(tokenId, buyer);
    }

    function transferLand(uint256 tokenId, address newOwner) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        require(canViewDocuments[tokenId][newOwner], "Purchase not approved");

        parcels[tokenId].previousOwners.push(msg.sender);
        safeTransferFrom(msg.sender, newOwner, tokenId);

        emit OwnershipTransferred(tokenId, msg.sender, newOwner);
    }

    function getParcelDetails(uint256 tokenId) public view returns (
        string memory location,
        string memory size,
        uint256 value,
        address currentOwner,
        address[] memory previousOwners
    ) {
        return (
            parcels[tokenId].location,
            parcels[tokenId].size,
            parcels[tokenId].value,
            ownerOf(tokenId),
            parcels[tokenId].previousOwners
        );
    }

    function getDocuments(uint256 tokenId) public view returns (string memory) {
        require(
            ownerOf(tokenId) == msg.sender || canViewDocuments[tokenId][msg.sender],
            "Not authorized to view documents"
        );
        return parcels[tokenId].documentHash;
    }
}