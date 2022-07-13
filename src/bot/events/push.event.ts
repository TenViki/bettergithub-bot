import { Channel, Client } from "discord.js";
import { EventHandler } from "../../types/github";
import { GithubDelivery_Push } from "../../types/githubWebhooks";
import { createEmbed } from "../../utils/embed";
import { registerEvent } from "../bot";

registerEvent("push", (event, bot, channel) => {
  const embed = createEmbed(
    `${event.repository.name} - ${event.ref.split("/").pop()} (${
      event.commits.length
    } new commit${event.commits.length > 1 ? "s" : ""})`,
    event.commits.map((commit) => `${commit.message}`).join("\n"),
    "#00ff00",
    event.sender
  );

  channel.send({ embeds: [embed] });
});
