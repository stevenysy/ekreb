import axios from "axios";
import { WORDS_MAX_LEN, WORD_URL } from "./config.js";

/**
 * Calls a word dictionary API to get a random word. Sends an object containing the word and
 * the word's definition, part of speech, and frequency used
 * @param {Object} req request object passed in by Express
 * @param {Object} res response object passed in by Express
 */
export const getWordData = async function (req, res) {
  try {
    const { data } = await axios.request({
      method: "GET",
      url: `${WORD_URL}`,
      params: {
        random: "true",
        lettersMax: `${WORDS_MAX_LEN}`,
        hasDetails: "definitions",
      },
      headers: {
        "X-RapidAPI-Key": "53560c708amsh7574e0f3f7ee562p1baadajsn5ad54f952a63",
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
      },
    });

    const word = {
      word: data.word,
      scrambledWord: scramble(data.word),
      definition: data.results[0].definition,
      partOfSpeech: data.results[0].partOfSpeech,
      frequency: data.frequency,
    };

    res.send({ status: "success", data: word });
  } catch (err) {
    res.send({ status: "failed", message: err.message });
  }
};

/**
 * Scrambles the word passed in
 * @param {String} original the original, unscrambled word
 * @returns a scrambled version of the original word
 */
const scramble = function (original) {
  const wordArr = original.split("");

  // swap each letter in the word with a random other letter
  for (let i = wordArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    const temp = wordArr[i];
    wordArr[i] = wordArr[rand];
    wordArr[rand] = temp;
  }

  // make sure the word is scrambled
  const scrambled = wordArr.join("");
  if (scrambled === original) return scramble(scrambled);

  return scrambled;
};
