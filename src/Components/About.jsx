import React from "react";
import offer1 from "../assets/offer1.svg";
import offer2 from "../assets/offer2.svg";
import offer3 from "../assets/offer3.svg";
import elipse from "../assets/aboutElipse.svg";
import { Element } from "react-scroll";
// translation
import t from "../Translation/translation"
import  useLanguage  from "../context/useLanguage";

export default function About() {
    // translation
    const { language, setLanguage } = useLanguage();
  return (
    <>
      <Element name="about" id="about">
        <div className="position-relative p-4" id="about">
          <img src={elipse} alt="elipse" className="d-none" />
          <h4
            className="text-center fw-bold my-2"
            style={{
              color: "#42A7C3",
              letterSpacing: "3px",
            }}
          >
            {t[language].OFFERS}
            
          </h4>
          <h2
            className="text-center my-2"
            style={{
              fontWeight: "600",
              fontSize: "45px",
            }}
          >
            {t[language].Best}
          </h2>
          <p
            className="text-center"
            style={{
              color: "#8A8A8A",
              fontSize: "20px",
            }}
          >
            {t[language].offer_head}
            <br />
            <span className="fw-bold">
            {t[language].offer_head2}
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
                {t[language].all}
              </h3>
              <p
                style={{
                  color: "#8A8A8A",
                }}
              >
                {t[language].all_p}
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
                {t[language].flex}
              </h3>
              <p
                style={{
                  color: "#8A8A8A",
                }}
              >
                {t[language].flex_p}
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
                {t[language].payment}
              </h3>
              <p
                style={{
                  color: "#8A8A8A",
                }}
              >
                {t[language].payment_p}
              </p>
            </div>
          </div>
        </div>
      </Element>
    </>
  );
}
