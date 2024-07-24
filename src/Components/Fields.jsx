import React from "react";
import arrow from "../assets/arrow-right.svg";
import bg from "../assets/fields-bg.jpeg";

export default function Fields() {
  return (
    <div>
      <div
        className="d-flex p-5 justify-content-between align-items-center position-relative"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "300px",
        }}
      >
        <div
          className="overlay position-absolute start-0 end-0 top-0 bottom-0 bg-dark"
          style={{
            opacity: "0.8",
          }}
        ></div>
        <div
          className="text-white flex-grow- mx-4"
          style={{
            zIndex: "1",
          }}
        >
          <h2
            style={{
              fontSize: "54px",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              fontWeight: "700",
            }}
          >
            Find the special places <br /> and{" "}
            <span
              style={{
                color: "#F77A40",
              }}
            >
              book
            </span>{" "}
            now!
          </h2>
          <p
            style={{
              marginTop: "20px",
              fontSize: "24px",
              fontWeight: "500",
              textTransform: "capitalize",
            }}
          >
            special offers{" "}
            <span
              className="btn"
              style={{
                backgroundColor: "#F77A40",
                color: "#fff",
                padding: "2px 5px",
              }}
            >
              10% OFF
            </span>
          </p>
        </div>
        <div
          className="mx-5"
          style={{
            zIndex: "1",
          }}
        >
          <img
            src={arrow}
            alt="arrow-right"
            className="mb-4"
            style={{
              cursor: "pointer",
            }}
          />
          <p className="text-white text-uppercase">BOOK NOW</p>
        </div>
      </div>
    </div>
  );
}
