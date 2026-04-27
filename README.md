# 🎬 Movie Tracker App

A fullstack web application to track movies, ratings, and reviews using the MERN stack.

---

## 📌 Problem

This application helps users organize, manage, and rate movies they have watched in a simple and structured way.

---

## 🚀 Tech Stack

* **Frontend:** React (Vite)
* **Backend:** Node.js + Express
* **Database:** MongoDB Atlas
* **Authentication:** JWT (JSON Web Token)

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/mnjomnjo/movie-tracker.git
cd movie-tracker
```

---

### 2. Install dependencies

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```
---

### 3. Environment Variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

---

### 4. Run the application

```bash
npm run dev
```

---

### 5. Open App

Go to:
```
http://localhost:5173
```

---


## 🔐 Authentication Features

* User Registration
* User Login
* JWT Token Authentication
* Protected Routes

---

## 🎬 Features

* Add new movies
* Edit existing movies
* Delete movies
* View movie list
* Filter movies by genre and rating
* Get top-rated movies
* Manage reviews linked to movies and users

---

## 🔗 API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/auth/profile` (Protected)

### Movies

* `GET /api/movies`
* `POST /api/movies`
* `PUT /api/movies/:id`
* `DELETE /api/movies/:id`
* `GET /api/movies/top-rated`
* `GET /api/movies/:id/reviews`

### Reviews

* `GET /api/reviews`
* `POST /api/reviews`
* `PUT /api/reviews/:id`
* `DELETE /api/reviews/:id`

---

## 📊 Database Design

### Collections:

* Users
* Movies
* Reviews

### Relationships:

* Review → User
* Review → Movie

---

## 🧪 Seed Data

Run to populate the database with sample data:

```bash
node seed.js
```

---

## 🏗️ Project Structure

The backend follows a clean architecture:

* Models
* Controllers
* Routes
* Middleware

---

## 👤 Author

**Mohammed Nour**
