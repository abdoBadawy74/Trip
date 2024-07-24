import React from "react";
import "./Insights.css";
import img1 from "../assets/insight1.jpeg";
import img2 from "../assets/insight2.jpeg";
import img3 from "../assets/insight3.jpeg";
import img4 from "../assets/insight4.jpeg";
import img5 from "../assets/insight5.jpeg";
import img6 from "../assets/insight6.jpeg";
import img7 from "../assets/insight7.jpeg";

export default function Insights() {
  return (
    <div className="insights my-3 overflow-hidden">
      <h2
        className="text-center fw-bold position-relative "
        style={{
          letterSpacing: "2px",
          marginTop: "5rem",
          textTransform: "uppercase",
        }}
      >
        Insights
      </h2>

      <div
        className="m-auto mt-5 insghts-content my-3 row justify-content-center overflow-hidden"
        style={{
          width: "100%",
        }}
      >
        <div
          className="col-11 col-md-6 col-lg-3  d-flex flex-column gap-2 py-2"
          style={{
            height: "800px",
          }}
        >
          <div
            className="bg-dark position-relative rounded overflow-hidden"
            style={{
              height: "60%",
            }}
          >
            <img
              src={img1}
              alt="insight-img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              className="position-absolute text-white fw-bold px-3 py-3 fs-4 start-0 end-0 bottom-0 "
              style={{
                lineHeight: "60px",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,1))",
              }}
            >
              Place Name
            </div>
          </div>

          <div
            className="position-relative rounded overflow-hidden"
            style={{
              height: "40%",
            }}
          >
            <img
              src={img2}
              alt="insight-img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              className="position-absolute text-white fw-bold px-3 py-3 fs-4 start-0 end-0 bottom-0 "
              style={{
                lineHeight: "60px",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,1))",
              }}
            >
              Place Name
            </div>
          </div>
        </div>

        <div
          className="col-11 col-md-6 col-lg-3  d-flex flex-column gap-2 py-2"
          style={{
            height: "800px",
          }}
        >
          <div
            className="bg-dark position-relative rounded overflow-hidden"
            style={{
              height: "22%",
            }}
          >
            <img
              src={img3}
              alt="insight-img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              className="position-absolute text-white fw-bold px-3 py-3 fs-4 start-0 end-0 bottom-0 "
              style={{
                lineHeight: "60px",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,1))",
              }}
            >
              Place Name
            </div>
          </div>

          <div
            className="position-relative rounded overflow-hidden"
            style={{
              height: "33%",
            }}
          >
            <img
              src={img4}
              alt="insight-img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              className="position-absolute text-white fw-bold px-3 py-3 fs-4 start-0 end-0 bottom-0 "
              style={{
                lineHeight: "60px",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,1))",
              }}
            >
              Place Name
            </div>
          </div>

          <div
            className="position-relative rounded overflow-hidden"
            style={{
              height: "45%",
            }}
          >
            <img
              src={img5}
              alt="insight-img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              className="position-absolute text-white fw-bold px-3 py-3 fs-4 start-0 end-0 bottom-0 "
              style={{
                lineHeight: "60px",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,1))",
              }}
            >
              Place Name
            </div>
          </div>
        </div>

        <div
          className="col-11 col-md-6 col-lg-3  d-flex flex-column gap-2 py-2"
          style={{
            height: "800px",
          }}
        >
          <div
            className="bg-dark position-relative rounded overflow-hidden"
            style={{
              height: "30%",
            }}
          >
            <img
              src={img6}
              alt="insight-img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              className="position-absolute text-white fw-bold px-3 py-3 fs-4 start-0 end-0 bottom-0 "
              style={{
                lineHeight: "60px",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,1))",
              }}
            >
              Place Name
            </div>
          </div>

          <div
            className="position-relative rounded overflow-hidden"
            style={{
              height: "70%",
            }}
          >
            <img
              src={img7}
              alt="insight-img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              className="position-absolute text-white fw-bold px-3 py-3 fs-4 start-0 end-0 bottom-0 "
              style={{
                lineHeight: "60px",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,1))",
              }}
            >
              Place Name
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
