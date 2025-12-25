import { Client, TextChannel } from "discord.js";
import { GithubEvents } from "../types/githubWebhooks";
import * as fs from "fs/promises";
import { Webhook } from "../models/webhook.model";
import path from "path";

export const bot = new Client({
  intents: ["GUILDS"],
  partials: ["USER"],
});

const events = new Map<keyof GithubEvents, any>();

export const setup = async () => {
  bot.login(process.env.BOT_TOKEN!);
  const eventsDir = path.join(__dirname, "events");
  console.log("Loading events from:", eventsDir);
  const eventFiles = await fs.readdir(eventsDir);
  for (const event of eventFiles) {
    if (event.endsWith(".event.js")) {
      const eventName = event.replace(".js", "");
      const eventPath = path.join(eventsDir, event);
      console.log("Loading event:", eventPath);
      await import(eventPath);
    }
  }
};

bot.on("ready", (client) => {
  console.log(`Logged in as ${client.user.tag}`);
});

export const registerEvent = <K extends keyof GithubEvents>(
  event: K,
  handler: (event: GithubEvents[K], bot: Client, channel: TextChannel) => void
) => {
  events.set(event, handler);
  console.log("Registered event: " + event);
};

export const handleEvent = async (
  event: GithubEvents[keyof GithubEvents],
  webhookId: string
) => {
  const webhook = await Webhook.findOne({ _id: webhookId });
  if (!webhook) {
    console.log("Webhook not found");
    return;
  }

  const channel = bot.channels.cache.get(webhook.channel) as TextChannel;

  if (!channel) {
    console.log("Channel not found");
    return;
  }

  const handler = events.get(event.event_type);
  if (!handler) {
    console.log("Handler not found");
    return;
  }

  await handler(event, bot, channel);
};
