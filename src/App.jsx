import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./LandingPage";
import Header from "./Components/Header";
import Walaa from "./Components/Walaa";

function App() {
  return (
    <div className="App">
      <div className="hotels">
        <Header />
        <Walaa />
      </div>

      {/* <LandingPage /> */}
    </div>
  );
}

export default App;
