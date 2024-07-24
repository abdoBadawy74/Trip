import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./LandingPage";
import Header from "./Components/Header";
import Walaa from "./Components/Walaa";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/hotels" element={<Walaa />} />
      </Routes>
    </div>
  );
}

export default App;
