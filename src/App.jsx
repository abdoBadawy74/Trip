import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Hotles from "./Pages/Hotels/HotelPage";
import Travels from "./Components/Travels/Travels";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/hotels" element={<Hotles />} />
        <Route path="/travels" element={<Travels/>} />
      </Routes>
    </div>
  );
}

export default App;
