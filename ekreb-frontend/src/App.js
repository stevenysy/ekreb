import { useState } from "react";
import Title from "./Title";
import GetWordBtn from "./GetWordBtn";
import GuessForm from "./GuessForm";
import LoadingText from "./LoadingText";

function App() {
  const [title, setTitle] = useState("ekreb");
  const [display, setDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    setIsLoading(true);

    try {
      const response = await fetch("/api/v1/words", requestOptions);
      const { data } = await response.json();
      console.log(data);
      setIsLoading(false);
      setTitle(data.scrambledWord);
      setDisplay(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Title word={title} />
      {display && <GuessForm />}
      <GetWordBtn handleClick={handleClick} />
      {isLoading && <LoadingText text={"fetching a word..."} />}
    </div>
  );
}

export default App;
