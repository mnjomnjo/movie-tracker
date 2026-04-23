import mongoose from "mongoose";
import dotenv from "dotenv";

import Movie from "./models/Movie.js";
import User from "./models/User.js";
import Review from "./models/Review.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    await Movie.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    const users = await User.insertMany([
      { name: "Mohammed", email: "m1@test.com" },
      { name: "Sara", email: "sara@test.com" },
      { name: "Ali", email: "ali@test.com" },
      { name: "Lina", email: "lina@test.com" },
      { name: "Omar", email: "omar@test.com" }
    ]);
const movies = await Movie.insertMany([
  { title: "Inception", genre: "Sci-Fi", rating: 9, releaseYear: 2010, director: "Christopher Nolan" },
  { title: "Interstellar", genre: "Sci-Fi", rating: 9, releaseYear: 2014, director: "Christopher Nolan" },
  { title: "The Dark Knight", genre: "Action", rating: 10, releaseYear: 2008, director: "Christopher Nolan" },
  { title: "Titanic", genre: "Romance", rating: 8, releaseYear: 1997, director: "James Cameron" },
  { title: "Avatar", genre: "Fantasy", rating: 7, releaseYear: 2009, director: "James Cameron" }
]);

   await Review.insertMany([
  {
    userId: users[0]._id,
    movieId: movies[0]._id,
    score: 9,
    comment: "Amazing"
  },
  {
    userId: users[1]._id,
    movieId: movies[1]._id,
    score: 8,
    comment: "Great"
  },
  {
    userId: users[2]._id,
    movieId: movies[2]._id,
    score: 10,
    comment: "Masterpiece"
  },
  {
    userId: users[3]._id,
    movieId: movies[3]._id,
    score: 7,
    comment: "Nice"
  },
  {
    userId: users[4]._id,
    movieId: movies[4]._id,
    score: 6,
    comment: "Good"
  }
]);

    console.log("Data seeded ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();