import Timer from "./Timer";
import StatsButton from "./StatsButton";
import HintBtn from "./HintBtn";
import { HINT_SEC } from "./config";

const NavBar = ({ isGuessing, time, handleHint, display, lastHintTime }) => {
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
  if (isGuessing && !display && time - lastHintTime >= HINT_SEC) {
    display = true;
  }

  return (
    <div className="navbar">
      {isGuessing && <Timer time={formatTime(time)} />}
      {display && <HintBtn handleClick={handleHint} />}
      <StatsButton />
    </div>
  );
};

export default NavBar;
