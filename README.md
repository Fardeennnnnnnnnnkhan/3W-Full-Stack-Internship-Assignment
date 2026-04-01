# 3W Socials - Full Stack Internship Assignment

3W Socials is a modern, high-fidelity social networking platform built exclusively with the MERN stack. Designed strictly to industry standards, it features an ultra-premium glassmorphic UI, robust server-side functionality, and seamless media handling.

## 🚀 Live Demo
- **Frontend URL:** [Insert Frontend Link Here]
- **Backend Repository:** [Insert Backend Link Here, if applicable]

## ✨ Key Features
- **Ultra-Premium Glassmorphic UI:** A visually stunning, highly responsive interface built with modern CSS techniques (backdrop-filters, dynamic mesh gradients, split-screen auth layouts, and floating components).
- **Authentication System:** Secure JWT-based Login and Registration flows using Bcrypt password encryption.
- **Media Uploads via ImageKit:** Lightning-fast, optimized image uploading using ImageKit CDN integrated directly into the backend using Multer.
- **Advanced Pagination:** Efficient server-side pagination (skip/limit) to load posts dynamically over multiple pages without overwhelming the client.
- **Search & Filtering:** Real-time search functionality and interactive filter pills to easily find relevant content from other users.
- **Interactive Social Features:** 
  - Like & Unlike posts dynamically.
  - Drop live comments on posts.
  - Optimistic UI updates for a seamless, delay-free user experience.
- **Flawless Responsiveness:** An adaptive design scaling perfectly from large desktop monitors down to mobile devices (featuring auto-collapsing navbars, adjusted padding structures, and dynamic unbroken URL wrap protections).

## 🛠️ Technology Stack
**Frontend:**
- React.js (Vite)
- ES Modules Support
- React Router DOM
- Axios
- Lucide-React (For dynamic, scalable SVG icons)
- Vanilla CSS 3 (Advanced grid + flexbox layouts)

**Backend:**
- Node.js & Express.js
- MongoDB (Mongoose Schema Architecture)
- ImageKit.io (Media CDN Node.js SDK)
- Multer (Multipart Form Data middleware)
- JSON Web Tokens (JWT) for stateless sessions

## 📁 Project Structure
The application has been conceptually separated into two distinct environments for optimized deployment:
- `/frontend`: Contains the React application strictly organized into `Pages/` and `Components/`.
- `/backend`: Contains the Express server, separated fully into `routes/`, `controllers/`, and `models/`. ES Module configuration `("type": "module")` utilized throughout to maintain modern standards.

## ⚙️ Getting Started (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/Fardeennnnnnnnnnkhan/3W-Full-Stack-Internship-Assignment.git
cd 3W-Full-Stack-Internship-Assignment
```

### 2. Setup the Backend
Navigate to the backend directory and install your dependencies:
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` root directory adding the following keys:
```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_secure_jwt_secret
IMAGE_KIT_URL_ENDPOINT=your_imagekit_url
IMAGE_KIT_PUB_KEY=your_imagekit_public_key
IMAGE_KIT_PVT_KEY=your_imagekit_private_key
FRONTEND_URL=http://localhost:5173
PORT=5000
```
Start the backend server on port 5000:
```bash
npx nodemon server.js
```

### 3. Setup the Frontend
Open a new terminal interface, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```
Start the React development server:
```bash
npm run dev
```

## 📝 Design Decisions & Optimizations
- **Styling Architecture:** Leveraged pure custom CSS with advanced properties to bypass the bloated overhead of heavy component libraries (like Bootstrap/MUI), maintaining maximum creative control and achieving a highly unique "designer" aesthetic.
- **Performance:** Handled heavy media buffering directly through `ImageKit` instead of saving massive media blobs inside MongoDB. This massively improves database query speeds and lowers server load.

## 🤝 Author
Built as an assignment project for 3W by Fardeen Khan.

---
*If you are testing this application natively, feel free to use the intuitive flow! Create an account, share a post with an image attachment, and explore the pagination controls!*
