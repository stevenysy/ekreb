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

const StatsButton = ({ handleClick }) => {
  return (
    <div className="buttons-stats">
      <ThemeProvider theme={theme}>
        <Button variant="contained" className="stats" onClick={handleClick}>
          {`📈 stats`}
        </Button>
      </ThemeProvider>
    </div>
  );
};

export default StatsButton;
