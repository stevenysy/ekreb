import express from "express";
import * as model from "./model.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// GET request to get a random scrambled word
app.get("/api/v1/words", [model.getWordData]);

//////////////////////////////////////////////////////////
// PATCH request for the frontend to send the user's guess
app.patch("/api/v1/words", async (req, res) => {
  const { guess, original, time, score } = req.query;

  // check the user's guess
  const correct = await model.checkUserGuess(guess, original);
  if (correct) {
    // update the score and the totalTime counter with the total time spent this round
    model.updateScoreAndTime(score, time);
    console.log(model.userState);

    res.status(200).json({ status: "correct!", data: model.userState });
  } else {
    res.status(404).json({ status: "wrong!" });
  }
});

app.patch("/api/v1/score", (req, res) => {
  console.log("score before:", model.userState.score);
  model.userState.score += parseInt(req.query.val);
  console.log("score after:", model.userState.score);
  res.json(`${model.userState.score}`);
});

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
