import { useState } from "react";
import Title from "./Title";
import GetWordBtn from "./GetWordBtn";
import GuessForm from "./GuessForm";
import LoadingText from "./LoadingText";

function App() {
  // states
  const [title, setTitle] = useState("ekreb");
  const [word, setWord] = useState({
    word: "",
    scrambledWord: "",
    definition: "",
    partOfSpeech: "",
    frequency: "",
  });
  const [gameStart, setGameStart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [guessText, setGuessText] = useState("");
  const [wrongGuess, setWrongGuess] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [message, setMessage] = useState("Unscramble!");

  /**
   * Renders a loading spinner with the message set to text
   * @param {String} text the loading message to be displayed
   */
  const renderLoad = function (text) {
    setIsLoading(true);
    setLoadingText(text);
  };

  /**
   * Updates the word state
   * @param {Object} data the word data received from the API
   */
  const updateWord = function (data) {
    setWord({
      word: data.word,
      scrambledWord: data.scrambledWord,
      definition: data.definition,
      partOfSpeech: data.partOfSpeech,
      frequency: data.frequency,
    });
  };

  /**
   * Handles the click event on the "get word" button
   */
  const handleGetWord = async function () {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    renderLoad("fetching a word...");
    setCorrect(false);

    try {
      const response = await fetch("/api/v1/words", requestOptions);
      const { data } = await response.json();
      console.log(data);

      // update the states
      updateWord(data);
      setIsLoading(false);
      setTitle(data.scrambledWord);
      setGuessText("");
      if (!gameStart) setGameStart(true);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Handles the submit event of the user's guess
   * @param {String} guess the user's guess
   */
  const handleSubmitGuess = async function (guess) {
    console.log(guess);
    console.log(word);

    const requestOptions = {
      method: "PATCH",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `/api/v1/words?guess=${guess}&original=${
          word.word
        }&time=10&score=${Math.pow(2, word.word.length)}`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);

      if (!data.data) {
        setWrongGuess(true);
        setMessage("Wrong guess! Try again!");
      } else {
        setWrongGuess(false);
        setCorrect(true);
        setMessage(`Correct!`);
        setTitle(guess);
      }
    } catch (err) {
      console.error("Wrong guess! Try again :-)");
    }
  };

  return (
    <div className="App">
      <Title word={title} />
      {gameStart && (
        <GuessForm
          handleSubmit={handleSubmitGuess}
          text={guessText}
          setText={setGuessText}
          error={wrongGuess}
          message={message}
          correct={correct}
        />
      )}
      <GetWordBtn handleClick={handleGetWord} clicked={gameStart} />
      {isLoading && <LoadingText text={loadingText} />}
    </div>
  );
}

export default App;
