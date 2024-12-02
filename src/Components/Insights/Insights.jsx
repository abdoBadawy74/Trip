import "./Insights.css";
import img1 from "../../assets/insight1.jpeg";
import img2 from "../../assets/insight2.jpeg";
import img3 from "../../assets/insight3.jpeg";
import img4 from "../../assets/insight4.jpeg";
import img5 from "../../assets/insight5.jpeg";
import img6 from "../../assets/insight6.jpeg";
import img7 from "../../assets/insight7.jpeg";
// translation
import t from "../../Translation/translation";
import useLanguage from "../../context/useLanguage";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE } from "../../API/Api";

export default function Insights() {
  const [insights, setInsights] = useState([]);
  // translation
  const { language } = useLanguage();

  useEffect(() => {
    axios.get(`${BASE}/insights`).then((res) => {
      setInsights(res.data);
      console.log(res.data)
    })
  }, []);



  return (
    <div className="insights my-3 position-relative" >
      <span className="before">{t[language].Insights}</span>
      <h2
        className="text-center fw-bold  "
        style={{
          letterSpacing: "2px",
          margin: "5rem",
          textTransform: "uppercase",
        }}
      >
        {t[language].Insights}
      </h2>

      <div
        className="m-auto mt-5  my-3 d-flex justify-content-center gap-4 flex-wrap overflow-hidden"
        style={{
          width: "100%",
        }}
      >

        {insights.map((insight, index) => {
          return (
            <div
            key={index}
            className="col-11 col-md-6 col-lg-3   d-flex flex-column gap-2 py-2"
            style={{
              height: "450px",
            }}
          >
            <div
              className="bg-dark position-relative rounded overflow-hidden"
              style={{
                height: "100%",
              }}
            >
              <img
                src={insight.image_url}
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
                {insight.title}
              </div>
            </div>
  
  
          </div>
          )
          
        })}
      </div>
    </div>
  );
}
