import { Client } from "discord.js";

export const bot = new Client({
  intents: ["GUILDS"],
  partials: ["USER"],
});

export const setup = async () => {
  bot.login(process.env.BOT_TOKEN!);
};

bot.on("ready", (client) => {
  console.log(`Logged in as ${client.user.tag}`);
});
