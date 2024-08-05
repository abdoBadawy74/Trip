import React, { useState } from "react";
import arrow from "../../assets/arrow-right.svg";
import bg from "../../assets/fields-bg.jpeg";
import "./Fields.css";
// translation
import t from "../../Translation/translation";
import useLanguage from "../../context/useLanguage";

export default function Fields() {
  // translation
  const { language, setLanguage } = useLanguage();

  return (
    <div>
      <div
        className="d-flex p-5 flex-wrap justify-content-center justify-content-md-between align-items-center position-relative fields"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="overlay position-absolute start-0 end-0 top-0 bottom-0 bg-dark"
          style={{
            opacity: "0.8",
            zIndex: "1",
          }}
        ></div>
        <div
          className="text-white flex-grow- mx-4"
          style={{
            zIndex: "1222",
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
            {t[language].find} <br /> {t[language].and}{" "}
            <span
              style={{
                color: "#F77A40",
              }}
            >
              {t[language].book}
            </span>{" "}
            {t[language].now}
          </h2>
          <p
            style={{
              marginTop: "20px",
              fontSize: "24px",
              fontWeight: "500",
              textTransform: "capitalize",
            }}
          >
            {t[language].specilOffers}{" "}
            <span
              className="btn"
              style={{
                backgroundColor: "#F77A40",
                color: "#fff",
                padding: "2px 5px",
              }}
            >
              10% {t[language].off}
            </span>
          </p>
        </div>
        <div
          className="mx-5 d-flex flex-column align-items-center justify-content-center"
          style={{
            zIndex: "1",
          }}
        >
          <img
            src={arrow}
            alt="arrow-right"
            className="mb-2"
            style={{
              cursor: "pointer",
            }}
          />
          <p className="text-white text-uppercase">{t[language].BookNow} </p>
        </div>
      </div>
    </div>
  );
}
