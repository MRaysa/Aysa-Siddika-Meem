import Navbar from "../components/layout/Navbar";
import About from "../components/sections/About/About";
import Contact from "../components/sections/Contact/Contact";
import Education from "../components/sections/Education/Education";
import Experience from "../components/sections/Experience/Experience";
import Footer from "../components/sections/Footer/Footer";
import Home from "../components/sections/Home/Home";
import Projects from "../components/sections/Projects/Projects";
import Skills from "../components/sections/Skills/Skills";
import CustomCursor from "../components/ui/CustomCursor";

const Portfolio = () => {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <Home />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </>
  );
};

export default Portfolio;
