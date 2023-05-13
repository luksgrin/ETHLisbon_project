// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AskLensQuestion is ERC1155, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    mapping(uint256 => string) private _tokenURIs;
    address private AskLensThreadContract;

    event QuestionCreated(
        address indexed quevedo,
        address indexed alice,
        uint256 indexed tokenId,
        string tokenURI
    );

    event ThreadContractSet(address indexed AskLensThreadContract);

    // base uri -> filecoin
    constructor() ERC1155("") {}

    function setAnswerContract(address _AskLensAnswerContract) external onlyOwner {
        AskLensThreadContract = _AskLensAnswerContract;
        emit ThreadContractSet(_AskLensAnswerContract);
        renounceOwnership();
    }

    function mint(address alice, string memory tokenURI) external returns (uint256) {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _mint(alice, tokenId, 1, "");
        _mint(_msgSender(), tokenId, 1, "");

        _tokenURIs[tokenId] = tokenURI;

        emit QuestionCreated(_msgSender(), alice, tokenId, tokenURI);

        return tokenId;
    }

    function burn(uint256 tokenId, address quevedo, address alice) external { 
        require(
            _msgSender() == AskLensThreadContract,
            "Only the AnswerContract can burn questions"
        );

        _burn(quevedo, tokenId, 1);
        _burn(alice, tokenId, 1);
        delete _tokenURIs[tokenId];
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }
}
