import Head from "next/head";
import styles from "../styles/App.module.scss";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import Projects from "../components/Projects/Projects";
import About from "../components/About/About";
import Footer from "../components/Footer/Footer";

export default function App() {
  return (
    <div className={styles.wrapper}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="Portfolio" />
        <meta name="keywords" content="Cristian Viterales" />
        <link rel="icon" href="/favicon.ico" />
        <title>Portfolio -Cristian Viterales </title>
      </Head>
      <header>
        <Header />
      </header>
      <main>
        <Home />
        <Projects />
        <About />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
