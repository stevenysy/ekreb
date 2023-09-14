import express from "express";
import * as model from "./model.js";
import cors from "cors";

app.use(cors());

const app = express();
const userStats = {
  score: 0,
};

app.get("/api/v1/words", async (req, res) => {
  try {
    const data = await model.getWordData();
    console.log(data);

    const word = {
      word: data.word,
      definition: data.results[0].definition,
      partOfSpeech: data.results[0].partOfSpeech,
      frequency: data.frequency,
    };

    res.send({ status: "success", data: word });
  } catch (err) {
    console.error(err);
  }
});

app.post("/", (req, res) => {
  res.send("You can send to this endpoint...");
});

app.patch("/api/v1/score", (req, res) => {
  userStats.score += parseInt(req.query.val);
  res.send(`${userStats.score}`);
});

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
