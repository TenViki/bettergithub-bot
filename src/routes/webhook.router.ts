import { Router } from "express";
import { handleEvent } from "../bot/bot";
import { GithubDeliveryWebhook } from "../types/githubWebhooks";

const router = Router();

router.post("/:webhookId", async (req, res) => {
  const webhookObject: GithubDeliveryWebhook = {
    ...req.body,
    event_type: req.headers["x-github-event"],
  };

  console.log(webhookObject);

  res.send("OK");

  try {
    await handleEvent(webhookObject, req.params.webhookId);
  } catch (error) {
    console.error(error);
  }
});

export default router;
