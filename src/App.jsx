import "./App.css";
import Navbar from "./components/layout/Navbar";
import About from "./components/sections/About/About";
import Home from "./components/sections/Home/Home";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Home></Home>
      <About></About>
    </>
  );
}

export default App;
