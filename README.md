# 🎬 Movie Tracker App

A fullstack web application to track movies, ratings, and reviews using the MERN stack.

## 📌 Problem

This application helps users organize and rate movies they have watched in a simple and structured way.

---

## 🚀 Tech Stack

* Frontend: React (Vite)
* Backend: Node.js + Express
* Database: MongoDB Atlas

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/mnjomnjo/movie-tracker.git
cd movie-tracker
```

---

### 2. Setup Backend

```
cd backend
npm install
```

Create a `.env` file inside backend:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run backend:

```
node server.js
```

---

### 3. Setup Frontend

Open a new terminal:

```
cd frontend
npm install
npm run dev
```

---

### 4. Open App

Go to:

```
http://localhost:5173
```

---

## 🧱 Features

* Add new movies
* Edit existing movies
* Delete movies
* View movie list
** Filter movies by genre and rating
* Get top-rated movies
* Manage reviews linked to movies and users
---

## 🔗 API Endpoints

### Movies

* GET /api/movies
* POST /api/movies
* PUT /api/movies/:id
* DELETE /api/movies/:id
* GET /api/movies/top-rated
* GET /api/movies/:id/reviews

### Reviews

* GET /api/reviews (with populate)
* POST /api/reviews
* PUT /api/reviews/:id
* DELETE /api/reviews/:id

---

## 📊 Database Design

Collections:

* Users
* Movies
* Reviews

Relationships:

* Review → User
* Review → Movie

---

## 🧪 Seed Data

Run to populate the database with sample data:

```
node seed.js
```

---
## 🏗️ Structure

The backend is organized using:
- Models
- Controllers
- Routes

---
## 👤 Author

Mohammed Nour
