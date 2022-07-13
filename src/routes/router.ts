import express from "express";
import authRouter from "./auth.router";

export const setupRoutes = (app: express.Application) => {
  app.use("/auth", authRouter);
};
