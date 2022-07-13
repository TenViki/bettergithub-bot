import { Schema, model } from "mongoose";

const authSchema = new Schema({
  discordRefreshToken: String,
  discordAccessToken: String,
});

export const Auth = model("Auth", authSchema);
