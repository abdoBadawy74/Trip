import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import axios from "axios";
import { BASE } from "../../API/Api";
import clock from "../../assets/clock-icon.svg";
import Book from "../../assets/Book.svg";
import Bookarrow from "../../assets/Bookarrow.svg";
import Footer from "../../Components/Footer/Footer";

export default function Travels() {
  const [state, setState] = useState("Abu Dhabi");
  const [category, setCategory] = useState("tour");
  const [services, setServices] = useState([]);
  const [searchState, setSearchState] = useState("");
  const [filteredservices, setFilteredservices] = useState([]);

  const getData = () => {
    axios
      .get(`${BASE}/trips`)
      .then((res) => {
        setServices(res.data.data);

        const initialFiltered = res.data.data.filter(
          (service) =>
            service.state.name === state &&
            service.trip_category.name === category
        );
        setFilteredservices(initialFiltered);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
    handleSearch();
  }, [category, state]);

  useEffect(() => {
    const filtered = services.filter(
      (service) =>
        service.state.name === state && service.trip_category.name === category
    );
    setFilteredservices(filtered);
  }, [state, category, services]);

  const handleSearch = () => {
    if (searchState === "") {
      const filtered = services.filter(
        (service) =>
          service.state.name === state &&
          service.trip_category.name === category
      );
      setFilteredservices(filtered);
    } else {
      const filtered = filteredservices.filter((service) =>
        service.place.name.toLowerCase().includes(searchState.toLowerCase())
      );
      setFilteredservices(filtered);
      setSearchState("");
    }
  };

  const selectStyle = {
    width: "100px",
    outline: "0",
  };
  return (
    <div>
      <div className="bg-orange">
        <Header />
      </div>
      <div className="container ">
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
              All Services
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
          <select
            className="border-0 text-uppercase outline-0"
            style={selectStyle}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="tour">tour</option>
            <option value="transfer">transfer</option>
            <option value="ticket">ticket</option>
          </select>
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
        <div className="content my-3">
          {filteredservices.length > 0 ? (
            filteredservices.map((service, i) => (
              <div
                className={`d-flex gap-3 flex-wrap justify-content-center justify-content-lg-between my-3 ${
                  i % 2 !== 0 ? "flex-row-reverse" : "flex-row"
                }`}
                key={i}
              >
                <img
                  src={service.images[0].url}
                  alt="image"
                  style={{
                    width: "400px",
                    height: "300px",
                    objectFit: "cover",
                  }}
                  className="p-0 rounded col-12 col-lg-6"
                />
                <div
                  className={`text text-center text-lg-start col-12 col-lg-6 py-3 ${
                    i % 2 !== 0 ? "flex-grow-1" : "flex-grow-1"
                  }`}
                >
                  <h3 className="fw-bold fs-2">{service.place.name}</h3>
                  <p
                    style={{
                      color: "#1F1F1F",
                      opacity: "0.6",
                    }}
                  >
                    {service.description}
                  </p>
                  <p
                    style={{
                      color: "#F77A40",
                      fontSize: "20px",
                      fontWeight: "700",
                    }}
                  >
                    {service.ticket_price_from} DH - {service.ticket_price_to}{" "}
                    DH
                  </p>
                  <div className="d-flex gap-2 fw-bold justify-content-center justify-content-lg-start  my-3">
                    <img src={clock} alt="clock" />
                    <p className="m-0">{service.duration}</p>
                  </div>
                  <div className="d-flex gap-3 py-4 justify-content-center justify-content-lg-start">
                    <button
                      className="btn text-white py-2 px-3 d-flex gap-2 align-items-center"
                      style={{
                        backgroundColor: "#FF6B00",
                        cursor: "pointer",
                      }}
                    >
                      <img src={Book} alt="Book Now" /> Book Now
                    </button>
                    <img
                      src={Bookarrow}
                      alt="book-arrow"
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center p-5 fw-bold">No services found !</h1>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
