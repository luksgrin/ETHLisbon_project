// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "./AskLensQuestion.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AskLensThread is ERC1155, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    mapping(uint256 => string) private _tokenURIs;
    address private AskLensQuestionContract;

    event QuestionAnswered(
        address indexed alice,
        address indexed quevedo,
        uint256 indexed tokenId,
        string tokenURI
    );

    event QuestionContractSet(address indexed AskLensAnswerContract);

    // base uri -> filecoin
    constructor() ERC1155("") {}

    function setQuestionContract(address _AskLensQuestionContract) external onlyOwner {
        AskLensQuestionContract = _AskLensQuestionContract;
        emit QuestionContractSet(_AskLensQuestionContract);
        renounceOwnership();
    }

    function mint(address quevedo, uint256 questionId, string memory tokenURI) external returns (uint256) {
        _tokenIds.increment();

        AskLensQuestion _AskLensQuestion = AskLensQuestion(AskLensQuestionContract);

        require(
            _AskLensQuestion.balanceOf(msg.sender, questionId) > 0,
            "Can't answer a question that doesn't belong to you"
        );

        _AskLensQuestion.burn(questionId, quevedo, msg.sender);

        uint256 tokenId = _tokenIds.current();
        _mint(msg.sender, tokenId, 1, "");
        _mint(quevedo, tokenId, 1, "");

        _tokenURIs[tokenId] = tokenURI;

        emit QuestionAnswered(msg.sender, quevedo, tokenId, tokenURI);

        return tokenId;
    }

    function burn(uint256 tokenId, address quevedo, address alice) external onlyOwner {
        require(
            _msgSender() == AskLensQuestionContract,
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
