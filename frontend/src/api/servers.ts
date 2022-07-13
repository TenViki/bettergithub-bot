import { server } from "../config/backend";
import { UserGuilds } from "../types/discord";

export const getGuilds = (token: string) => {
  return server.get<UserGuilds[] & { bot: boolean }>("/discord/guilds", {
    headers: {
      Authorization: token,
    },
  });
};
