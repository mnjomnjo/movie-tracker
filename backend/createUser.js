import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    const user = await User.create({
      name: "Mohammed",
      email: "mohammed@test.com",
    });

    console.log("User added ✅", user);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error creating user:", error);

    await mongoose.disconnect();
    process.exit(1);
  }
};

createUser();