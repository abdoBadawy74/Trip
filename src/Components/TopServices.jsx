// import React, { useEffect, useState } from "react";
// import "./TopServices.css";
// import { trips } from "./trips";
// import Book from "../assets/Book.svg";
// import Bookarrow from "../assets/Bookarrow.svg";
// import { Link } from "react-router-dom";
// import img from "../assets/download (1).jpeg";

// export default function TopServices() {
//   const [state, setState] = useState("Dubai");
//   const [category, setCategory] = useState("tours");
//   const [filteredTrips, setFilteredTrips] = useState([]);

//   useEffect(() => {
//     filterTrips();
//   }, [state, category]);

//   const filterTrips = () => {
//     let stateTrips = trips.filter((trip) => trip.state.name === state);
//     let categoryTrips = stateTrips.filter(
//       (trip) => trip.trip_category.name === category
//     );
//     setFilteredTrips(categoryTrips);
//   };

//   return (
//     <>
//       <div className="top-services container my-4">
//         <div className="d-flex justify-content-between align-items-start">
//           <div>
//             <h4
//               className="text-uppercase fw-bolder"
//               style={{
//                 color: "#42A7C3",
//                 letterSpacing: "0.1em",
//               }}
//             >
//               Top Services
//             </h4>
//             <h2
//               className="text-uppercase"
//               style={{
//                 fontWeight: "600",
//                 letterSpacing: "2px",
//                 fontSize: "2.5em",
//               }}
//             >
//               slogan here 5 words
//             </h2>
//           </div>
//           <div>
//             <button
//               className={`btn ${
//                 state === "Abu Dhabi" ? "bg-dark text-white" : "btn-light"
//               } mx-2`}
//               onClick={() => setState("Abu Dhabi")}
//             >
//               Abu Dhabi
//             </button>
//             <button
//               className={`btn ${
//                 state === "Dubai" ? "bg-dark text-white" : "btn-light"
//               } mx-2`}
//               onClick={() => setState("Dubai")}
//             >
//               Dubai
//             </button>
//           </div>
//         </div>

//         <div
//           className="d-flex gap-3 my-2 text-uppercase text-secondary"
//           style={{
//             fontSize: "16px",
//             fontWeight: "600",
//           }}
//         >
//           <span
//             className="cat"
//             style={{
//               cursor: "pointer",
//               color: category === "tours" ? "#000" : "",
//             }}
//             onClick={() => setCategory("tours")}
//           >
//             Tours
//           </span>
//           <span
//             className="cat"
//             style={{
//               cursor: "pointer",
//               color: category === "tickets" ? "#000" : "",
//             }}
//             onClick={() => setCategory("tickets")}
//           >
//             Tickets
//           </span>
//           <span
//             className="cat"
//             style={{
//               cursor: "pointer",
//               color: category === "transfer" ? "#000" : "",
//             }}
//             onClick={() => setCategory("transfer")}
//           >
//             Transfer
//           </span>
//         </div>

//         <div className="d-flex flex-wrap align-items-start">
//           {filteredTrips.length > 0 ? (
//             filteredTrips.map((trip) => (
//               <div
//                 key={trip.id}
//                 className="d-flex col-md-6 flex-column gap-5 justify-content-between"
//               >
//                 <div>
//                   <h2 className="fw-bolder mb-3 fs-1">{trip.place.name}</h2>
//                   <p
//                     className="w-75"
//                     style={{
//                       color: "#1F1F1F",
//                     }}
//                   >
//                     {trip.description}
//                   </p>
//                   <p
//                     className="fs-3 fw-bolder"
//                     style={{
//                       color: "#FF6B00",
//                     }}
//                   >
//                     {trip.ticket_price_from} DH - {trip.ticket_price_to} DH
//                   </p>
//                   <p className="fs-5">
//                     <i className="fa-regular fa-clock text-secondary"></i>{" "}
//                     {trip.duration}
//                   </p>

