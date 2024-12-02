import icon1 from "../../assets/x-icon.svg";
import icon2 from "../../assets/youtube-icon.svg";
import icon3 from "../../assets/instgram-icon.svg";
import icon4 from "../../assets/facebook-icon.svg";
import icon5 from "../../assets/telegram-icon.svg";
import arrowPlane from "../../assets/Plane.svg";
import { Link } from "react-router-dom";
// translation
import t from "../../Translation/translation";
import useLanguage from "../../context/useLanguage";

import "./Footer.css";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE } from "../../API/Api";

export default function Footer() {
  const [email, setEmail] = useState("");
  // translation
  const { language } = useLanguage();
  // console.log(email)
  const validate = () => {

  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(email);


    // Check for empty fields
    if (!email) {
      toast.error("Please enter your email.");
      return; // Exit the function if validation fails
    }


    try {
      const res = await axios.post(`${BASE}/subscribe`, { email });
      console.log(res);
      if (res.status === 201) {
        toast.success("Subscribed successfully");
        setEmail("");
      }
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <div
      style={{
        backgroundColor: "#42A7C3",
        padding: "50px 50px 10px 50px",
      }}
      className="position-relative overflow-hidden footer"
    >
      <img
        src={arrowPlane}
        alt="arrowPlane"
        className="position-absolute top-0 end-0"
      />
      <div
        className="container mx-auto p-5 text-white text-capitalize d-flex justify-content-between flex-wrap position-relative"
        style={{
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: "20px",
          zIndex: 1,
        }}
      >
        <div className="text col-12 col-lg-4">
          <p className="fs-3 text-capitalize">{t[language].need}</p>
          <h3
            style={{
              fontSize: "48px",
            }}
          >
            {t[language].need}
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 p-0 justify-self-end col-12 col-lg-3 ">
          <input
            type="email"
            placeholder={t[language].email}
            className="text-muted p-2 rounded border-0 outline-0 w-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-dark p-2 w-100">
            {t[language].subscribe}
          </button>
        </form>
      </div>
      <div className="container my-3">
        <h2
          className="fs-2 bebas-neue-bold"
          style={{
            color: "#FFF",
            textTransform: "uppercase",
            marginTop: "50px",
          }}
        >
          Infinity
          <span
            style={{
              color: "#d9d9d9",
            }}
          >
            palc
            <span
              style={{
                color: "#FFF",
              }}
            >
              e
            </span>
            s
          </span>
        </h2>
        <div className="d-flex justify-content-between flex-wrap border-bottom py-2">
          <ul
            className="d-flex gap-4 text-white "
            style={{
              fontWeight: "500",
            }}
          >
            <li>{t[language].hotels} </li>
            <li>{t[language].travels}</li>
            <li>{t[language].aboutUs}</li>
            <li>{t[language].contactUs}</li>
          </ul>

          <div className="d-flex gap-2 social">
            <img
              src={icon1}
              alt="icon"
              style={{
                cursor: "pointer",
              }}
            />
            <img
              src={icon2}
              alt="icon"
              style={{
                cursor: "pointer",
              }}
            />
            <img
              src={icon3}
              alt="icon"
              style={{
                cursor: "pointer",
              }}
            />
            <img
              src={icon4}
              alt="icon"
              style={{
                cursor: "pointer",
              }}
            />
            <img
              src={icon5}
              alt="icon"
              style={{
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between flex-wrap mt-2 align-items-center">
          <span className="text-white copy">{t[language].copyRight}</span>
          <div
            className="d-flex gap-3 text-white m-0"
            style={{
              opacity: 0.5,
            }}
          >
            <span>
              <Link to="/privacy">{t[language].policy}</Link>
            </span>

            <span>{t[language].terms} </span>
          </div>
        </div>
      </div>
    </div>
  );
}
