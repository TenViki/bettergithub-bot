import express from "express";
// Create router
const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.send("Auth");
});

authRouter.post("/", (req, res) => {
  if (!req.body.code) {
    res.status(400).send({ error: "Missing code" });
  }

  res.send({
    code: req.body.code,
    message: "Code received",
  });
});

export default authRouter;
