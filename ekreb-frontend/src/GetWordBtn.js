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

const GetWordBtn = () => {
  const handleClick = () => {
    console.log("requested word");
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
