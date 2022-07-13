import express from "express";
import { discordAuthMiddleware } from "../middleware/discord-auth";
import * as discordService from "../services/discord.service";

const discordRouter = express.Router();

discordRouter.get("/guilds", discordAuthMiddleware, async (req, res) => {
  if (!req.auth) return res.status(401).send({ error: "Not authenticated" });
  const guilds = await discordService.getGuilds(req.auth);
  res.send(guilds);
});

export default discordRouter;
