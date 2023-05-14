import { Web3Storage, File } from "web3.storage";
import dotenv from "dotenv";
//dotenv.config();
dotenv.config({ path: "./.env" });
const token = process.env.WEBSTORAGE_KEY;

// Initialize the client
const client = new Web3Storage({ token });

export async function sismoVerification(data) {
  const jsonString = JSON.stringify(data);

  // Convert JSON string to Blob
  const file = new File([jsonString], "data.json", {
    type: "application/json",
  });

  console.log("Stored file with data:", data);
  return data;
}

export async function mint() {

  const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com/");
  const AskLensQuestionWSismo = "0xb1dAbC876Cc8e5D599F1362c72Cd621B66a5c7f2"
  const abi = [
    "function mint()"
  ] 
  const contract = new ethers.Contract(AskLensQuestionWSismo, abi, provider);

}
