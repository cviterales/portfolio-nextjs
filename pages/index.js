import Head from "next/head";
import About from "../components/Organisms/About/About";
import Footer from "../components/Organisms/Footer/Footer";
import Header from "../components/Organisms/Header/Header";
import Home from "../components/Organisms/Home/Home";
import Projects from "../components/Organisms/Projects/Projects";



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
