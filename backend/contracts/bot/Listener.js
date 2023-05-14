const ethers = require('ethers')

const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com/");

const address = "0xb1dAbC876Cc8e5D599F1362c72Cd621B66a5c7f2"

const abi = [
    "event QuestionCreated(address indexed quevedo,address indexed alice,uint256 indexed tokenId,string tokenURI)"
]

const contract = new ethers.Contract(address, abi, provider)

console.log("Listening for 'QuestionCreated' events...")

contract.on("QuestionCreated", (quevedo, alice, tokenId, tokenURI) => {
    console.log(quevedo, alice, tokenId, tokenURI);
})