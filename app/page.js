import About from "../components/Organisms/About/About";
import Footer from "../components/Organisms/Footer/Footer";
import Header from "../components/Organisms/Header/Header";
import Home from "../components/Organisms/Home/Home";
import Projects from "../components/Organisms/Projects/Projects";

export default function Page() {
  return (
    <div className="wrapper">
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
