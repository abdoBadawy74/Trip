import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import "./Header.css";
import t from "../../Translation/translation";
import useLanguage from "../../context/useLanguage";

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageChange = (language) => {
    setLanguage(language);
    localStorage.setItem("language", language);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, [setLanguage]);

  useEffect(() => {
    const updateActiveLink = () => {
      const hash = window.location.hash.substring(1);

      const activeLink = document.querySelector(".nav-link.active");
      if (activeLink) {
        activeLink.classList.remove("active");
      }

      if (hash === "hotels") {
        document.querySelector('a[href="#/hotels"]').classList.add("active");
      } else if (hash === "home" || hash === "") {
        document.querySelector('a[href="#/home"]').classList.add("active");
      } else if (hash === "travels") {
        document.querySelector('a[href="#/travels"]').classList.add("active");
      }
    };

    updateActiveLink();
    window.addEventListener("hashchange", updateActiveLink);

    return () => {
      window.removeEventListener("hashchange", updateActiveLink);
    };
  }, []);

  useEffect(() => {
    if (location.hash === "#about") {
      scroll.scrollTo(document.getElementById("about").offsetTop, {
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  }, [location]);

  return (
    <nav
      className="navbar navbar-expand-lg b-orange bg-transparent p-0 m-0 position-relative"
      style={{
        zIndex: 22,
      }}
    >
      <div className="container-fluid flex-nowrap px-4 align-items-center">
        <Link className="navbar-brand" to="/">
          <span
            className="fs-2 bebas-neue-bold"
            style={{
              color: "#FFF",
              textTransform: "uppercase",
            }}
          >
            Infinity
            <span
              className="grey"
              style={{
                color: "#F77A40",
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
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ width: "fit-content", borderColor: "#EEE" }}
        >
          <i className="fa-solid fa-bars text-light"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-2 mb-lg-0">
            <li className=" dropdown align-self-center mx-2">
              <button
                className="btn btn-link nav-link text-white p-2"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
                style={{ padding: 0 }}
              >
                {t[language].language}
                <i
                  className={`${
                    isDropdownOpen
                      ? "fa-solid fa-chevron-down"
                      : "fa-solid fa-chevron-up"
                  } ms-1`}
                ></i>
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdown"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <li>
                  <button
                    className="dropdown-item  p-2"
                    type="button"
                    onClick={() => handleLanguageChange("en")}
                  >
                    English
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item  p-2"
                    type="button"
                    onClick={() => handleLanguageChange("ar")}
                  >
                    Arabic
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item  p-2"
                    type="button"
                    onClick={() => handleLanguageChange("it")}
                  >
                    Italian
                  </button>
                </li>
              </ul>
            </li>
          </ul>

          <ul
            className="navbar-nav mx-auto m-2 mb-lg-0"
            style={{
              flex: "1",
              columnGap: "30px",
              justifyContent: "center",
            }}
          >
            <li className="nav-item">
              <Link className="nav-link active" to="/home">
                {t[language].home}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/hotels">
                {t[language].hotels}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/travels">
                {t[language].travels}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                {t[language].aboutUs}
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav m-2 mb-lg-0">
            <li className="m-auto">
              <Link className="btn m-2 order-lg-last nav-btn" to="/login">
                {t[language].contactUs}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
