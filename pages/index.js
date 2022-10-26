import Head from "next/head";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import Projects from "../components/Projects/Projects";
import About from "../components/About/About";
import Footer from "../components/Footer/Footer";


export default function App() {
  return (
    <div className="wrapper">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Portfolio - Cristian Viterales </title>
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
