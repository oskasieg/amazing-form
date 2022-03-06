import styles from "./Header.module.scss";
import sun from "../../assets/sun.png";
import moon from "../../assets/moon.png";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={styles.Header}>
      <div
        className={styles.Header__name}
        onClick={() => window.location.reload()}
      >
        <p className={styles.Header__text}>
          Amazing <span>form</span>
        </p>
      </div>
      <button className={styles.Header__themeButton} onClick={toggleTheme}>
        <img src={theme === "light" ? moon : sun} alt="changeTheme" />
      </button>
    </header>
  );
};

export default Header;
