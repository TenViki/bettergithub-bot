import axios from "axios";
import { bot } from "../bot/bot";
import { IAuth } from "../models/auth.model";
import { UserGuilds } from "../types/discord";
import { refreshToken } from "./discordauth.service";

export const getUserGuilds = async (auth: IAuth) => {
  await refreshToken(auth);
  const response = await axios.get<UserGuilds[]>(
    "https://discordapp.com/api/users/@me/guilds",
    {
      headers: {
        Authorization: `Bearer ${auth.discordAccessToken}`,
      },
    }
  );

  return response.data;
};

export const getGuilds = async (
  auth: IAuth
): Promise<(UserGuilds & { bot: boolean })[]> => {
  console.log("Bot guilds: ", bot.guilds.cache);
  const userGuilds = await getUserGuilds(auth);

  // Only guilds where user has administrator permissions
  const userGuildsWithAdmin = userGuilds.filter(
    (guild) => (guild.permissions & 0x8) === 0x8
  );
  console.log("User guilds with admin: ", userGuildsWithAdmin);

  return userGuildsWithAdmin.map((guild) => ({
    ...guild,
    bot: bot.guilds.cache.has(guild.id),
  }));
};
