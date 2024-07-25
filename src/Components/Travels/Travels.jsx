import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { BASE } from "../../API/Api";
import "./Travels.css";
import img from "../../assets/insight5.jpeg";
import clock from "../../assets/clock-icon.svg";
import Book from "../../assets/Book.svg";
import Bookarrow from "../../assets/Bookarrow.svg";
import Footer from "../Footer/Footer";

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
            service.state.name === state && service.trip_category === category
        );
        setFilteredservices(initialFiltered);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, [state, category]);

  useEffect(() => {
    const filtered = services.filter((hotel) => hotel.state.name === state);
    setFilteredservices(filtered);
  }, [state, services]);

  const handleSearch = () => {
    if (searchState === "") {
      const filtered = services.filter((hotel) => hotel.state.name === state);
      setFilteredservices(filtered);
    } else {
      const filtered = services.filter((hotel) =>
        hotel.state.name.toLowerCase().includes(searchState.toLowerCase())
      );
      setFilteredservices(filtered);
    }
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
            style={{
              width: "100px",
            }}
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
          {filteredservices.map((service, i) => (
            <div className={`d-flex gap-3 flex-wrap my-3 ${i % 2 !== 0 ? 'flex-row-reverse' : 'flex-row'}`} key={i}>
              <img
                src={img}
                alt="image"
                style={{
                  width: "400px",
                  height: "300px",
                  objectFit: "cover",
                }}
                className="p-0 rounded"
              />
              <div className={`text py-3 ${i%2 !== 0 ? 'flex-grow-1' : ''}`}>
                <h3 className="fw-bold fs-2" style={{}}>
                  Old City Tour
                </h3>
                <p
                  style={{
                    color: "#1F1F1F",
                    opacity: "0.6",
                  }}
                >
                  Explore the streets of Old Dubai on a guided walking tour.
                  Have the option to choose between a shared or private tour.
                </p>
                <p
                  style={{
                    color: "#F77A40",
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                >
                  2100 DH - 1542 DH
                </p>
                <div className="d-flex gap-2 fw-bold align-items-center my-3">
                  <img src={clock} alt="clock" />
                  <p className="m-0">2 Days 3 Nights - 2 Hours</p>
                </div>
                <div className="d-flex gap-3 py-4">
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
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
