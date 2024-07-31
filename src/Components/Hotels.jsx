import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE } from "../API/Api";
import locationIcon from "../assets/location-icon.svg";
import elipse1 from "../assets/hotel-elipse1.svg";
import elipse2 from "../assets/hotel-elipse2.svg";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE}/hotels`)
      .then((res) => {
        setHotels(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  return (
    <div
      className="hotels py-5 position-relative"
      style={{
        backgroundColor: "#42A7C31A",
      }}
      id="hotels"
    >
      <img
        src={elipse1}
        className="elipse1 position-absolute d-lg-block d-none"
        alt="elipse1"
        style={{
          right: "25%",
          top: "10px",
        }}
      />
      <img
        src={elipse2}
        className="elipse2 position-absolute"
        alt="elipse2"
        style={{
          right: "34%",
          top: "96px",
        }}
      />
      <img
        src={elipse2}
        className="elipse2 position-absolute"
        alt="elipse2"
        style={{
          right: "30px",
          top: "35%",
        }}
      />
      <img
        src={elipse2}
        className="elipse2 position-absolute d-none d-sm-block"
        alt="elipse2"
        style={{
          left: "30px",
          bottom: "80px",
        }}
      />
      <div className="container">
        <h3
          className="fw-bold text-uppercase"
          style={{
            letterSpacing: "0.1em",
            color: "#42A7C3",
          }}
        >
          hotels
        </h3>
        <div className="d-flex justify-content-between align-items-center">
          <h2
            className="text-uppercase "
            style={{
              fontWeight: "600",
              letterSpacing: "1.5px",
            }}
          >
            slogan here 5 words
          </h2>
          <Link
            className="text-uppercase fs-5 "
            style={{
              color: "#42A7C3",
            }}
            to={"/hotels"}
          >
            all hotels
          </Link>
        </div>
        <div className="content d-flex flex-wrap flex-md-nowrap gap-4 my-3 justify-content-center">
          {hotels.slice(0, 3).map((hotel, i) => (
            <Link
              to={`/hotels/${hotel.id}`}
              key={i}
              className="box col-md-4 bg-white p-2 rounded text-decoration-none text-dark"
            >
              <div className="image p-2">
                <img
                  src={hotel.images[0].url}
                  className="w-100 rounded"
                  alt="hotel"
                />
              </div>
              <div className="text px-2">
                <div className="d-flex align-items-center">
                  <h3 className="fw-bold">{hotel.name}</h3>
                  <p
                    className="ms-auto fs-2 fw-bold"
                    style={{
                      color: "#F77A40",
                    }}
                  >
                    {Math.round(hotel.ticket_price_from)} DH
                  </p>
                </div>
                <p
                  style={{
                    color: "#6B7A85",
                  }}
                >
                  <img src={locationIcon} className="px-1" alt="location" />
                  {hotel.location}
                </p>
                <div className="rating d-flex fw-bold fs-6 gap-1 align-items-center">
                  {renderStars(hotel.rating)}
                  {hotel.rating} ({hotel.number_of_ratings})
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
