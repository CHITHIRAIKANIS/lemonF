==============================
💻 LemonPay Task Manager Frontend
==============================

Overview:
---------
This frontend is built using React and Tailwind CSS. It provides a user interface for signing up, logging in, and managing tasks. It communicates with the backend via REST APIs and stores JWT tokens in sessionStorage.

Technologies Used:
------------------
- React.js
- React Router
- Tailwind CSS
- Axios
- Framer Motion (animations)
- sessionStorage for auth

Setup Instructions:
-------------------
1. Clone the frontend repo:
   git clone <your-frontend-repo-url>
   cd <project-folder>

2. Install dependencies:
   npm install

3. Run the app:
   npm run dev

Page Features:
--------------
- SignupPage: Register with email and password
- LoginPage: Authenticate and redirect to dashboard
- Dashboard: View, create, edit, and delete tasks
- Logout: Clears token and redirects to login

Assumptions:
------------
- JWT token is saved in sessionStorage
- Only authenticated users can access /dashboard
- API URLs are hardcoded to localhost backend

Screenshot:
-----------
check src/asset/screenshots - folder