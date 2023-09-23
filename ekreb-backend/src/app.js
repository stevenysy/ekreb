import express from "express";
import * as model from "./model.js";
import cors from "cors";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// endpoint for GET request to get a random scrambled word
app.get("/api/v1/words", [model.getWordData]);

// endpoint for GET request to get the user's stats
app.get("/api/v1/stats", (req, res) => {
  res.json({ status: "success", data: model.userState });
});

// endpoint for PATCH request to send the user's guess
app.patch("/api/v1/words", async (req, res) => {
  const { guess, original, time, score } = req.query;

  // check the user's guess
  const correct = await model.checkUserGuess(guess, original);
  if (correct) {
    // update the score and the totalTime counter with the total time spent this round
    model.updateState(time, score);

    res.json({ status: "correct!", data: model.userState });
  } else {
    res.json({ status: "wrong!" });
  }
});

// endpoint for PATCH request to update just the total guessing time
app.patch("/api/v1/stats/time", (req, res) => {
  const { time } = req.query;
  model.updateTime(time);
  res.json({ status: "success", data: model.userState });
});

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

const port = 8000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
