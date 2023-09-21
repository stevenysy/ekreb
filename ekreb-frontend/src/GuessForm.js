import TextField from "@mui/material/TextField";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#f0ffff",
            "--TextField-brandBorderHoverColor": "#B2BAC2",
            "--TextField-brandBorderFocusedColor": "#E0E3E7",
            "--TextField-brandBorderCorrectColor": "#399E27",
            "& label:not(.Mui-disabled, .Mui-error)": {
              color: "var(--TextField-brandBorderColor)",
            },
            "& label.Mui-hover": {
              color: "var(--TextField-brandBorderHoverColor)",
            },
            "& label.Mui-focused:not(.Mui-disabled, .Mui-error)": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
            "& label.Mui-disabled": {
              color: "var(--TextField-brandBorderCorrectColor)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover:not(.Mui-disabled, .Mui-error) .${outlinedInputClasses.notchedOutline}`]:
              {
                borderColor: "var(--TextField-brandBorderHoverColor)",
              },
            [`&.Mui-focused:not(.Mui-disabled, .Mui-error) .${outlinedInputClasses.notchedOutline}`]:
              {
                borderColor: "var(--TextField-brandBorderFocusedColor)",
              },
            [`&.Mui-disabled .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderCorrectColor)",
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&:before, &:after": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&:before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });

/**
 * Creates a component for the form used to submit the user's guess
 * @returns the component for the form used to submit the user's guess
 */
const GuessForm = ({
  message,
  handleSubmit,
  text,
  setText,
  error,
  correct,
  hint,
}) => {
  const outerTheme = useTheme();

  return (
    <div className="textfield">
      <form
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(text);
          setText("");
        }}
      >
        <ThemeProvider theme={customTheme(outerTheme)}>
          <TextField
            value={text}
            error={error}
            disabled={correct}
            id="user-guess"
            label={message}
            variant="outlined"
            helperText={correct || hint}
            FormHelperTextProps={{
              sx: {
                color: "azure",
              },
            }}
            sx={{ input: { color: "#E0E3E7" } }}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </ThemeProvider>
      </form>
    </div>
  );
};

export default GuessForm;
