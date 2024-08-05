import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Travels from "./Pages/Travels/Travels";
import Hotels from "./Pages/Hotels/HotelsPage";
import HotelDetails from "./Pages/HotelDetials/HotelDetails";
import HotelsProvider from "./context/HotelsProvider";
import TripDetials from "./Pages/TripDetials/TripDetials";
import TripsProvider from "./context/TripsProvider";
import Payment from "./Pages/Payment/Payment";
import About from "./Pages/About/About";
import Privacy from "./Pages/Privacy/Privacy";
import Contact from "./Pages/Contact/Contact";
import { SelectedRangeProvider } from "./context/SelectedRange";
import LanguageProvider from "./context/LanguageProvider";

function App() {
  return (
    <div className="App">
      <SelectedRangeProvider>
        <TripsProvider>
          <HotelsProvider>
            <LanguageProvider>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<LandingPage />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Contact />} />
                <Route path="/hotels" element={<Hotels />}>
                  <Route path=":hotelId" element={<HotelDetails />}>
                    <Route path="payment" element={<Payment />} />
                  </Route>
                </Route>
                <Route path="/travels" element={<Travels />}>
                  <Route path=":travelId" element={<TripDetials />}>
                    <Route path="payment" element={<Payment />} />
                  </Route>
                </Route>
              </Routes>
            </LanguageProvider>
          </HotelsProvider>
        </TripsProvider>
      </SelectedRangeProvider>
    </div>
  );
}

export default App;
