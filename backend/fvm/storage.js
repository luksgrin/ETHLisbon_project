import { Web3Storage, File } from "web3.storage";
import fs from "fs/promises";
import dotenv from "dotenv";
//dotenv.config();
dotenv.config({ path: "../.env" });

const token = process.env.WEBSTORAGE_KEY;

// Initialize the client
const client = new Web3Storage({ token });

async function storeFile(data) {
  // Read file from file system
  //const data = await fs.readFile(filePath);

  // Create a File object
  //const file = new File([data], filePath);

  const jsonString = JSON.stringify(data);

  // Convert JSON string to Blob
  const file = new File([jsonString], "data.json", {
    type: "application/json",
  });

  // Upload the file to web3.storage
  const cid = await client.put([file]);

  console.log("Stored file with CID:", cid);
  return cid;
}

async function readFile(cid) {
  // Get the file from web3.storage
  const res = await client.get(cid);

  if (!res.ok) {
    throw new Error(`Failed to get file: ${res.status}`);
  }

  // The files are returned as an async iterable, convert it to an array
  const files = await res.files();

  console.log("Retrieved files:");
  files.forEach((file) => console.log(file.name));

  // For simplicity, let's just read the content of the first file
  const file = files[0];
  const contentBuffer = new Uint8Array(await file.arrayBuffer());
  const contentString = new TextDecoder().decode(contentBuffer);
  const content = JSON.parse(contentString);

  console.log("Content:", content);
  return content;
}

// Helper function to convert iterable to array
async function all(iterable) {
  const result = [];
  for await (const item of iterable) {
    result.push(item);
  }
  return result;
}

const data = { name: "Brbr", job: "Lover" };
storeFile(data)
  .then((cid) => readFile(cid))
  .catch(console.error);
// Example usage
// storeFile("file.json")
//   .then((cid) => readFile(cid))
//   .catch(console.error);

const cid1 = "bafybeihypepnqzlkhdvtcen2rfacy3f723yvybin64yz62rapx7w2zy5sy";
const cid2 = "bafybeie3xwbqiall477iy36u6ek2mr6bjx5vvbwm5rcgtebmiw74cgm67e";

// readFile(cid)
//   .then((content) => console.log(content))
//   .catch(console.error);
