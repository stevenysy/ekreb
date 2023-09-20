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
        },
      },
    },
  },
});

/**
 * Creates a component for the button to fetch a word from the backend
 * @returns component for the button to fetch a word from the backend
 */
const GetWordBtn = ({ handleClick, clicked }) => {
  return (
    <div className="buttons">
      <ThemeProvider theme={theme}>
        <Button variant="contained" onClick={handleClick}>
          {`Get a ${clicked ? "new " : ""}word`}
        </Button>
      </ThemeProvider>
    </div>
  );
};

export default GetWordBtn;
