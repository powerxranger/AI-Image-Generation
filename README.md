# Picasso AI -- AI Image Generator

A full-stack AI image generation app built with the MERN stack. Enter a text prompt, generate stunning images using Flux AI, and share your creations with the community.

## Demo

[Watch Demo on YouTube](https://youtu.be/6UhmIMZTjvg)

**Note:** First image generation may take 20-30 seconds due to server cold start. Subsequent requests are fast.

---

## Features

- AI image generation from text prompts powered by Flux AI
- Community gallery to explore and share creations
- Search images by prompt or creator name
- 4-way gallery sort (newest, oldest, A-Z, Z-A)
- One-click "Use this prompt" to remix any community creation
- Lightbox view for full-screen image preview
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
- Flux AI via Pollinations.ai

---

## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account
- Cloudinary account (free tier)

### Setup

1. Clone the repository
2. Install root dependencies:
   ```bash
   npm install
   ```
3. Install client and server dependencies:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
4. Create a `.env` file inside the `server` folder:
   ```
   MONGODB_URL=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
5. Run both frontend and backend together from the root:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173` and the API at `http://localhost:8080`.

---

## Project Structure

```
AI-Image-Generation/
├── client/        # React frontend
├── server/        # Node & Express backend
├── package.json   # Root scripts to run both together
└── README.md
```