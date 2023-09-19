import axios from "axios";
import { WORDS_MAX_LEN, WORD_URL } from "./config.js";

export const userState = {
  score: 0,
  wordsGuessed: 0,
  totalTime: 0,
  avgUnscrambleTime: 0,
};

/**
 * Updates the user's score and time data
 * @param {String} score score to be added to the user's total score
 * @param {String} time time in seconds to be added to the user's total time
 */
export const updateState = function (time, score) {
  userState.wordsGuessed++;
  userState.score += parseInt(score);
  userState.totalTime += parseInt(time);
  userState.avgUnscrambleTime = Math.round(
    userState.totalTime / userState.wordsGuessed
  );
};

/**
 * Calls a word dictionary API to get a random word. Sends an object containing the word and
 * the word's definition, part of speech, and frequency score as the response
 * @param {Object} req request object passed in by Express
 * @param {Object} res response object passed in by Express
 */
export const getWordData = async function (req, res) {
  try {
    let data = await requestWord();
    while (!data.frequency) {
      data = await requestWord();
    }

    const word = {
      word: data.word,
      scrambledWord: scramble(data.word),
      definition: data.results[0].definition,
      partOfSpeech: data.results[0].partOfSpeech,
      frequency: data.frequency,
    };

    res.json({ status: "success", data: word });
  } catch (err) {
    res.json({ status: "failed", message: err.message });
  }
};

/**
 * Calls a word dictionary API to get a random word
 * @returns object containing data of the word returned from the dictionary API
 */
const requestWord = async function () {
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

  return data;
};

/**
 * Helper function that scrambles the word passed in
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

/**
 * Checks if the user's guess is a valid unscrabled version of the scrambled word that
 * can be found in a dictionary API
 * @param {String} guess the user's guess
 * @param {String} original the original word
 * @returns true if the guess is correct, false otherwise
 */
export const checkUserGuess = async function (guess, original) {
  if (guess.toLowerCase() === original.toLowerCase()) return true;
  if (guess.length !== original.length) return false;

  // check if user guess contains exactly the same characters as original word
  const guessArr = guess.toLowerCase().split("");
  const origArr = original.toLowerCase().split("");
  for (const char of origArr) {
    if (guessArr.indexOf(char) === -1) {
      return false;
    } else {
      guessArr.splice(guessArr.indexOf(char), 1);
    }
  }

  // check if user guess is valid dictionary word
  try {
    const status = await checkDict(guess);
    if (status === 404) return false;
  } catch (err) {
    console.error(`${err.message}. ${guess} is not a valid dictionary word!`);
    return false;
  }

  // the user guess is a valid dictionary word that contains exactly the same characters
  // as the original word: return true
  return true;
};

/**
 * Helper function, calls the Words API to check if the word passed in is a valid dictionary word
 * @param {String} word the word to be checked
 * @returns the status of the API response
 */
const checkDict = async function (word) {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://wordsapiv1.p.rapidapi.com/words/${word}`,
    headers: {
      "X-RapidAPI-Key": "53560c708amsh7574e0f3f7ee562p1baadajsn5ad54f952a63",
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
    },
  };

  try {
    // call the API and request for the word passed in
    const response = await axios.request(config);
    return response.status;
  } catch (err) {
    throw err; // throw the error again to be handled by the checkUserGuess() function
  }
};
