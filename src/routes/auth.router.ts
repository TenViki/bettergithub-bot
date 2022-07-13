import express from "express";
import * as discordAuthService from "../services/discordauth.service";
// Create router
const authRouter = express.Router();

authRouter.get("/", (req, res) => {});

authRouter.post("/", async (req, res) => {
  if (!req.body.code) {
    res.status(400).send({ error: "Missing code" });
  }

  let token: string;

  try {
    token = await discordAuthService.getDiscordAuth(req.body.code);
  } catch (error) {
    return res.status(401).send({ error: "Invalid code" });
  }

  res.send({
    token: token,
    message: "Code received",
  });
});

export default authRouter;
