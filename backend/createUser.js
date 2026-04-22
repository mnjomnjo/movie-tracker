import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await User.create({
  name: "Mohammed",
  email: "mohammed@test.com"
});

console.log("User added ✅");
process.exit();