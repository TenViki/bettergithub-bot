import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const main = async () => {
  console.log("BetterGithub app is starting...");

  if (!process.env.MONGO_URL) throw new Error("Env MONGO_URL is not defined");
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to MongoDB");
};

main();
