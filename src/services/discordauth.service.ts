import axios from "axios";
import url from "url";
import jwt from "jsonwebtoken";
import { Auth } from "../models/auth.model";

export const getDiscordAuth = async (code: string) => {
  const response = await axios.post<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
  }>(
    "https://discordapp.com/api/oauth2/token",
    new url.URLSearchParams({
      client_id: process.env.DISCORD_APP_ID!,
      client_secret: process.env.DISCORD_APP_SECRET!,
      code,
      grant_type: "authorization_code",
      redirect_uri: process.env.DISCORD_REDIRECT_URI!,
      scope: "identify",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const auth = await Auth.create({
    discordRefreshToken: response.data.refresh_token,
    discordAccessToken: response.data.access_token,
  });

  const token = createToken(auth._id.toString());

  return token;
};

export const createToken = async (sessionId: string) => {
  // Create a JWT token for user
  const token = jwt.sign({ sessionId }, process.env.JWT_SECRET!);
  return token;
};
