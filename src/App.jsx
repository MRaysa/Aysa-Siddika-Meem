import "./App.css";
import Navbar from "./components/layout/Navbar";
import About from "./components/sections/About/About";
import Home from "./components/sections/Home/Home";
import Skills from "./components/sections/Skills/Skills";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Home></Home>
      <About></About>
      <Skills></Skills>
    </>
  );
}

export default App;
