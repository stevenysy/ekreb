import Timer from "./Timer";
import StatsButton from "./StatsButton";
import HintBtn from "./HintBtn";
import { useState } from "react";
import { HINT_SEC } from "./config";

const NavBar = ({ isGuessing, time, handleHint }) => {
  const [display, setDisplay] = useState(false);
  const [lastHintTime, setLastHintTime] = useState(0);

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

  // Display the hint button 30 seconds after the user last asked for a hint
  if (!display && time - lastHintTime >= HINT_SEC) {
    setDisplay(true);
  }

  /**
   * Combines handler function passed in the props with functions to update states in
   * this component
   */
  const handleGetHint = function () {
    setLastHintTime(time);
    setDisplay(false);
    handleHint();
  };

  return (
    <div className="navbar">
      {isGuessing && <Timer time={formatTime(time)} />}
      {display && <HintBtn handleClick={handleGetHint} />}
      <StatsButton />
    </div>
  );
};

export default NavBar;
