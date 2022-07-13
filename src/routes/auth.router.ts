import express from "express";
// Create router
const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.send("Auth");
});

export default authRouter;
