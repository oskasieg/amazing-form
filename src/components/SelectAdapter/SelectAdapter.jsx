import React, { useContext } from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { SelectModes } from "../OrderEatForm/Constants";
import FormHelperText from "@mui/material/FormHelperText";
import styles from "./SelectAdapter.module.scss";
import { ThemeContext } from "../../contexts/ThemeContext";
import { styled } from "@mui/material/styles";

const colors = {
  light: "#000000b5",
  dark: "white",
};

const CssInputLabel = styled(InputLabel)(({ theme }) => ({
  "&": {
    color: theme === "dark" ? colors.dark : colors.light,
  },
}));

const CssSelect = styled(Select)(({ theme }) => ({
  "&": {
    color: theme === "dark" ? colors.dark : colors.light,
    padding: "0 14px",
  },

  "&::before": {
    borderColor: theme === "dark" ? colors.dark : colors.light,
  },

  ".MuiSvgIcon-root": {
    color: theme === "dark" ? colors.dark : colors.light,
  },
}));

const CssFormHelperText = styled(FormHelperText)(({ theme }) => ({
  "&": {
    color: theme === "dark" ? colors.dark : colors.light,
    margin: "3px 14px",
  },
}));

const SelectAdapter = ({
  label,
  helperText,
  setSelectMode,
  options,
  input,
  meta,
  form,
  setRatingValue,
}) => {
  const hasError = meta.touched && meta.error ? true : false;

  const { theme } = useContext(ThemeContext);

  const onChange = (e) => {
    input.onChange(e);

    switch (e.target.value) {
      case SelectModes.Pizza: {
        setRatingValue(null);
        form.change("spiciness_scale", null);
        form.change("slices_of_bread", null);

        break;
      }

      case SelectModes.Soup: {
        form.change("no_of_slices", null);
        form.change("diameter", null);
        form.change("slices_of_bread", null);

        break;
      }

      case SelectModes.Sandwich: {
        form.change("no_of_slices", null);
        form.change("diameter", null);
        setRatingValue(null);
        form.change("spiciness_scale", null);

        break;
      }

      default: {
        break;
      }
    }

    setSelectMode(e.target.value);
  };

  return (
    <div className={styles.SelectAdapter}>
      <CssInputLabel id="dish-type-select" theme={theme} error={hasError}>
        {label}
      </CssInputLabel>
      <CssSelect
        labelId="dish-type-select"
        variant="standard"
        {...input}
        theme={theme}
        error={hasError}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.name}{" "}
          </MenuItem>
        ))}
      </CssSelect>
      <CssFormHelperText theme={theme} error={hasError}>
        {hasError ? meta.error : helperText}
      </CssFormHelperText>
    </div>
  );
};

export default SelectAdapter;
