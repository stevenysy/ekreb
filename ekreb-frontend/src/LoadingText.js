const Spinner = () => <div className="loader"></div>;

const LoadingText = ({ text }) => {
  return (
    <div className="loading-text">
      <Spinner />
      <span>{text}</span>
    </div>
  );
};

export default LoadingText;
