import { useEffect, useRef, useState } from "react";
import { TIME_LIMIT_SEC } from "./config";
import Title from "./Title";
import GetWordBtn from "./GetWordBtn";
import GuessForm from "./GuessForm";
import LoadingText from "./LoadingText";
import NavBar from "./NavBar";
import Modal from "./Modal";

function App() {
  // ********************* States and State Update Functions *********************

  const [word, setWord] = useState({
    word: "",
    scrambledWord: "",
    definition: "",
    partOfSpeech: "",
    frequency: "",
  });
  const [stats, setStats] = useState({
    score: 0,
    wordsGuessed: 0,
    totalTime: "00:00",
    avgUnscrambleTime: "00:00",
  });
  const [title, setTitle] = useState("ekreb");
  const [gameStart, setGameStart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGuessing, setIsGuessing] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [guessText, setGuessText] = useState("");
  const [wrongGuess, setWrongGuess] = useState(false);
  const [disableGuess, setDisableGuess] = useState(false);
  const [message, setMessage] = useState("type here and enter!");
  const [time, setTime] = useState(0);
  const timeRef = useRef();
  const [timerId, setTimerId] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [hintCount, setHintCount] = useState(0);
  const [displayHint, setDisplayHint] = useState(false);
  const [lastHintTime, setLastHintTime] = useState(0);
  const [displayStats, setDisplayStats] = useState(false);

  // cache the current time in order to increment the time every second
  // set timeUp state to true if the time reached the time limit
  useEffect(() => {
    timeRef.current = time;
    if (time === TIME_LIMIT_SEC) setTimeUp(true);
  }, [time]);

  // Monitors the timer. When the time is up:
  // 1. display the correct word
  // 2. disable the guessing textfield
  // 3. render error
  useEffect(() => {
    if (!timeUp) return;

    clearInterval(timerId);
    setDisplayHint(false);
    setIsGuessing(false);
    setWrongGuess(true);
    setDisableGuess(true);
    setMessage("time's up 💥");
    setTitle(word.word);
  }, [timeUp, timerId, word.word]);

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
   * Updates the user's game stats
   * @param {Object} data the user's game stats returned by the API
   */
  const updateStats = function (data) {
    setStats({
      score: data.data.score,
      wordsGuessed: data.data.wordsGuessed,
      totalTime: formatTime(data.data.totalTime),
      avgUnscrambleTime: formatTime(data.data.avgUnscrambleTime),
    });
  };

  // ****************************** Event Handlers ******************************

  /**
   * Handles the click event on the "get word" button
   */
  const handleGetWord = async function () {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    renderLoad("fetching a word...");
    resetCounters();
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
   * Handles the submit event of the user's guess
   * @param {String} guess the user's guess
   */
  const handleSubmitGuess = async function (guess) {
    // make PATCH request to the API with the guess, original word, time, and score data
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

      if (!data.data) {
        // guess is wrong
        setWrongGuess(true);
        setMessage("wrong guess! try again!");
      } else {
        // guess is correct
        setCorrectGuess(guess, data);
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

  // ****************************** Helper Functions ******************************

  /**
   * Helper function that resets the counters for:
   * 1. the time of the last hint
   * 2. the hint count
   * 3. the timer
   */
  const resetCounters = function () {
    setLastHintTime(0);
    setHintCount(0);
    clearInterval(timerId);
  };

  /**
   * Renders a loading spinner with the message set to text
   * @param {String} text the loading message to be displayed
   */
  const renderLoad = function (text) {
    setIsLoading(true);
    setLoadingText(text);
  };

  /**
   * Helper function that initiates the timer
   */
  const initTimer = function () {
    setTime(0);
    const id = setInterval(() => {
      setTime(timeRef.current + 1);
    }, 1000);
    setTimerId(id);
  };

  /**
   * Formats the time to be rendered
   * @param {Number} seconds the time in seconds to be formatted
   * @returns the time formatted to {minutes}:{seconds}
   */
  const formatTime = function (seconds) {
    const min = String(Math.trunc(seconds / 60)).padStart(2, 0);
    const sec = String(seconds % 60).padStart(2, 0);
    return `${min}:${sec}`;
  };

  /**
   * Helper function that initiates the game once a word has been fetched:
   * 1. set the gameStart state to true if this is first time starting game to display
   *    the guessing textfield
   * 2. update the word state with the data received
   * 3. set the isLoading state to false to hide the loding spinner
   * 4. set the isGuessing state to true to display the timer
   * 5. set the hintCount state to 0 to hide the hint
   * 6. render the scrmbled word to the title
   * 7. clear the guessing textfield
   * 8. set the wrongGuess state to false
   * 9. initiate the timer
   * @param {Object} data the word data received from the API
   */
  const initGame = function (data) {
    if (!gameStart) setGameStart(true);
    setTimeUp(false);
    setDisableGuess(false);
    setMessage("type here and enter!");
    updateWord(data);
    setIsLoading(false);
    setIsGuessing(true);
    setTitle(data.scrambledWord);
    setGuessText("");
    setWrongGuess(false);
    initTimer();
  };

  /**
   * Helper function that manipulates state variables when the user enters a correct guess:
   * 1. set the wrongGuess state to false and the correct state to true to change textfield color
   * 2. set the textfield label to "Correct 🎉"
   * 3. set the isGuessing and displayHint states to false to hide hint button
   * 4. set the title to the correct word
   * 5. stop the timer
   * @param {String} guess the user's guess
   */
  const setCorrectGuess = function (guess, data) {
    setWrongGuess(false);
    setDisableGuess(true);
    setMessage(`correct 🎉`);
    setIsGuessing(false);
    setDisplayHint(false);
    setTitle(guess);
    updateStats(data);
    clearInterval(timerId);
  };

  return (
    <div className="App">
      <NavBar
        isGuessing={isGuessing}
        time={time}
        formatTime={formatTime}
        handleHint={handleGetHint}
        display={displayHint}
        lastHintTime={lastHintTime}
        gameStart={gameStart}
        handleStats={() => {
          setDisplayStats(true);
        }}
      />
      <Title word={title} />
      {gameStart && (
        <GuessForm
          handleSubmit={handleSubmitGuess}
          text={guessText}
          setText={setGuessText}
          error={wrongGuess}
          message={message}
          disabled={disableGuess}
          hint={
            hintCount !== 0
              ? `The word starts with: ${word.word.substring(0, hintCount)}`
              : ""
          }
        />
      )}
      <GetWordBtn handleClick={handleGetWord} clicked={gameStart} />
      {isLoading && <LoadingText text={loadingText} />}
      {displayStats && (
        <Modal stats={stats} closeModal={() => setDisplayStats(false)} />
      )}
    </div>
  );
}

export default App;
