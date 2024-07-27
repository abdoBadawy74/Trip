import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Travels from "./Pages/Travels/Travels";
import Hotels from "./Pages/Hotels/HotelsPage";
import HotelDetails from "./Pages/HotelDetials/HotelDetails";
import HotelsProvider from "./context/HotelsProvider";

function App() {
  return (
    <div className="App">
      <HotelsProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/hotels" element={<Hotels />}>
            <Route path=":hotelId" element={<HotelDetails />} />
          </Route>
          <Route path="/travels" element={<Travels />} />
        </Routes>
      </HotelsProvider>
    </div>
  );
}

export default App;
