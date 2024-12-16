import { useState, useRef, useEffect, useContext } from "react";
import "./Landing.css";
import video from "../../assets/landing-video1.mp4";
import video2 from "../../assets/landing-video2.mp4";
import Header from "../Header/Header";
import transfer from "../../assets/transfer.svg";
import ticket from "../../assets/ticket.svg";
import tour from "../../assets/tour.svg";
// translation
import t from "../../Translation/translation";
import useLanguage from "../../context/useLanguage";
import TripsContext from './../../context/TripsContext';
import HotelsContext from './../../context/HotelsContext';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { set } from "date-fns";

export default function Landing() {
  // translation
  const { language } = useLanguage();

  // context for trips and hotels 
  const { trips } = useContext(TripsContext);
  const { hotels } = useContext(HotelsContext);

  // states
  const [selectedCity, setSelectedCity] = useState("Dubai");
  const [animationClass, setAnimationClass] = useState("show-from-bottom");
  const [searchState, setSearchState] = useState("travels");
  const [filteredtrips, setFilteredTrips] = useState([]);
  const [search, setSearch] = useState("");

  // navigation
  const navigate = useNavigate();


  // refs for videos
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

  // handle search change
  const handleChange = (e) => {
    setSearchState(e.target.value);
  };

  // handle search
  console.log(searchState)
  // reset filtered trips when search state changes
  useEffect(() => {
    setFilteredTrips("")
    setSearch("")
  }, [searchState])

  const handleSearch = () => {
    if (searchState === "travels") {
      const filtered = trips.filter((trip) =>
        trip.place.name.toLowerCase().includes(search.toLowerCase())
      )
      console.log("filtered", filtered)
      setFilteredTrips(filtered);
    } else {
      const filtered = hotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(search.toLowerCase())
      )
      setFilteredTrips(filtered);
    }
  }
  console.log(filteredtrips)

  return (
    <>
      <div
        className="landing-section position-relative w-100"
        style={{
          minHeight: "100vh",
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
          {t[language].videoSupport}
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
          {t[language].videoSupport}
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
                className={`flex-grow-1 fs-5 ${selectedCity === "Abu Dhabi" ? "AbuDhabi-active" : ""
                  }`}
                style={{
                  cursor: "pointer",
                  fontWeight: "600",
                  color: "white",
                  opacity: selectedCity === "Abu Dhabi" ? "1" : "0.5",
                }}
                onClick={() => handleCityChange("Abu Dhabi")}
              >
                {t[language].city1}
              </li>
              <li
                className={`fs-5 ${selectedCity === "Dubai" ? "Dubai-active" : ""
                  }`}
                style={{
                  cursor: "pointer",
                  fontWeight: "600",
                  color: "white",
                  opacity: selectedCity === "Dubai" ? "1" : "0.5",
                }}
                onClick={() => handleCityChange("Dubai")}
              >
                {t[language].city2}
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
              className={`dubai-content ${selectedCity === "Dubai" ? animationClass : "hide"
                }`}
            >
              <h1
                className="bebas-neue-bold text-center"
                style={{
                  fontSize: "90px",
                  lineHeight: "1",
                }}
              >
                {t[language].h1_part1} <br /> {t[language].h1_part2}
              </h1>
              <div className="icons my-2 d-flex p-3 justify-content-center gap-4 ">
                <Link
                  to="/travels"
                  state={{ category: "transfer", city: "Dubai" }}
                  className="icon text-white p-3 rounded-circle d-flex flex-column justify-content-around align-items-center"
                  style={{
                    height: "120px",
                    width: "120px",
                    backgroundColor: "rgba(255,255,255,0.4)",
                    textDecoration: "none",
                  }}
                >
                  <img src={transfer} alt="icon" />
                  <p>{t[language].Transfer}</p>
                </Link>
                <Link
                  to={"/travels"}
                  state={{ category: "ticket", city: "Dubai" }}
                  className="icon text-white p-3 rounded-circle d-flex flex-column justify-content-around align-items-center"
                  style={{
                    height: "120px",
                    width: "120px",
                    backgroundColor: "rgba(255,255,255,0.4)",
                    textDecoration: "none",
                  }}
                >
                  <img src={ticket} alt="icon" />
                  <p>{t[language].Ticket}</p>
                </Link>
                <Link
                  to={"/travels"}
                  state={{ category: "tour", city: "Dubai" }}
                  className="icon text-white p-3 rounded-circle d-flex flex-column justify-content-around align-items-center"
                  style={{
                    height: "120px",
                    width: "120px",
                    backgroundColor: "rgba(255,255,255,0.4)",
                    textDecoration: "none",
                  }}
                >
                  <img src={tour} alt="icon" />
                  <p>{t[language].Tour}</p>
                </Link>
              </div>

              <div
                className="form m-auto d-flex align-items-center gap-3 p-4  rounded"
                style={{
                  width: "70%",
                  backgroundColor: "#fff",
                }}
              >
                <select className="border-0" value={searchState} onChange={handleChange} style={{ outline: "none" }}>
                  <option value="travels">Travels</option>
                  <option value="hotels">Hotels</option>
                </select>
                <input
                  type="text"
                  placeholder={t[language].Search}
                  className="w-50 rounded p-2 border-0 outline-0 flex-grow-1"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    handleSearch()
                  }}
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
                // onClick={handleSearch}
                >
                  {t[language].Search}
                </button>
              </div>
              <div
                className="search-results m-auto mb-5  flex-column align-items-center gap-3 rounded"
                style={{
                  width: "70%",
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  maxHeight: "300px",
                  overflowY: "auto",
                  display: search.length > 0 ? "flex" : "none",
                }}
              >
                {filteredtrips.length > 0 ? (
                  filteredtrips.map((item, index) => (
                    <div
                      key={index}
                      className="result-item p-3 d-flex  justify-content-between gap-3 w-100"
                      style={{
                        borderBottom: "1px solid #ddd",
                        cursor: "pointer",
                        color: "#000"
                      }}
                      onClick={() => {
                        searchState === "travels" ? navigate(`/travels/${item.id}`) : navigate(`/hotels/${item.id}`)
                      }}
                    >
                      <img src={item.images[0]?.url} alt="image" className="rounded shadow" width="100px" height="50px" />
                      <div>
                        {
                          searchState === "travels" ?
                            (<h4 className="m-0">{item.place?.name}</h4>) :
                            (<h4 className="m-0">{item.name}</h4>)
                        }
                        <small className="text-secondary">{item.description.slice(0, 25)}...</small>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    className="no-results p-3 text-center"
                    style={{
                      color: "#888",
                    }}
                  >
                    {t[language].noResults || "No results found"}
                  </div>
                )}
              </div>
            </div>

            <div
              className={`abuDhabi-content ${selectedCity === "Abu Dhabi" ? animationClass : "hide"
                }`}
            >
              <h1
                className="bebas-neue-bold text-center"
                style={{
                  fontSize: "90px",
                  lineHeight: "1",
                }}
              >
                {t[language].h2_part1} <br /> {t[language].h2_part2}
              </h1>
              <div className="icons my-2 d-flex p-3 justify-content-center gap-4 ">
                <Link
                  to="/travels"
                  state={{ category: "transfer", city: "Abu Dhabi" }}
                  className="icon text-white p-3 rounded-circle d-flex flex-column justify-content-around align-items-center"
                  style={{
                    height: "120px",
                    width: "120px",
                    backgroundColor: "rgba(255,255,255,0.4)",
                    textDecoration: "none",
                  }}
                >
                  <img src={transfer} alt="icon" />
                  <p> {t[language].Transfer}</p>
                </Link>
                <Link
                  to="/travels"
                  state={{ category: "ticket", city: "Abu Dhabi" }}
                  className="icon text-white p-3 rounded-circle d-flex flex-column justify-content-around align-items-center"
                  style={{
                    height: "120px",
                    width: "120px",
                    backgroundColor: "rgba(255,255,255,0.4)",
                    textDecoration: "none",
                  }}
                >
                  <img src={ticket} alt="icon" />
                  <p>{t[language].Ticket}</p>
                </Link>
                <Link
                  to="/travels"
                  state={{ category: "tour", city: "Abu Dhabi" }}
                  className="icon text-white p-3 rounded-circle d-flex flex-column justify-content-around align-items-center"
                  style={{
                    height: "120px",
                    width: "120px",
                    backgroundColor: "rgba(255,255,255,0.4)",
                    textDecoration: "none",
                  }}
                >
                  <img src={tour} alt="icon" />
                  <p>{t[language].Tour}</p>
                </Link>
              </div>

              <div
                className="form m-auto d-flex align-items-center gap-3 p-4  rounded"
                style={{
                  width: "70%",
                  backgroundColor: "#fff",
                }}
              >
                <select className="border-0" value={searchState} onChange={handleChange} style={{ outline: "none" }}>
                  <option value="travels">Travels</option>
                  <option value="hotels">Hotels</option>
                </select>
                <input
                  type="text"
                  placeholder={t[language].Search}
                  className="w-50 rounded p-2 border-0 outline-0 flex-grow-1"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    handleSearch()
                  }}
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
                // onClick={handleSearch}
                >
                  {t[language].Search}
                </button>
              </div>
              <div
                className="search-results m-auto mb-5  flex-column align-items-center gap-3 rounded"
                style={{
                  width: "70%",
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  maxHeight: "300px",
                  overflowY: "auto",
                  display: search.length > 0 ? "flex" : "none",
                }}
              >
                {filteredtrips.length > 0 ? (
                  filteredtrips.map((item, index) => (
                    <div
                      key={index}
                      className="result-item p-3 d-flex  justify-content-between gap-3 w-100"
                      style={{
                        borderBottom: "1px solid #ddd",
                        cursor: "pointer",
                        color: "#000"
                      }}
                      onClick={() => {
                        searchState === "travels" ? navigate(`/travels/${item.id}`) : navigate(`/hotels/${item.id}`)
                      }}
                    >
                      <img src={item.images[0]?.url} alt="image" className="rounded shadow" width="100px" height="50px" />
                      <div>
                        {
                          searchState === "travels" ?
                            (<h4 className="m-0">{item.place?.name}</h4>) :
                            (<h4 className="m-0">{item.name}</h4>)
                        }
                        <h4 className="m-0">{item.place?.name}</h4>
                        <small className="text-secondary">{item.description.slice(0, 25)}...</small>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    className="no-results p-3 text-center"
                    style={{
                      color: "#888",
                    }}
                  >
                    {t[language].noResults || "No results found"}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div >
    </>
  );
}
