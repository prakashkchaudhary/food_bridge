# 🌱 FoodBridge

**Connecting food donors with NGOs to reduce waste and feed communities.**

## 🏗️ Tech Stack

- **Frontend**: React 19 + Vite + TailwindCSS
- **Backend**: Node.js + Express + MongoDB
- **Authentication**: JWT + bcrypt
- **File Upload**: Cloudinary
- **Database**: Firestore (optional) + MongoDB

---

## 📁 Project Structure

```
foodbridge/
├── backend/          # Express API + MongoDB
├── frontend/         # React + Vite SPA
└── docs/            # Documentation & legacy files
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- MongoDB (local or Atlas)
- npm 10+

### 1️⃣ Install All Dependencies
```bash
npm run install:all
```

### 2️⃣ Configure Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/foodbridge
JWT_SECRET=your_jwt_secret_key_here
ADMIN_NAME=System Admin
ADMIN_EMAIL=admin@foodbridge.local
ADMIN_PASSWORD=yourStrongPassword
```

**Frontend** (`frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
```

### 3️⃣ Seed Admin Account
```bash
npm run seed:admin
```

### 4️⃣ Run Development Servers
```bash
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

---

## 📦 Individual Commands

### Backend Only
```bash
npm run dev:backend      # Development mode
npm run start:backend    # Production mode
```

### Frontend Only
```bash
npm run dev:frontend     # Development mode
npm run build:frontend   # Build for production
```

---

## 🔐 Admin Access

1. Seed admin account (see step 3 above)
2. Login at: http://localhost:5173/login
3. Access dashboard: http://localhost:5173/admin

---

## 🚢 Deployment

### Backend (Render/Railway/Heroku)
- **Entry Point**: `backend/server.js`
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Environment Variables**: Set all from `backend/.env.example`

### Frontend (Vercel/Netlify)
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**: Set all from `frontend/.env.example`

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

#### Food Listings
- `GET /api/food` - Get all food listings
- `POST /api/food` - Create food listing (auth required)
- `PUT /api/food/:id` - Update food listing (auth required)
- `DELETE /api/food/:id` - Delete food listing (auth required)

#### Requests
- `GET /api/request` - Get all requests
- `POST /api/request` - Request food (NGO only)
- `PUT /api/request/:id` - Update request status

#### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/stats` - Get platform statistics (admin only)

---

## 🧪 Testing

```bash
# Backend tests (when implemented)
cd backend
npm test

# Frontend tests (when implemented)
cd frontend
npm test
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

ISC License

---

## 👥 Team

Built with ❤️ by the FoodBridge team

---

## 📝 Notes

- Old landing page files are preserved in `docs/landing-page/`
- Backend follows MVC architecture pattern
- Frontend uses React Context for state management
- JWT tokens are used for authentication
- File uploads handled via Cloudinary
