import * as model from "./model";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import Button from "@mui/material/Button";

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[200],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "IBM Plex Mono",
          textTransform: "lowercase",
          fontWeight: "bold",
          fontSize: "1.25rem",
          marginTop: "3rem",
        },
      },
    },
  },
});

/**
 * Creates a component for the button to fetch a word from the backend
 * @returns component for the button to fetch a word from the backend
 */
const GetWordBtn = () => {
  const handleClick = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch("/api/v1/words", requestOptions);
      const { data } = await response.json();
      model.state.word = data;
      console.log(data);
      console.log(model.state.word);
    } catch (err) {
      console.error(err);
    }

    // fetch("/api/v1/words", requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     model.state.word = result.data;
    //     console.log(result.data);
    //     console.log(model.state.word);
    //   })
    //   .catch((error) => console.log("error", error));
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="buttons">
        <Button variant="contained" onClick={handleClick}>
          Get a word
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default GetWordBtn;
