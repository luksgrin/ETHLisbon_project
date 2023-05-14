// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "./AskLensQuestionWSismo.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@sismo-connect-solidity/SismoLib.sol";

contract AskLensThreadWSismo is ERC1155, Ownable, SismoConnect {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    mapping(uint256 => string) private _tokenURIs;
    address private AskLensQuestionContract;

    bytes16 public constant APP_ID = 0x639312ba6099cd3a698a33416a25d345;
    bytes16 public constant GROUP_ID = 0x945e9e7b1f95899328bf9c4490aba9fc;

    event QuestionAnswered(
        address indexed alice,
        address indexed quevedo,
        uint256 indexed tokenId,
        string tokenURI
    );

    event QuestionContractSet(address indexed AskLensAnswerContract);

    // base uri -> filecoin
    constructor() ERC1155("") SismoConnect(APP_ID) {}

    function setQuestionContract(address _AskLensQuestionContract) external onlyOwner {
        AskLensQuestionContract = _AskLensQuestionContract;
        emit QuestionContractSet(_AskLensQuestionContract);
        renounceOwnership();
    }

    function mint(bytes memory sismoConnectResponse, address quevedo, uint256 questionId, string memory tokenURI) external returns (uint256) {

        AskLensQuestionWSismo _AskLensQuestion = AskLensQuestionWSismo(AskLensQuestionContract);

        require(
            _AskLensQuestion.balanceOf(msg.sender, questionId) > 0,
            "Can't answer a question that doesn't belong to you"
        );

        SismoConnectVerifiedResult memory result = verify({
            responseBytes: sismoConnectResponse,
            // we want users to prove that they own a Sismo Vault
            // and that they are members of the group with the id 0x42c768bb8ae79e4c5c05d3b51a4ec74a
            // we are recreating the auth and claim requests made in the frontend to be sure that 
            // the proofs provided in the response are valid with respect to this auth request
            auth: buildAuth({authType: AuthType.VAULT}),       
            claim: buildClaim({groupId: GROUP_ID}),
            // we also want to check if the signed message provided in the response is the signature of the user's address
            signature:  buildSignature({message: abi.encode(msg.sender, quevedo, questionId, tokenURI)})
        });



        _tokenIds.increment();

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
