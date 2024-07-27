import { useContext, useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import HotelsContext from "../../context/HotelsContext";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import locationIcon from "../../assets/location-icon.svg";
import "./HotelsPage.css";

function Hotels() {
  const { hotels } = useContext(HotelsContext);
  console.log("Hotels from Context:", hotels);

  const [state, setState] = useState("Abu Dhabi");
  const [searchState, setSearchState] = useState("");
  const [filteredHotels, setFilteredHotels] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const initialFiltered = hotels.filter(
      (hotel) => hotel.state.name === state
    );
    setFilteredHotels(initialFiltered);
  }, [state, hotels]);

  const handleSearch = () => {
    if (searchState === "") {
      const filtered = hotels.filter((hotel) => hotel.state.name === state);
      setFilteredHotels(filtered);
    } else {
      const filtered = hotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(searchState.toLowerCase())
      );
      setFilteredHotels(filtered);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa-solid fa-star mx-1 ${
            i <= rating ? "text-warning" : "text-secondary"
          }`}
        ></i>
      );
    }
    return stars;
  };

  console.log(window.location.hash.slice(1));
  return (
    <div className="Hotels">
      {location.pathname === "/hotels" && (
        <div className="">
          <div className="bg-orange">
            <Header />
          </div>
          <div className="container row m-auto">
            <div className="d-flex justify-content-between align-items-start mb-4 mt-4 pt-4">
              <div>
                <h2
                  className="text-uppercase fw-bold"
                  style={{
                    letterSpacing: "2px",
                    fontSize: "24px",
                    color: " #42A7C3",
                  }}
                >
                  All Hotels
                </h2>
              </div>
              <div>
                <button
                  className={`btn ${
                    state === "Abu Dhabi" ? "bg-dark text-white" : "btn-light"
                  } mx-2`}
                  onClick={() => setState("Abu Dhabi")}
                >
                  Abu Dhabi
                </button>
                <button
                  className={`btn ${
                    state === "Dubai" ? "bg-dark text-white" : "btn-light"
                  } mx-2`}
                  onClick={() => setState("Dubai")}
                >
                  Dubai
                </button>
              </div>
            </div>

            <div className="search container mt-5 d-flex ">
              <input
                type="text"
                className="form-control m-2"
                placeholder="Search by state"
                style={{
                  backgroundColor: " #F8F9F9",
                }}
                value={searchState}
                onChange={(e) => setSearchState(e.target.value)}
              />
              <button
                className="btn m-2"
                style={{ backgroundColor: "#42A7C3", color: "#ffff" }}
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            {filteredHotels.map((hotel, index) => (
              <motion.div
                layout
                animate={{ transform: "scale(1)" }}
                initial={{ transform: "scale(0)" }}
                transition={{ type: "spring", damping: 8 }}
                className="col-md-4 pt-4"
                key={index}
              >
                <div className="box bg-white rounded shadow p-3">
                  <div className="image p-2">
                    {hotel.images.length > 0 && (
                      <img
                        src={hotel.images[0].url}
                        alt={hotel.name}
                        className="w-100 rounded"
                      />
                    )}
                  </div>
                  <div className="text px-2">
                    <div className="d-flex align-items-center">
                      <h3 className="fw-bold ">
                        <Link className="fw-bold " to={`/hotels/${hotel.id}`}>
                          {hotel.name}
                        </Link>
                      </h3>
                      <p
                        className="ms-auto fs-2 fw-bold"
                        style={{ color: "#F77A40" }}
                      >
                        {Math.round(hotel.ticket_price_from)} DH
                      </p>
                    </div>
                    <p style={{ color: "#6B7A85" }}>
                      <img src={locationIcon} className="px-1" alt="location" />
                      {hotel.location}
                    </p>
                    <div className="rating d-flex fw-bold fs-6 gap-1 align-items-center">
                      {renderStars(hotel.rating)}
                      {hotel.rating} ({hotel.number_of_ratings})
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      <Outlet />

      <Footer />
    </div>
  );
}

export default Hotels;
