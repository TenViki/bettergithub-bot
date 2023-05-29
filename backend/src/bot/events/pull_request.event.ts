import { createEmbed } from "../../utils/embed";
import { registerEvent } from "../bot";

registerEvent("pull_request", (event, bot, channel) => {
  const embed = createEmbed(
    `${event.repository.name} - Pull request #${event.number} (${event.pull_request.state})`,
    `**${event.pull_request.title}**\n${event.pull_request.body}`,
    "#7f8c8d",
    event.sender
  );

  channel.send({ embeds: [embed] });
});
