# Picasso AI

An AI-powered image generation web application built using the **MERN stack**.
Enter a text prompt, generate stunning images using **FLUX AI** (via Hugging Face), and share your creations with the community.

---

## Demo

![Picasso AI Demo](./screenshots/demo.gif)

---

## Features

- AI image generation from text prompts powered by FLUX.1-schnell
- Community gallery to explore shared creations
- Search images by prompt or creator name
- Download generated images
- Dark mode UI with animated star background
- Toast notifications for success and error feedback
- Responsive design across all screen sizes

---

## Tech Stack

### Frontend
- React
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Cloudinary (image hosting)

### AI
- FLUX.1-schnell via Hugging Face Inference API

---

## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account
- Hugging Face account + API token (free at huggingface.co)
- Cloudinary account (free tier)

### Setup

1. Clone the repository
2. Install root dependencies:
   ```bash
   npm install
3. Install client and server dependencies:
cd client && npm install
cd ../server && npm install
4. Create a .env file inside the server folder:
MONGODB_URL=your_mongodb_connection_string
HF_TOKEN=your_huggingface_token
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
5. Run both frontend and backend together from the root:
npm run dev

The app will be available at http://localhost:5173 and the API at http://localhost:8080.

---

Project Structure

AI-Image-Generation/
├── client/        # React frontend
├── server/        # Node & Express backend
├── package.json   # Root scripts to run both together
└── README.md