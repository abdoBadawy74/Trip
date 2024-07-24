import React, { useState } from "react";
import quote from "../assets/quote.svg";
import person from "../assets/person.png";
import "./Testimonials.css";

const testimonialsData = [
  {
    quote:
      "“On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.”",
    name: "Sherif Mohamed",
    location: "Suhaj, Egypt",
    img: person,
  },
  {
    quote: "“Another testimonial text here. It can be longer or shorter2.”",
    name: "Jane Doe",
    location: "beni suef, Egypt",
    img: person,
  },
    {
    quote: "“Another testimonial text here. It can be longer or shorter3.”",
    name: "Jane Doe",
    location: "Qana, Egypt",
    img: person,
    },
    {
    quote: "“Another testimonial text here. It can be longer or shorter4.”",
    name: "Jane Doe",
    location: "location, Egypt",
    img: person,
    },
    
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
    <div className="testimonials my-5 container p-4 d-flex justify-content-center justify-content-md-between flex-wrap gap-4">
      <div className="position-relative w-50">
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
          className="text-uppercase"
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
      <div
        className="slider position-relative flex-grow-1 "
        style={{
          marginBottom: "50px",
        }}
      >
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className={`box shadow bg-white rounded position-absolute ${
              index === activeIndex
                ? "active"
                : index === (activeIndex + 1) % testimonialsData.length
                ? "next"
                : "inactive"
            }`}
            style={{
              width: "450px",
              padding: "40px 30px 30px 40px",
              left: "15%",
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
