import express from "express";
import * as model from "./model.js";
import cors from "cors";

const app = express();
app.use(cors());
const userStats = {
  score: 0,
};

app.get("/api/v1/words", [model.getWordData]);

app.post("/", (req, res) => {
  res.send("You can send to this endpoint...");
});

app.patch("/api/v1/score", (req, res) => {
  console.log(userStats.score);
  userStats.score += parseInt(req.query.val);
  console.log(userStats.score);
  res.send(`${userStats.score}`);
});

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
