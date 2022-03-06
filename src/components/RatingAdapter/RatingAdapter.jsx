import { FormHelperText, InputLabel, Rating } from "@mui/material";
import React, { useContext, useState } from "react";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import styles from "./RatingAdapter.module.scss";
import { ThemeContext } from "../../contexts/ThemeContext";
import { styled } from "@mui/material/styles";

const colors = {
  light: "#000000b5",
  dark: "white",
  blue: "#1976d2",
  red: "#d32f2f",
};

const CssInputLabel = styled(InputLabel)(({ theme, hasError }) => ({
  "&": {
    color: hasError
      ? colors.red
      : theme === "dark"
      ? colors.dark
      : colors.light,
  },
}));

const CssRating = styled(Rating)(({ theme, haserror }) => ({
  "&": {},

  ".MuiRating-icon": {
    marginRight: "1px",
  },

  ".MuiRating-iconEmpty": {
    color: theme === "dark" ? colors.dark : colors.light,
  },
}));

const CssFormHelperText = styled(FormHelperText)(({ theme, hasError }) => ({
  "&": {
    color: hasError
      ? colors.red
      : theme === "dark"
      ? colors.dark
      : colors.light,
    margin: "3px 14px",
  },
}));

const RatingAdapter = ({
  input,
  ratingValue,
  setRatingValue,
  form,
  meta,
  label,
  helperText,
}) => {
  const hasError = meta.touched && meta.error ? true : false;

  const { theme } = useContext(ThemeContext);

  const onChange = (e, value) => {
    form.change("spiciness_scale", value);
    setRatingValue(value);
  };

  return (
    <div className={styles.RatingAdapter}>
      <CssInputLabel theme={theme} error={hasError}>
        {label}
      </CssInputLabel>
      <CssRating
        max={10}
        theme={theme}
        onChange={onChange}
        value={ratingValue}
        icon={<LocalFireDepartmentIcon />}
        emptyIcon={<LocalFireDepartmentOutlinedIcon />}
        className={styles.RatingAdapter__icon}
      />
      <CssFormHelperText theme={theme} error={hasError}>
        {hasError ? meta.error : helperText}
      </CssFormHelperText>
    </div>
  );
};

export default RatingAdapter;
