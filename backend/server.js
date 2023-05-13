import express from "express";
import cors from "cors";
import { readFile, storeFile } from "./fvm/storage.js";

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

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
