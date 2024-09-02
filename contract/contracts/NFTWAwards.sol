// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFTAwards is ERC1155, ERC1155Burnable{
    address Owner;

    constructor() ERC1155 (
        "https://ipfs.io/ipfs/QmVvidfEFGoN2gZa1QpNhooSFHLiaRundfpy7XyTWXiXPc/awards.json"
    )
    {
        Owner = msg.sender;
    }

    function uri (
        uint256 _tokenId
    ) public pure override returns (string memory) {
        return 
            string (
                abi.encodePacked(
                    "https://ipfs.io/ipfs/QmVvidfEFGoN2gZa1QpNhooSFHLiaRundfpy7XyTWXiXPc/",
                    Strings.toString(_tokenId),
                    ".json"
                )
            );
    }

    function Award (
        address recipients
    ) external {
        require(msg.sender == Owner, "Only DApp can Award winners");
        _mint(recipients, 0, 1, "");
    }
}
