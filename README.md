# 🔗 Shortex — Modern URL Shortener

> A full-stack URL shortening platform built with the MERN stack, featuring authentication, link management, expiration, click tracking, analytics, password recovery, and a responsive dashboard.

**Live Demo:** [Shortex](https://shortex.vercel.app)

---

## ✨ Overview

Shortex is a production-style URL shortener that allows users to transform long URLs into short, shareable links and manage them from a personal dashboard.

Unlike a basic URL shortener, Shortex includes **user authentication, link ownership, link activation/deactivation, expiration, click tracking, analytics, password recovery, and a responsive interface**.

The project was built from the ground up to understand how a real-world full-stack application is structured, authenticated, deployed, and connected to a database.

---

## 🚀 Features

### 🔗 URL Management

* Generate unique 6-character short codes
* Convert long URLs into short links
* Redirect users to the original URL
* Validate submitted URLs
* Support both `HTTP` and `HTTPS`
* Prevent expired links from being accessed
* Enable and disable links
* Delete links
* Copy short URLs directly from the dashboard
* Associate every URL with its authenticated owner

### 📊 Analytics

* Total URLs
* Active URLs
* Disabled URLs
* Total clicks
* Today's clicks
* Yesterday's clicks
* Last 7 days' clicks
* Last 30 days' clicks
* This month's URLs
* Last month's URLs
* Last month's clicks
* Per-link click history
* Weekly click analytics

### 🔐 Authentication & Security

* User registration
* Secure password hashing with bcrypt
* JWT-based authentication
* Protected API routes
* User-specific URL access
* Profile management
* Password change
* Forgot-password flow
* Secure password reset tokens
* Reset-token expiration
* Password reuse prevention
* Logout functionality

### 📱 User Experience

* Responsive dashboard
* Mobile-friendly URL management
* Toast notifications
* Loading states
* Password visibility controls
* Clean modern UI
* Responsive navigation
* Dedicated blog page
* Terms & Privacy pages
* Custom favicon

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **React Router**
* **Axios**
* **Tailwind CSS**
* **Lucide React**
* **React Toastify**
* **Vite**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT**
* **bcryptjs**
* **Nodemailer**
* **Crypto**
* **CORS**

### Deployment

* **Vercel** — Frontend
* **Vercel** — Backend
* **MongoDB Atlas** — Database

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │      Browser        │
                    │   React Frontend    │
                    └──────────┬──────────┘
                               │
                               │ HTTPS / Axios
                               ▼
                    ┌─────────────────────┐
                    │   Express Backend   │
                    │      REST API       │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
       ┌─────────────────┐          ┌─────────────────┐
       │   MongoDB Atlas │          │   Nodemailer    │
       │    Database     │          │  Email Service  │
       └─────────────────┘          └─────────────────┘
```

---

## 📁 Project Structure

```text
Shortex/
│
├── backend/
│   │
│   ├── config/
│   │   ├── db.js
│   │   └── email.js
│   │
│   ├── controllers/
│   │   ├── authControllers.js
│   │   ├── shortUrl.js
│   │   └── urlControllers.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── userModel.js
│   │   └── urlModel.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── shortUrlRoute.js
│   │   └── urlRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Blog.jsx
│   │   │   ├── ChangePassword.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Homepage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Privacy.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   └── Terms.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## 🔐 Authentication Flow

Shortex uses **JWT authentication** to protect user-specific resources.

```text
Register
   │
   ▼
Password hashed with bcrypt
   │
   ▼
User stored in MongoDB
   │
   ▼
Login
   │
   ▼
Credentials verified
   │
   ▼
JWT generated
   │
   ▼
Token stored on client
   │
   ▼
Authorization: Bearer <token>
   │
   ▼
Authentication middleware
   │
   ▼
Protected API route
```

The authentication middleware verifies the JWT and attaches the authenticated user's ID to the request:

```text
req.userId
```

This allows URL operations and profile operations to be scoped to the currently authenticated user.

---

## 🔗 URL Creation Flow

```text
User submits long URL
        │
        ▼
Validate URL
        │
        ▼
Generate random short code
        │
        ▼
Check unique short code
        │
        ▼
Save URL + user ID
        │
        ▼
Return short URL
```

Example:

```text
Original URL
https://example.com/my-long-project-url

        ↓

Shortex

        ↓

https://shortex.vercel.app/aB92xK
```

---

## 📈 Click Tracking

Whenever a short URL is opened:

```text
Short URL
    │
    ▼
Find URL by shortCode
    │
    ▼
Check active status
    │
    ▼
Check expiration
    │
    ▼
Increment clicks
    │
    ▼
Store click timestamp
    │
    ▼
Redirect to original URL
```

Each click is recorded in the URL's `clickHistory`, allowing the dashboard to calculate daily and weekly analytics.

---

## 🔑 Password Recovery

Shortex implements a secure password-reset flow.

```text
Forgot Password
       │
       ▼
Generate random reset token
       │
       ▼
Hash token before storing
       │
       ▼
Store token + expiration
       │
       ▼
Send reset email
       │
       ▼
User opens reset link
       │
       ▼
Token verified
       │
       ▼
New password hashed
       │
       ▼
Reset token removed
```

Reset tokens expire after **15 minutes**.

---

## ⚙️ Environment Variables

### Backend

Create:

```text
backend/.env
```

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3000
```

### Frontend

Create:

```text
frontend/.env
```

```env
VITE_API_URL=http://localhost:3000
```

For production:

```env
VITE_API_URL=https://your-backend-url.vercel.app
```

> Never commit `.env` files or expose secrets in your repository.

---

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Raza9627/Shortex.git
```

```bash
cd Shortex
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure backend environment variables

Create:

```text
backend/.env
```

and add the required variables.

### 4. Start backend

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Configure frontend environment

Create:

```text
frontend/.env
```

```env
VITE_API_URL=http://localhost:3000
```

### 7. Start frontend

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

## 🌐 API Overview

### Authentication

| Method  | Endpoint                          | Description            |
| ------- | --------------------------------- | ---------------------- |
| `POST`  | `/api/auth/register`              | Register a user        |
| `POST`  | `/api/auth/login`                 | Login                  |
| `POST`  | `/api/auth/logout`                | Logout                 |
| `GET`   | `/api/auth/profile`               | Get profile            |
| `PATCH` | `/api/auth/profile`               | Update profile         |
| `PATCH` | `/api/auth/change-password`       | Change password        |
| `POST`  | `/api/auth/forgot-password`       | Request password reset |
| `POST`  | `/api/auth/reset-password/:token` | Reset password         |
| `GET`   | `/api/auth/users`                 | Get users              |

### URL Management

| Method   | Endpoint                      | Description            |
| -------- | ----------------------------- | ---------------------- |
| `GET`    | `/api/urls`                   | Get user's URLs        |
| `POST`   | `/api/urls`                   | Create short URL       |
| `DELETE` | `/api/urls/:id`               | Delete URL             |
| `PATCH`  | `/api/urls/:id/disable`       | Disable URL            |
| `PATCH`  | `/api/urls/:id/enable`        | Enable URL             |
| `GET`    | `/api/urls/analytics`         | Get analytics          |
| `GET`    | `/api/urls/analytics/details` | Get detailed analytics |
| `GET`    | `/api/urls/analytics/weekly`  | Get weekly analytics   |

### Redirect

```text
GET /:shortCode
```

Example:

```text
GET /aB92xK
```

---

## 🧠 What I Learned

Building Shortex helped me understand how different parts of a full-stack application work together.

### Backend

* Designing REST APIs
* Express routing
* Middleware
* JWT authentication
* Password hashing
* MongoDB data modeling
* Mongoose queries
* URL validation
* Error handling
* Password reset security
* Email integration

### Frontend

* React component architecture
* React Router
* Protected routes
* API integration with Axios
* Authentication state
* Loading and error states
* Responsive UI design
* Dashboard data management

### Full-Stack

* Connecting frontend and backend
* Authentication across client and server
* User-specific database queries
* Environment variables
* CORS
* Production deployment
* Debugging production API issues
* Deploying a monorepo

---

## 🔒 Security Considerations

Shortex includes several security-oriented practices:

* Passwords are hashed using bcrypt.
* JWTs are verified through authentication middleware.
* Reset tokens are cryptographically generated.
* Reset tokens are hashed before database storage.
* Reset tokens expire after 15 minutes.
* User-owned URLs are queried using both URL ID and authenticated user ID.
* Sensitive environment variables are excluded through `.gitignore`.
* Only HTTP and HTTPS URLs are accepted.

---

## 🚧 Future Improvements

Possible future improvements include:

* [ ] Rate limiting
* [ ] Custom aliases
* [ ] QR code generation
* [ ] Advanced click analytics
* [ ] Device/browser analytics
* [ ] Geographic analytics
* [ ] Link preview
* [ ] API documentation with Swagger/OpenAPI
* [ ] Redis caching
* [ ] Background jobs
* [ ] Automated testing
* [ ] CI/CD pipeline
* [ ] Improved monitoring and logging

---

## 📸 Screenshots

> Add screenshots of the landing page, authentication pages, and dashboard here.

Example:

```text
Landing Page
Authentication
Dashboard
Analytics
```

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "Add your feature"
```

4. Push the branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

## 📄 License

This project is currently available for educational and portfolio purposes.

---

## 👨‍💻 Author

**Raza**

Built with ❤️ using the MERN stack.

⭐ If you found this project interesting, consider giving the repository a star!
