import "./App.css";
import Navbar from "./components/layout/Navbar";
import About from "./components/sections/About/About";
import Contact from "./components/sections/Contact/Contact";
import Footer from "./components/sections/Footer/Footer";
import Home from "./components/sections/Home/Home";
import Projects from "./components/sections/Projects/Projects";
import Skills from "./components/sections/Skills/Skills";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Home></Home>
      <About></About>
      <Projects></Projects>
      <Skills></Skills>
      <Contact></Contact>
      <Footer></Footer>
    </>
  );
}

export default App;
