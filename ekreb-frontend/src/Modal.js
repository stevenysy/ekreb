const Modal = ({ stats, closeModal }) => {
  return (
    <div className="modal-and-overlay">
      <div className="modal">
        <button className="close-modal" onClick={closeModal}>
          &times;
        </button>
        <div className="stats">
          <h1>📈 game stats 📈</h1>
          <div className="stats-item">
            <span className="stats-name">score: </span>
            <span className="stats-value">{stats.score}</span>
          </div>
          <div className="stats-item">
            <span className="stats-name">unscrambled words: </span>
            <span className="stats-value">{stats.wordsGuessed}</span>
          </div>
          <div className="stats-item">
            <span className="stats-name">total unscrambling time: </span>
            <span className="stats-value">{stats.totalTime}</span>
          </div>
          <div className="stats-item">
            <span className="stats-name">average unscrambling time: </span>
            <span className="stats-value">{stats.avgUnscrambleTime}</span>
          </div>
        </div>
      </div>
      <div className="overlay" onClick={closeModal}></div>
    </div>
  );
};

export default Modal;
