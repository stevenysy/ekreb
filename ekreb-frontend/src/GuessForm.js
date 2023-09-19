import TextField from "@mui/material/TextField";
import { useState } from "react";
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
            "& label": {
              color: "var(--TextField-brandBorderColor)",
            },
            "& label.Mui-hover": {
              color: "var(--TextField-brandBorderHoverColor)",
            },
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
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
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
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
const GuessForm = ({ helperText, handleSubmit }) => {
  const outerTheme = useTheme();
  const [text, setText] = useState("");

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
            id="user-guess"
            label="Unscramble!"
            variant="outlined"
            helperText={helperText}
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
