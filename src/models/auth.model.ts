import { Schema, model } from "mongoose";

const authSchema = new Schema({
  discordRefreshToken: String,
  discordAccessToken: String,
  sessionId: String,
});

export const Auth = model("Auth", authSchema);
