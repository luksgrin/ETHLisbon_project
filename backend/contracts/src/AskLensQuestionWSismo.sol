// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@sismo-connect-solidity/SismoLib.sol";

contract AskLensQuestion is ERC1155, Ownable, SismoConnect {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    mapping(uint256 => string) private _tokenURIs;
    address private AskLensThreadContract;

    bytes16 public constant APP_ID = 0x639312ba6099cd3a698a33416a25d345;
    bytes16 public constant GROUP_ID = 0x945e9e7b1f95899328bf9c4490aba9fc;

    event QuestionCreated(
        address indexed quevedo,
        address indexed alice,
        uint256 indexed tokenId,
        string tokenURI
    );

    event ThreadContractSet(address indexed AskLensThreadContract);

    // base uri -> filecoin
    constructor() ERC1155("") SismoConnect(APP_ID) {}

    function setAnswerContract(address _AskLensAnswerContract) external onlyOwner {
        AskLensThreadContract = _AskLensAnswerContract;
        emit ThreadContractSet(_AskLensAnswerContract);
        renounceOwnership();
    }

    function mint(bytes memory sismoConnectResponse, address alice, string memory tokenURI) external returns (uint256) {

        SismoConnectVerifiedResult memory result = verify({
            responseBytes: sismoConnectResponse,
            // we want users to prove that they own a Sismo Vault
            // and that they are members of the group with the id 0x42c768bb8ae79e4c5c05d3b51a4ec74a
            // we are recreating the auth and claim requests made in the frontend to be sure that 
            // the proofs provided in the response are valid with respect to this auth request
            auth: buildAuth({authType: AuthType.VAULT}),       
            claim: buildClaim({groupId: GROUP_ID}),
            // we also want to check if the signed message provided in the response is the signature of the user's address
            signature:  buildSignature({message: abi.encode(msg.sender)})
        });


        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _mint(alice, tokenId, 1, "");
        _mint(msg.sender, tokenId, 1, "");

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
