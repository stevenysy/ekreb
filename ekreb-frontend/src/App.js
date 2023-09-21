import { useEffect, useRef, useState } from "react";
import Title from "./Title";
import GetWordBtn from "./GetWordBtn";
import GuessForm from "./GuessForm";
import LoadingText from "./LoadingText";
import NavBar from "./NavBar";

function App() {
  // states
  const [word, setWord] = useState({
    word: "",
    scrambledWord: "",
    definition: "",
    partOfSpeech: "",
    frequency: "",
  });
  const [title, setTitle] = useState("ekreb");
  const [gameStart, setGameStart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGuessing, setIsGuessing] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [guessText, setGuessText] = useState("");
  const [wrongGuess, setWrongGuess] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [message, setMessage] = useState("Unscramble!");
  const [time, setTime] = useState(0);
  const timeRef = useRef();
  const [timerId, setTimerId] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [displayHint, setDisplayHint] = useState(false);
  const [lastHintTime, setLastHintTime] = useState(0);

  // cache the current time in order to increment the time every second
  useEffect(() => {
    timeRef.current = time;
  }, [time]);

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
    resetGame();

    try {
      const response = await fetch("/api/v1/words", requestOptions);
      const { data } = await response.json();
      console.log(data);

      initGame(data);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Resets the game:
   * 1. set the correct state to false (the user has not guessed yet)
   * 2. reset the textfield label to prompt the user to unscramble word
   * 3. reset the timers
   */
  const resetGame = function () {
    setCorrect(false);
    setMessage("Press Enter to unscramble!");
    clearInterval(timerId);
    setTime(0);
    setLastHintTime(0);
  };

  /**
   * Initiates the timer
   */
  const initTimer = function () {
    setTime(0);
    const id = setInterval(() => {
      setTime(timeRef.current + 1);
    }, 1000);
    setTimerId(id);
  };

  /**
   * Initiates the game once a word has been fetched:
   * 1. set the gameStart state to true if this is first time starting game to display
   *    the guessing textfield
   * 2. update the word state with the data received
   * 3. set the isLoading state to false to hide the loding spinner
   * 4. set the isGuessing state to true to display the timer
   * 5. set the hintCount state to 0 to hide the hint
   * 6. render the scrmbled word to the title
   * 7. clear the guessing textfield
   * 8. initiate the timer
   * @param {Object} data the word data received from the API
   */
  const initGame = function (data) {
    // update the states
    if (!gameStart) setGameStart(true);
    updateWord(data);
    setIsLoading(false);
    setIsGuessing(true);
    setHintCount(0);
    setTitle(data.scrambledWord);
    setGuessText("");
    initTimer();
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
        }&time=${time}&score=${Math.pow(2, word.word.length - hintCount)}`,
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
        clearInterval(timerId);
      }
    } catch (err) {
      console.error("Wrong guess! Try again :-)");
    }
  };

  /**
   * Handles the event of the user asking for a guess
   */
  const handleGetHint = function () {
    setLastHintTime(time);
    setDisplayHint(false);
    if (hintCount < word.word.length) setHintCount(hintCount + 1);
  };

  return (
    <div className="App">
      <NavBar
        isGuessing={isGuessing}
        time={time}
        handleHint={handleGetHint}
        display={displayHint}
        lastHintTime={lastHintTime}
      />
      <Title word={title} />
      {gameStart && (
        <GuessForm
          handleSubmit={handleSubmitGuess}
          text={guessText}
          setText={setGuessText}
          error={wrongGuess}
          message={message}
          correct={correct}
          hint={
            hintCount !== 0
              ? `The word starts with: ${word.word.substring(0, hintCount)}`
              : ""
          }
        />
      )}
      <GetWordBtn handleClick={handleGetWord} clicked={gameStart} />
      {isLoading && <LoadingText text={loadingText} />}
    </div>
  );
}

export default App;
