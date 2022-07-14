import { registerEvent } from "../bot";

registerEvent("workflow_job", (event, bot, channel) => {
  console.log(event);
});
