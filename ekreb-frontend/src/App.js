import GetWordBtn from "./GetWordBtn";
import GuessForm from "./GuessForm";

function App() {
  const title = "ekreb";

  return (
    <div className="App">
      <div className="title">
        <h1>{title}</h1>
      </div>
      <GuessForm />
      <GetWordBtn />
    </div>
  );
}

export default App;
