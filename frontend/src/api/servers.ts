import { GuildBasedChannel } from "discord.js";
import { server } from "../config/backend";
import { UserGuilds } from "../types/discord";

export const getGuilds = (token: string) => {
  return server.get<UserGuilds[] & { bot: boolean }>("/discord/guilds", {
    headers: {
      Authorization: token,
    },
  });
};

export const getChannels = (token: string, guildId: string) => {
  return server.get<{
    channels: (GuildBasedChannel & { canSendMessages: boolean })[];
    guild: UserGuilds;
  }>(`/discord/guilds/${guildId}`, {
    headers: {
      Authorization: token,
    },
  });
};
