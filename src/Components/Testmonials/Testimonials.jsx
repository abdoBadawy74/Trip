import { useEffect, useState } from "react";
import quote from "../../assets/quote.svg";
import person from "../../assets/person.png";
import "./Testimonials.css";
// translation
import t from "../../Translation/translation";
import useLanguage from "../../context/useLanguage";
import axios from "axios";
import { BASE } from "../../API/Api";


export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  // translation
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  // console.log(activeIndex)
  // console.log(testimonials)

  // fetch testimonials from the server
  useEffect(() => {
    axios.get(`${BASE}/testimonials`).then((res) => {
      setTestimonials(res.data.data);
    }
    ).catch((err) => {
      console.log(err);
    })
  }, []);


  // handle next and prev buttons
  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };



  return (
    <div className="testimonials container p-4 d-flex justify-content-center justify-content-md-between flex-wrap gap-4 ">
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
          {t[language].testimonials}
        </h3>
        <p
          className="text-uppercase"
          style={{
            fontSize: "45px",
            fontWeight: "600",
          }}
        >
          {t[language].say}
          <br /> {t[language].about}
        </p>
        <div className="bullets d-flex gap-1">
          {testimonials.map((_, index) => (
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
      <div className="slider position-relative flex-grow-1 ">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`box shadow bg-white rounded position-absolute ${index === activeIndex
              ? "active"
              : index === (activeIndex + 1) % testimonials.length
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
              src={testimonial.image_url}
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
            <p>{testimonial.comment}</p>
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
            zIndex: "100",
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
