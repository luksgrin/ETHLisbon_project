import express from "express";
import cors from "cors";
import { readFile, storeFile } from "./fvm/storage.js";
import { sismoVerification } from "./sismo-verification/sismo.js";
import { getProfileData, getProfileByHandle } from "./lens/lens.js"; // Import the functions here
const app = express();
app.use(cors());
app.use(express.json());

app.post("/store", async (req, res) => {
  const data = req.body;

  try {
    const cid = await storeFile(data);
    console.log(`Stored file with CID: ${cid}`);
    res.json({ cid });
  } catch (err) {
    console.error(`Failed to store file: ${err}`);
    res.status(500).json({ error: "Failed to store file" });
  }
});

app.get("/read/:cid", async (req, res) => {
  const { cid } = req.params;
  console.log(`Reading file with CID: ${cid}`);

  try {
    const content = await readFile(cid);

    console.log(`Retrieved content: ${content}`);
    res.json(content);
  } catch (err) {
    console.error(`Failed to read file: ${err}`);
    res.status(500).json({ error: "Failed to read file" });
  }
});

app.post("/sismo-verification", (req, res) => {
  console.log(req.body);
  const { sismo, receiver, cid } = req.body;
  // Perform the sismo verification logic here
  // ...
  sismoVerification(sismo, receiver, cid);
  // Return the verification result
  res.json({ verificationResult: "success" });
});


// New endpoint to fetch profile data by address
app.get("/profile-data/:address", async (req, res) => {
  const { address } = req.params;
  try {
    const profileData = await getProfileData(address);
    res.json(profileData);
  } catch (err) {
    console.error(`Failed to fetch profile data: ${err}`);
    res.status(500).json({ error: "Failed to fetch profile data" });
  }
});

// New endpoint to fetch profile data by handle
app.get("/profile-handle/:handle", async (req, res) => {
  const { handle } = req.params;
  try {
    const profileData = await getProfileByHandle(handle);
    res.json(profileData);
  } catch (err) {
    console.error(`Failed to fetch profile data: ${err}`);
    res.status(500).json({ error: "Failed to fetch profile data" });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
