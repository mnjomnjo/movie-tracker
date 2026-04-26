import mongoose from "mongoose";
import dotenv from "dotenv";

import Movie from "./models/Movie.js";
import User from "./models/User.js";
import Review from "./models/Review.js";

dotenv.config();

const seedData = async () => {
  try {
    // 🔌 Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    // 🧹 Clear existing data before seeding
    await Movie.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    // 👤 Create Users (realistic data)
    const users = await User.insertMany([
      { name: "Mohammed Hassan", email: "mohammed.hassan@gmail.com", password: "123456" },
      { name: "Sara Ahmed", email: "sara.ahmed@yahoo.com", password: "123456" },
      { name: "Ali Khaled", email: "ali.khaled@hotmail.com", password: "123456" },
      { name: "Lina Youssef", email: "lina.youssef@gmail.com", password: "123456" },
      { name: "Omar Farouk", email: "omar.farouk@outlook.com", password: "123456" },
    ]);

    // 🎬 Create Movies (each movie linked to a user)
    const movies = await Movie.insertMany([
      {
        title: "Inception",
        genre: "Sci-Fi",
        rating: 9,
        releaseYear: 2010,
        director: "Christopher Nolan",
        user: users[0]._id, // 🔗 relationship with User
      },
      {
        title: "Interstellar",
        genre: "Sci-Fi",
        rating: 8,
        releaseYear: 2014,
        director: "Christopher Nolan",
        user: users[1]._id,
      },
      {
        title: "The Dark Knight",
        genre: "Action",
        rating: 10,
        releaseYear: 2008,
        director: "Christopher Nolan",
        user: users[2]._id,
      },
      {
        title: "Titanic",
        genre: "Romance",
        rating: 8,
        releaseYear: 1997,
        director: "James Cameron",
        user: users[3]._id,
      },
      {
        title: "Avatar",
        genre: "Sci-Fi",
        rating: 7,
        releaseYear: 2009,
        director: "James Cameron",
        user: users[4]._id,
      },
    ]);

    // ⭐ Create Reviews (linking Users and Movies)
    await Review.insertMany([
      {
        userId: users[0]._id,
        movieId: movies[0]._id,
        score: 9,
        comment:
          "Mind-blowing concept and amazing visuals. One of my favorite movies.",
      },
      {
        userId: users[1]._id,
        movieId: movies[1]._id,
        score: 8,
        comment:
          "Great story and emotional depth. A bit complex but worth it.",
      },
      {
        userId: users[2]._id,
        movieId: movies[2]._id,
        score: 10,
        comment:
          "Best superhero movie ever made. The Joker performance is unforgettable.",
      },
      {
        userId: users[3]._id,
        movieId: movies[3]._id,
        score: 7,
        comment:
          "Classic love story with beautiful visuals, but a bit too long.",
      },
      {
        userId: users[4]._id,
        movieId: movies[4]._id,
        score: 6,
        comment:
          "Visually stunning movie, but the story could have been stronger.",
      },
    ]);

    console.log("Data seeded successfully ✅");

    // 🔌 Close DB connection properly
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);

    await mongoose.disconnect();
    process.exit(1);
  }
};

seedData();