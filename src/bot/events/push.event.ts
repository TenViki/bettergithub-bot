import { Channel, Client } from "discord.js";
import { EventHandler } from "../../types/github";
import { GithubDelivery_Push } from "../../types/githubWebhooks";
import { createEmbed } from "../../utils/embed";
import { formatFileName } from "../../utils/emote";
import { registerEvent } from "../bot";

registerEvent("push", (event, bot, channel) => {
  console.log(event);
  const embed = createEmbed(
    `${event.repository.name} - ${event.ref.split("/").pop()} (${
      event.commits.length
    } new commit${event.commits.length > 1 ? "s" : ""})`,
    event.commits
      .map(
        (commit) => `**[${commit.message}](${commit.url}) - ${
          commit.author.name
        }**
${commit.added
  .map((file) => `<:add:996894889214226492>${formatFileName(file)}`)
  .join("\n")}
${commit.modified
  .map((file) => `<:modify:996894888127901727>${formatFileName(file)}`)
  .join("\n")}
${commit.removed
  .map((file) => `<:delete:996894886848630855>${formatFileName(file)}`)
  .join("\n\n")}`
      )
      .join("\n"),
    "#dba90a",
    event.sender
  );

  channel.send({ embeds: [embed] });
});
