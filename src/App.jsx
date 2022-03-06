import styles from "./App.module.scss";
import Content from "./containers/Content/Content";
import ThemeProvider from "./contexts/ThemeContext";
import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";

function App() {
  return (
    <div className={styles.App}>
      <ThemeProvider>
        <Header />
        <Content />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
