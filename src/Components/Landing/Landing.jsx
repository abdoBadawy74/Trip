import { useState, useRef, useEffect } from "react";
import "./Landing.css";
import video from "../../assets/landing-video1.mp4";
import video2 from "../../assets/landing-video2.mp4";
import Header from "../Header/Header";
import transfer from "../../assets/transfer.svg";
import ticket from "../../assets/ticket.svg";
import tour from "../../assets/tour.svg";

export default function Landing() {
  const [selectedCity, setSelectedCity] = useState("Dubai");
  const [animationClass, setAnimationClass] = useState("show-from-bottom");
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  useEffect(() => {
    if (selectedCity === "Dubai" && videoRef1.current) {
      videoRef1.current.play().catch((error) => {
        console.error("Error playing video 1: ", error);
      });
    } else if (selectedCity === "Abu Dhabi" && videoRef2.current) {
      videoRef2.current.play().catch((error) => {
        console.error("Error playing video 2: ", error);
      });
    }
  }, [selectedCity]);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setAnimationClass(city === "Dubai" ? "show-from-bottom" : "show-from-top");
  };

  return (
    <>
      <div
        className="landing-section position-relative w-100"
        style={{
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef1}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="position-absolute w-100 h-100"
          style={{
            top: "0",
            left: "0",
            objectFit: "cover",
            zIndex: selectedCity === "Dubai" ? "1" : "0",
            opacity: selectedCity === "Dubai" ? "1" : "0",
            transition: "opacity 1s ease-in-out",
          }}
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          ref={videoRef2}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="position-absolute w-100 h-100"
          style={{
            top: "0",
            left: "0",
            objectFit: "cover",
            zIndex: selectedCity === "Abu Dhabi" ? "1" : "0",
            opacity: selectedCity === "Abu Dhabi" ? "1" : "0",
            transition: "opacity 1s ease-in-out",
          }}
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <Header />

        <div
          className="landing-content position-relative text-white"
          style={{
            zIndex: "2",
            height: "100%",
          }}
        >
          <div
            className="cities position-absolute  top-50 text-center "
            style={{
              transform: "translateY(-50%) rotate(-90deg)",
              padding: "5px",
              width: "300px",
              left: "-130px",
              zIndex: 444,
            }}
          >
            <ul className="p-0 d-flex  ">
              <li
                className={`flex-grow-1 fs-5 ${
                  selectedCity === "Abu Dhabi" ? "AbuDhabi-active" : ""
                }`}
                style={{
                  cursor: "pointer",
                  fontWeight: "600",
                  color: "white",
                  opacity: selectedCity === "Abu Dhabi" ? "1" : "0.5",
                }}
                onClick={() => handleCityChange("Abu Dhabi")}
              >
                Abu Dhabi
              </li>
              <li
                className={`fs-5 ${
                  selectedCity === "Dubai" ? "Dubai-active" : ""
                }`}
                style={{
                  cursor: "pointer",
                  fontWeight: "600",
                  color: "white",
                  opacity: selectedCity === "Dubai" ? "1" : "0.5",
                }}
                onClick={() => handleCityChange("Dubai")}
              >
                Dubai
              </li>
            </ul>
          </div>

          <div
            className="container d-flex justify-content-center align-items-center flex-column"
            style={{
              paddingTop: "100px",
              height: "100%",
            }}
          >
            <div
              className={`dubai-content ${
                selectedCity === "Dubai" ? animationClass : "hide"
              }`}
            >
              <h1
                className="bebas-neue-bold text-center"
                style={{
                  fontSize: "90px",
                  lineHeight: "1",
                }}
              >
                Start your journey now! <br /> and claim all you want
              </h1>
              <div className="icons my-2 d-flex p-3 justify-content-around ">
                <div
                  className="icon p-3 rounded-circle d-flex flex-column justify-content-around align-items-center"
                  style={{
                    height: "120px",
                    width: "120px",
                    backgroundColor: "rgba(255,255,255,0.4)",
                  }}
                >
                  <img src={transfer} alt="icon" />
                  <p>Transfer</p>
                </div>
                <div
                  className="icon p-3 rounded-circle d-flex flex-column justify-content-around align-items-center"
                  style={{
                    height: "120px",
                    width: "120px",
                    backgroundColor: "rgba(255,255,255,0.4)",
                  }}
                >
                  <img src={ticket} alt="icon" />
                  <p>Ticket</p>
                </div>
                <div
                  className="icon p-3 rounded-circle d-flex flex-column justify-content-around align-items-center"
                  style={{
                    height: "120px",
                    width: "120px",
                    backgroundColor: "rgba(255,255,255,0.4)",
                  }}
                >
                  <img src={tour} alt="icon" />
                  <p>Tour</p>
                </div>
              </div>

              <div className="form d-flex align-items-center justify-content-center gap-3 px-4">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-50 rounded p-2 border-0 outline-0"
                  style={{
                    backgroundColor: "#F8F9F9",
                    outline: "none",
                  }}
                />
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#F77A40",
                    color: "#fff",
                    padding: "8px 18px",
                    borderRadius: "5px",
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>

            <div
              className={`abuDhabi-content ${
                selectedCity === "Abu Dhabi" ? animationClass : "hide"
              }`}
            >
              <h1
                className="bebas-neue-bold text-center"
                style={{
                  fontSize: "90px",
                  lineHeight: "1",
                }}
              >
                Start your journey now! <br /> and claim all you want
              </h1>
              <div className="icons my-2 d-flex p-3 justify-content-around ">
                <div
                  className="icon p-3 rounded-circle d-flex flex-column justify-content-around align-items-center"
                  style={{
                    height: "120px",
                    width: "120px",
                    backgroundColor: "rgba(255,255,255,0.4)",
                  }}
                >
                  <img src={transfer} alt="icon" />
                  <p>Transfer</p>
                </div>
                <div
                  className="icon p-3 rounded-circle d-flex flex-column justify-content-around align-items-center"
                  style={{
                    height: "120px",
                    width: "120px",
                    backgroundColor: "rgba(255,255,255,0.4)",
                  }}
                >
                  <img src={ticket} alt="icon" />
                  <p>Ticket</p>
                </div>
                <div
                  className="icon p-3 rounded-circle d-flex flex-column justify-content-around align-items-center"
                  style={{
                    height: "120px",
                    width: "120px",
                    backgroundColor: "rgba(255,255,255,0.4)",
                  }}
                >
                  <img src={tour} alt="icon" />
                  <p>Tour</p>
                </div>
              </div>

              <div
                className="form m-auto d-flex align-items-center gap-3 p-4  rounded"
                style={{
                  width: "70%",
                  backgroundColor: "#fff",
                }}
              >
                <input
                  type="text"
                  placeholder="Search"
                  className="w-50 rounded p-2 border-0 outline-0 flex-grow-1"
                  style={{
                    backgroundColor: "#F8F9F9",
                    outline: "none",
                  }}
                />
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#F77A40",
                    color: "#fff",
                    padding: "8px 18px",
                    borderRadius: "5px",
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}