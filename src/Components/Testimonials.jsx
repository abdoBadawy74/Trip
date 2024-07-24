// import React from "react";
// import quote from "../assets/quote.svg";
// import person from "../assets/person.png";

// export default function Testimonials() {
//   return (
//     <div className="testmonials my-5 container p-4 d-flex justify-content-between ">
//       <div className="position-relative w-50">
//         <img
//           src={quote}
//           alt="quote"
//           className="position-absolute end-0 bottom-0"
//         />
//         <h3
//           className="text-uppercase"
//           style={{
//             letterSpacing: "2px",
//             fontWeight: "700",
//             color: "#42A7C3",
//           }}
//         >
//           testimonials
//         </h3>
//         <p
//           className="text-uppercase "
//           style={{
//             fontSize: "45px",
//             fontWeight: "600",
//           }}
//         >
//           What people say
//           <br /> about Us.
//         </p>
//         <div className="bullets d-flex gap-1">
//           <div
//             className="bullet rounded-circle"
//             style={{
//               backgroundColor: "#F77A40",
//               width: "10px",
//               height: "10px",
//             }}
//           ></div>
//           <div
//             className="bullet rounded-circle"
//             style={{
//               backgroundColor: "#D9D9D9",
//               width: "10px",
//               height: "10px",
//             }}
//           ></div>
//           <div
//             className="bullet rounded-circle"
//             style={{
//               backgroundColor: "#D9D9D9",
//               width: "10px",
//               height: "10px",
//             }}
//           ></div>
//           <div
//             className="bullet rounded-circle"
//             style={{
//               backgroundColor: "#D9D9D9",
//               width: "10px",
//               height: "10px",
//             }}
//           ></div>
//           <div
//             className="bullet rounded-circle"
//             style={{
//               backgroundColor: "#D9D9D9",
//               width: "10px",
//               height: "10px",
//             }}
//           ></div>
//         </div>
//       </div>
//       <div className="slider position-relative">
//         <div
//           className="box shadow rounded position-relative "
//           style={{
//             width: "450px",
//             padding: "40px 30px 30px 40px",
//           }}
//         >
//           <img
//             src={person}
//             alt="person-img"
//             width={"75px"}
//             height={"75px"}
//             className="rounded-circle position-absolute "
//             style={{
//               top: "-25px",
//               left: "10px",
//               transform: "translateX(-50%)",
//             }}
//           />
//           <p>
//             “On the Windows talking painted pasture yet its express parties use.
//             Sure last upon he same as knew next. Of believed or diverted no.”
//           </p>
//           <div className="user-info">
//             <h4>Sherif Mohamed</h4>
//             <p>Suhaj, Egypt</p>
//           </div>
//         </div>
//         <div
//           className="arrows d-flex flex-column gap-3 position-absolute"
//           style={{
//             right: "-50px",
//             top: "50%",
//             transform: "translateY(-50%)",
//           }}
//         >
//           <i
//             className="fas fa-chevron-up"
//             style={{
//               cursor: "pointer",
//             }}
//           ></i>
//           <i
//             className="fas fa-chevron-down"
//             style={{
//               cursor: "pointer",
//             }}
//           ></i>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import quote from "../assets/quote.svg";
import person from "../assets/person.png";
import "./Testimonials.css"; // Make sure to create this CSS file

const testimonialsData = [
  {
    quote:
      "“On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.”",
    name: "Sherif Mohamed",
    location: "Suhaj, Egypt",
    img: person,
  },
  {
    quote: "“Another testimonial text here. It can be longer or shorter.”",
    name: "Jane Doe",
    location: "Cairo, Egypt",
    img: person,
  },
  // Add more testimonials as needed
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonialsData.length) % testimonialsData.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  return (
    <div className="testimonials  my-5 container p-4 d-flex justify-content-center justify-content-md-between flex-wrap gap-4">
      <div className="text position-relative w-50">
        <img
          src={quote}
          alt="quote"
          className="position-absolute end-0 bottom-0"
        />
        <h3
          className="text-uppercase"
          style={{
            letterSpacing: "2px",
            fontWeight: "700",
            color: "#42A7C3",
          }}
        >
          testimonials
        </h3>
        <p
          className="text-uppercase "
          style={{
            fontSize: "45px",
            fontWeight: "600",
          }}
        >
          What people say
          <br /> about Us.
        </p>
        <div className="bullets d-flex gap-1">
          {testimonialsData.map((_, index) => (
            <div
              key={index}
              className="bullet rounded-circle"
              style={{
                backgroundColor: activeIndex === index ? "#F77A40" : "#D9D9D9",
                width: "10px",
                height: "10px",
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="slider position-relative">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className={`box shadow rounded position-relative ${
              index === activeIndex ? "active" : "inactive"
            }`}
            style={{
              width: "450px",
              padding: "40px 30px 30px 40px",
              display: index === activeIndex ? "block" : "none",
            }}
          >
            <img
              src={testimonial.img}
              alt="person-img"
              width={"75px"}
              height={"75px"}
              className="rounded-circle position-absolute"
              style={{
                top: "-25px",
                left: "10px",
                transform: "translateX(-50%)",
              }}
            />
            <p>{testimonial.quote}</p>
            <div className="user-info">
              <h4>{testimonial.name}</h4>
              <p>{testimonial.location}</p>
            </div>
          </div>
        ))}
        <div
          className="arrows d-flex flex-column gap-3 position-absolute"
          style={{
            right: "-50px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <i
            className="fas fa-chevron-up"
            style={{
              cursor: "pointer",
            }}
            onClick={handlePrev}
          ></i>
          <i
            className="fas fa-chevron-down"
            style={{
              cursor: "pointer",
            }}
            onClick={handleNext}
          ></i>
        </div>
      </div>
    </div>
  );
}
