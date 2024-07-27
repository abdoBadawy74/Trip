import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Travels from "./Pages/Travels/Travels";
import Hotels from "./Pages/Hotels/HotelsPage";
import HotelDetails from "./Pages/HotelDetials/HotelDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/travels" element={<Travels />} />

        <Route
          path="hotels/:hotelId"
          element={
            <>
              <HotelDetails />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
