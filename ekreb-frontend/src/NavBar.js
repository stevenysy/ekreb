import Timer from "./Timer";
import StatsButton from "./StatsButton";
import HintBtn from "./HintBtn";

const NavBar = ({ isGuessing, time, handleHint }) => {
  return (
    <div className="navbar">
      {isGuessing && <Timer time={time} />}
      <HintBtn handleClick={handleHint} />
      <StatsButton />
    </div>
  );
};

export default NavBar;