//                   <div className="d-flex gap-3">
//                     <button
//                       className="btn text-white py-2 px-3 d-flex gap-2 align-items-center"
//                       style={{
//                         backgroundColor: "#FF6B00",
//                         cursor: "pointer",
//                       }}
//                     >
//                       <img src={Book} alt="Book Now" /> Book Now
//                     </button>
//                     <img
//                       src={Bookarrow}
//                       alt="book-arrow"
//                       style={{
//                         cursor: "pointer",
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div className="px-2 mt-4 d-flex align-items-center justify-content-between">
//                   <Link
//                     style={{
//                       color: "#42A7C3",
//                     }}
//                   >
//                     {" "}
//                     See More Travels
//                   </Link>
//                   <div
//                     className="d-flex gap-5 flex-grow-1 justify-content-end"
//                     style={{
//                       fontSize: "30px",
//                       paddingRight: "20px",
//                     }}
//                   >
//                     <i
//                       className="fa-solid fa-arrow-left"
//                       style={{
//                         cursor: "pointer",
//                       }}
//                     ></i>
//                     <i
//                       className="fa-solid fa-arrow-right"
//                       style={{
//                         cursor: "pointer",
//                       }}
//                     ></i>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-md-6">
//               <h2 className="fw-bolder mb-3 fs-1">No trips available</h2>
//             </div>
//           )}
//           <div className="col-md-6 rounded overflow-hidden">
//             <img
//               src={img}
//               alt="omg"
//               style={{ objectFit: "cover" }}
//               className="d-block w-100"
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import "./TopServices.css";
import { trips } from "./trips";
import Book from "../assets/Book.svg";
import Bookarrow from "../assets/Bookarrow.svg";
import { Link } from "react-router-dom";

export default function TopServices() {
  const [state, setState] = useState("Dubai");
  const [category, setCategory] = useState("tours");
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    filterTrips();
  }, [state, category]);

  const filterTrips = () => {
    let stateTrips = trips.filter((trip) => trip.state.name === state);
    let categoryTrips = stateTrips.filter(
      (trip) => trip.trip_category.name === category
    );
    setFilteredTrips(categoryTrips);
    setCurrentImageIndex(0); // Reset the image index when the trips change
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === filteredTrips[0].images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? filteredTrips[0].images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="top-services container my-4">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h4
              className="text-uppercase fw-bolder"
              style={{
                color: "#42A7C3",
                letterSpacing: "0.1em",
              }}
            >
              Top Services
            </h4>
            <h2
              className="text-uppercase"
              style={{
                fontWeight: "600",
                letterSpacing: "2px",
                fontSize: "2.5em",
              }}
            >
              slogan here 5 words
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

        <div
          className="d-flex gap-3 my-2 text-uppercase text-secondary"
          style={{
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          <span
            className="cat"
            style={{
              cursor: "pointer",
              color: category === "tours" ? "#000" : "",
            }}
            onClick={() => setCategory("tours")}
          >
            Tours
          </span>
          <span
            className="cat"
            style={{
              cursor: "pointer",
              color: category === "tickets" ? "#000" : "",
            }}
            onClick={() => setCategory("tickets")}
          >
            Tickets
          </span>
          <span
            className="cat"
            style={{
              cursor: "pointer",
              color: category === "transfer" ? "#000" : "",
            }}
            onClick={() => setCategory("transfer")}
          >
            Transfer
          </span>
        </div>

        <div className="d-flex flex-wrap align-items-start">
          {filteredTrips.length > 0 ? (
            <>
              <div
                className="d-flex col-md-6 flex-column gap-5 justify-content-between"
                style={{
                  height: "450px",
                }}
              >
                <div>
                  <h2 className="fw-bolder mb-3 fs-1">
                    {filteredTrips[0].place.name}
                  </h2>
                  <p
                    className="w-75"
                    style={{
                      color: "#1F1F1F",
                    }}
                  >
                    {filteredTrips[0].description}
                  </p>
                  <p
                    className="fs-3 fw-bolder"
                    style={{
                      color: "#FF6B00",
                    }}
                  >
                    {filteredTrips[0].ticket_price_from} DH -{" "}
                    {filteredTrips[0].ticket_price_to} DH
                  </p>
                  <p className="fs-5">
                    <i className="fa-regular fa-clock text-secondary"></i>{" "}
                    {filteredTrips[0].duration}
                  </p>

                  <div className="d-flex gap-3">
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
                <div className="px-2 mt-4 d-flex align-items-center justify-content-between">
                  <Link
                    style={{
                      color: "#42A7C3",
                    }}
                  >
                    {" "}
                    See More Travels
                  </Link>
                  <div
                    className="d-flex gap-5 flex-grow-1 justify-content-end"
                    style={{
                      fontSize: "30px",
                      paddingRight: "20px",
                    }}
                  >
                    <i
                      className="fa-solid fa-arrow-left"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={handlePrevImage}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-right"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={handleNextImage}
                    ></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6 rounded overflow-hidden">
                <img
                  src={filteredTrips[0].images[currentImageIndex].url}
                  alt="Trip"
                  style={{ objectFit: "cover", borderRadius: "10px",height:"450px" }}
                  className="d-block w-75 m-auto"
                />
              </div>
            </>
          ) : (
            <div className="col-md-6">
              <h2 className="fw-bolder mb-3 fs-1">No trips available</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
