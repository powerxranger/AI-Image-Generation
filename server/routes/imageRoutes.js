import express from 'express';
import * as dotenv from 'dotenv';
import { InferenceClient } from '@huggingface/inference';

dotenv.config();

const router = express.Router();

const client = new InferenceClient(process.env.HF_TOKEN);

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from Hugging Face!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const imageBlob = await client.textToImage({
      model: 'black-forest-labs/FLUX.1-schnell',
      inputs: prompt,
      parameters: {
        width: 512,
        height: 512,
      }
    });

    const buffer = Buffer.from(await imageBlob.arrayBuffer());
    const b64 = buffer.toString('base64');
    res.status(200).json({ photo: b64 });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.message || 'Something went wrong');
  }
});

export default router;