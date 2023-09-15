import express from "express";
import * as model from "./model.js";
import cors from "cors";

const app = express();
app.use(cors());

// GET request to get a random scrambled word
app.get("/api/v1/words", [model.getWordData]);

app.post("/", (req, res) => {
  res.send("You can send to this endpoint...");
});

app.patch("/api/v1/score", (req, res) => {
  console.log("score before:", model.userState.score);
  model.userState.score += parseInt(req.query.val);
  console.log("score after:", model.userState.score);
  res.send(`${model.userState.score}`);
});

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
