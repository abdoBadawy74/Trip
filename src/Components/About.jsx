import React from "react";
import offer1 from "../assets/offer1.svg";
import offer2 from "../assets/offer2.svg";
import offer3 from "../assets/offer3.svg";
import elipse from "../assets/aboutElipse.svg";

export default function About() {
  return (
    <>
      <div className="position-relative p-4" id="about">
        <img src={elipse} alt="elipse" className="d-none" />
        <h4
          className="text-center fw-bold my-2"
          style={{
            color: "#42A7C3",
            letterSpacing: "3px",
          }}
        >
          OFFERS
        </h4>
        <h2
          className="text-center my-2"
          style={{
            fontWeight: "600",
            fontSize: "45px",
          }}
        >
          We Offer Best Services
        </h2>
        <p
          className="text-center"
          style={{
            color: "#8A8A8A",
            fontSize: "20px",
          }}
        >
          Hay! Travelo there to help you find your dream holiday.
          <br />
          <span className="fw-bold">
            Easy you just find where you want to go and buy the ticket.
          </span>
        </p>

        <div className="offers my-4 d-flex justify-content-center align-items-center flex-wrap gap-5">
          <div
            className="box text-center my-3 p-4"
            style={{
              width: "300px",
            }}
          >
            <img src={offer1} alt="" />
            <h3
              className="my-4 fw-bold "
              style={{
                color: "#1F1F1F",
              }}
            >
              All You Needs
            </h3>
            <p
              style={{
                color: "#8A8A8A",
              }}
            >
              From flights, stays, to sights, just count on our complete
              products.
            </p>
          </div>

          <div
            className="box text-center my-3 p-4"
            style={{
              width: "300px",
            }}
          >
            <img src={offer2} alt="" />
            <h3
              className="my-4 fw-bold "
              style={{
                color: "#1F1F1F",
              }}
            >
              Flexible Booking
            </h3>
            <p
              style={{
                color: "#8A8A8A",
              }}
            >
              From flights, stays, to sights, just count on our complete
              products.
            </p>
          </div>

          <div
            className="box text-center my-3 p-4"
            style={{
              width: "300px",
            }}
          >
            <img src={offer3} alt="" />
            <h3
              className="my-4 fw-bold "
              style={{
                color: "#1F1F1F",
              }}
            >
              Secure Payment
            </h3>
            <p
              style={{
                color: "#8A8A8A",
              }}
            >
              From flights, stays, to sights, just count on our complete
              products.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
