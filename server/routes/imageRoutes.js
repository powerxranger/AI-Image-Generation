import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from Pollinations AI!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const seed = Math.floor(Math.random() * 1000000);
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true&model=flux&seed=${seed}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error('Failed to generate image');

    const buffer = Buffer.from(await response.arrayBuffer());
    const b64 = buffer.toString('base64');
    res.status(200).json({ photo: b64 });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.message || 'Something went wrong');
  }
});

export default router;