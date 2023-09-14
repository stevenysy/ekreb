// const axios = require("axios");
import axios from "axios";

export const getWordData = async function () {
  try {
    const myResponse = await axios.request({
      method: "GET",
      url: "https://wordsapiv1.p.rapidapi.com/words/",
      params: {
        random: "true",
        lettersMax: "7",
        hasDetails: "definitions",
      },
      headers: {
        "X-RapidAPI-Key": "53560c708amsh7574e0f3f7ee562p1baadajsn5ad54f952a63",
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
      },
    });

    return myResponse.data;
  } catch (error) {
    console.error(error);
  }
};

export const scramble = function (original) {
  const wordArr = original.split("");

  for (let i = wordArr.length - 1; i > 0; i++) {
    const temp = Math.floor();
  }
};
