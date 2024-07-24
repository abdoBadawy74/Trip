import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./LandingPage";
import Hotles from "./Components/HotelPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/hotels" element={<Hotles />} />
      </Routes>
    </div>
  );
}

export default App;
