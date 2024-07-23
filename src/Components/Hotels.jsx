import React from "react";
import "./Hotels.css";
import { Link } from "react-router-dom";
import hotel_img from "../assets/hotel-img.jpeg";
import locationIcon from "../assets/location-icon.svg";
import elipse1 from "../assets/hotel-elipse1.svg";
import elipse2 from "../assets/hotel-elipse2.svg";

export default function Hotels() {
  return (
    <div
      className="hotels py-5 position-relative"
      style={{
        backgroundColor: "#42A7C31A",
      }}
    >
      <img
        src={elipse1}
        className="elipse1 position-absolute d-md-block d-none"
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
            to=""
            className="text-uppercase fs-5"
            style={{
              color: "#42A7C3",
            }}
          >
            all hotels
          </Link>
        </div>
        <div className="content d-flex flex-wrap flex-md-nowrap gap-4 my-3 justify-content-center">
          <div className="box col-md-4 bg-white p-2 rounded">
            <div className="image p-2">
              <img src={hotel_img} className="w-100 rounded" alt="hotel" />
            </div>
            <div className="text px-2">
              <div className="d-flex align-items-center">
                <h3 className="fw-bold">Sherton</h3>
                <p
                  className="ms-auto fs-2 fw-bold"
                  style={{
                    color: "#F77A40",
                  }}
                >
                  45 DH
                </p>
              </div>
              <p
                style={{
                  color: "#6B7A85",
                }}
              >
                <img src={locationIcon} className="px-1" alt="location" />
                Location, location location
              </p>
              <div className="rating">
                <div>
                  <i className="fa-solid fa-star text-warning mx-1"></i>
                  <i className="fa-solid fa-star text-warning mx-1"></i>
                  <i className="fa-solid fa-star text-warning mx-1"></i>
                  <i className="fa-solid fa-star text-warning mx-1"></i>
                  <i className="fa-solid fa-star mx-1 text-secondary"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="box col-md-4 bg-white p-2 rounded">
            <div className="image p-2">
              <img src={hotel_img} className="w-100 rounded" alt="hotel" />
            </div>
            <div className="text px-2">
              <div className="d-flex align-items-center">
                <h3 className="fw-bold">Sherton</h3>
                <p
                  className="ms-auto fs-2 fw-bold"
                  style={{
                    color: "#F77A40",
                  }}
                >
                  45 DH
                </p>
              </div>
              <p
                style={{
                  color: "#6B7A85",
                }}
              >
                <img src={locationIcon} className="px-1" alt="location" />
                Location, location location
              </p>
              <div className="rating">
                <div>
                  <i className="fa-solid fa-star text-warning mx-1"></i>
                  <i className="fa-solid fa-star text-warning mx-1"></i>
                  <i className="fa-solid fa-star text-warning mx-1"></i>
                  <i className="fa-solid fa-star text-warning mx-1"></i>
                  <i className="fa-solid fa-star mx-1 text-secondary"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="box col-md-4 bg-white p-2 rounded">
            <div className="image p-2">
              <img src={hotel_img} className="w-100 rounded" alt="hotel" />
            </div>
            <div className="text px-2">
              <div className="d-flex align-items-center">
                <h3 className="fw-bold">Sherton</h3>
                <p
                  className="ms-auto fs-2 fw-bold"
                  style={{
                    color: "#F77A40",
                  }}
                >
                  45 DH
                </p>
              </div>
              <p
                style={{
                  color: "#6B7A85",
                }}
              >
                <img src={locationIcon} className="px-1" alt="location" />
                Location, location location
              </p>
              <div className="rating">
                <div>
                  <i className="fa-solid fa-star text-warning mx-1"></i>
                  <i className="fa-solid fa-star text-warning mx-1"></i>
                  <i className="fa-solid fa-star text-warning mx-1"></i>
                  <i className="fa-solid fa-star text-warning mx-1"></i>
                  <i className="fa-solid fa-star mx-1 text-secondary"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
