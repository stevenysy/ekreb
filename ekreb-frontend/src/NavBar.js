import Timer from "./Timer";
import StatsButton from "./StatsButton";
import HintBtn from "./HintBtn";
import { HINT_SEC } from "./config";

const NavBar = ({
  isGuessing,
  time,
  formatTime,
  handleHint,
  display,
  lastHintTime,
  gameStart,
  handleStats,
}) => {
  // Display the hint button 30 seconds after the user last asked for a hint
  if (isGuessing && !display && time - lastHintTime >= HINT_SEC) {
    display = true;
  }

  return (
    <div className="navbar">
      {gameStart && <Timer time={formatTime(time)} />}
      {display && <HintBtn handleClick={handleHint} />}
      {gameStart && <StatsButton handleClick={handleStats} />}
    </div>
  );
};

export default NavBar;
