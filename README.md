# 🚀 Nova Coders Website

Welcome to the **Nova Coders** official website repository! This is a modern, full-stack web application built to serve the Nova Coders community, offering a rich, interactive user experience with an robust backend infrastructure. 

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Project Overview

Nova Coders is a dynamic, SEO-optimized educational and community platform. It features user authentication, a comprehensive admin dashboard, a certificate generation and verification system, and a suite of interactive UI elements. The platform is designed to manage members, showcase portfolios, and streamline contact inquiries while ensuring a premium, animated user experience.

## ✨ Key Features

- **Robust Authentication:** Secure JWT-based signup, signin, and role-based access control (Admin/User).
- **Interactive UI/UX:** Powered by Framer Motion, React Spring, and Three.js for 3D elements and micro-animations, along with Lenis for smooth scrolling.
- **Admin Dashboard:** A centralized hub for managing users, content, member profiles, and tracking platform analytics.
- **Certificate System:** Automated generation and robust verification system for course and event certificates.
- **SEO Optimized:** Comprehensive SEO strategy utilizing `react-helmet-async` for meta-tag management across pages, with configured `robots.txt` and `sitemap.xml`.
- **Member & Contact Management:** Streamlined handling of member data and contact form inquiries.

## 🛠️ Technology Stack

### Frontend (Client)
- **Framework:** React 18 with Vite
- **State Management:** Redux Toolkit & React Context API
- **Styling:** Tailwind CSS & PostCSS
- **Animations & 3D:** Framer Motion, React Spring, Three.js, @react-spring/web
- **Routing:** React Router v6 & react-router-hash-link
- **Utilities:** Axios, Lenis (smooth scrolling), Swiper, React Hook Form, Lucide React / React Icons
- **SEO:** React Helmet Async

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Security:** Helmet, bcryptjs (password hashing), jsonwebtoken (JWT), cookie-parser
- **Validation:** express-validator

## 📁 Project Structure

```text
nova-coders-website/
├── backend/                 # Express server & API
│   ├── src/
│   │   ├── app.js           # Express app configuration
│   │   ├── controllers/     # Route controllers (authController, etc.)
│   │   ├── db/              # MongoDB connection setup
│   │   ├── middlewares/     # Auth, Admin, and Error middlewares
│   │   ├── models/          # Mongoose schemas (User, Member, Certificate)
│   │   └── routes/          # API endpoints definition
│   ├── server.js            # Server entry point
│   └── package.json
│
└── frontend/                # React + Vite application
    ├── src/
    │   ├── api/             # Axios configurations and API calls
    │   ├── assets/          # Images, fonts, and static assets
    │   ├── components/      # Reusable UI components (SignIn, etc.)
    │   ├── config/          # App configurations
    │   ├── context/         # React Context providers (DataProvider)
    │   ├── hooks/           # Custom React hooks
    │   ├── pages/           # Main page components (Home, About, Portfolio)
    │   ├── routes/          # Application routing logic (MainRoutes)
    │   ├── store/           # Redux store and slices
    │   ├── index.css        # Global Tailwind styles
    │   └── main.jsx         # React application entry point
    ├── public/              # Public assets (robots.txt, sitemap.xml)
    ├── vite.config.js       # Vite bundler configuration
    └── package.json
```

## 💾 Installation & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- MongoDB (Local instance or MongoDB Atlas URL)

### 1. Clone the repository
```bash
git clone https://github.com/novacoders-edu/nova.git
cd nova
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

### 3. Backend Setup
```bash
cd ../backend
npm install
```

## ⚙️ Environment Variables

### Backend Configuration (`backend/.env`)
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/novacoders
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key
```

### Frontend Configuration (`frontend/.env`)
Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Development Mode

You will need two terminal windows to run the frontend and backend concurrently.

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
*Server runs on `http://localhost:5000`*

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
*Frontend runs on `http://localhost:5173`*

### Production Build

To build the frontend for production:
```bash
cd frontend
npm run build
```
This will generate a `dist/` folder containing the optimized static assets.

## 🔗 API Documentation (Core Routes)

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Authenticate a user and receive a token
- `POST /api/auth/logout` - Invalidate user session

### Members
- `GET /api/members` - Retrieve member directory
- `POST /api/members` - Add a new member (Admin only)
- `GET /api/members/:id` - Get specific member details

### Certificates
- `GET /api/certificates` - List all certificates
- `POST /api/certificates` - Generate a new certificate (Admin only)
- `GET /api/certificates/verify/:id` - Public route to verify certificate authenticity

### Contacts
- `POST /api/contacts` - Submit a new contact inquiry
- `GET /api/contacts` - Retrieve all inquiries (Admin only)

## 🤝 Contributing

We welcome contributions to Nova Coders! Please follow these steps:
1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request for review.

## 📄 License

This project is proprietary and confidential. All rights reserved by **Nova Coders**.
