import express from 'express';
import cors from 'cors';
import { Web3Storage, File } from 'web3.storage';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const app = express();
app.use(cors());
app.use(express.json());

const token = process.env.WEBSTORAGE_KEY;
const client = new Web3Storage({ token });

app.post('/store', async (req, res) => {
  const data = req.body;

  const jsonString = JSON.stringify(data);
  const file = new File([jsonString], 'data.json', {
    type: 'application/json',
  });

  try {
    const cid = await client.put([file]);
    console.log(`Stored file with CID: ${cid}`);
    res.json({ cid });
  } catch (err) {
    console.error(`Failed to store file: ${err}`);
    res.status(500).json({ error: 'Failed to store file' });
  }
});


app.get('/read/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
    const getRes = await client.get(cid);

    if (!getRes.ok) {
      throw new Error(`Failed to get file: ${getRes.status}`);
    }

    const files = await getRes.files();
    const file = files[0];
    const contentBuffer = new Uint8Array(await file.arrayBuffer());
    const contentString = new TextDecoder().decode(contentBuffer);
    const content = JSON.parse(contentString);

    console.log(`Retrieved content: ${content}`);
    res.json(content);
  } catch (err) {
    console.error(`Failed to read file: ${err}`);
    res.status(500).json({ error: 'Failed to read file' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
