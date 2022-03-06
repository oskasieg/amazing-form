import { ThemeContext } from "@emotion/react";
import React, { useContext } from "react";
import styles from "./StartButton.module.scss";

const StartButton = ({ onClick }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <button
      className={`${styles.StartButton} ${
        theme === "dark" ? styles.dark : styles.light
      } `}
      onClick={onClick}
    >
      START
    </button>
  );
};

export default StartButton;
