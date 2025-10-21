OGS Fullstack bundle
--------------------
Frontend: frontend/index.html (static demo)
Backend: backend/server/* (Express scaffold)

To run backend locally:
cd backend
npm install
copy .env.example to .env and set MONGODB_URI
npm run dev

Bootstrap superadmin:
POST /api/auth/bootstrap-superadmin with {email, password, name}
