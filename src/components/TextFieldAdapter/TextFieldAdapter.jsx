import { TextField } from "@mui/material";
import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import styles from "./TextFieldAdapter.module.scss";
import { ThemeContext } from "../../contexts/ThemeContext";

const colors = {
  light: "#000000b5",
  dark: "white",
  blue: "#1976d2",
};

const CssTextField = styled(TextField)(({ theme }) => {
  return {
    "& label": {
      color: theme === "dark" ? colors.dark : colors.light,
    },

    "& label.Mui-focused": {
      color: colors.blue,
    },

    "& .MuiOutlinedInput-root:not([aria-invalid=true])": {
      color: theme === "dark" ? colors.dark : colors.light,

      "& fieldset": {
        borderColor: theme === "dark" ? colors.dark : colors.light,
      },

      "&.Mui-focused fieldset": {
        borderColor: "#1976d2",
      },

      "& fieldset:hover": {
        borderColor: "pink",
      },
    },

    "& .MuiFormHelperText-root": {
      color: theme === "dark" ? colors.dark : colors.light,
    },

    "& .Mui-error": {
      color: "#d32f2f",
    },
  };
});

const TextFieldAdapter = ({ input, meta, helperText, ...rest }) => {
  const hasError = meta.touched && meta.error ? true : false;

  const { theme } = useContext(ThemeContext);

  return (
    <CssTextField
      className={styles.TextFieldAdapter}
      {...input}
      {...rest}
      theme={theme}
      autoComplete="off"
      error={hasError}
      helperText={hasError ? meta.error : helperText}
    />
  );
};

export default TextFieldAdapter;
