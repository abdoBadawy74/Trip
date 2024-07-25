import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false);
    // Store the selected language in a variable for later use
    // For example, can use local storage, context, or a state management library
  };

  useEffect(() => {
    const updateActiveLink = () => {
      // Get the hash fragment, removing the leading '#' character
      const hash = window.location.hash.substring(1);

      // Clear the current active link
      const activeLink = document.querySelector(".nav-link.active");
      if (activeLink) {
        activeLink.classList.remove("active");
      }

      // Add the 'active' class to the new active link based on the hash
      if (hash === "/hotels") {
        document.querySelector('a[href="#/hotels"]').classList.add("active");
      } else if (hash === "/home" || hash === "") {
        document.querySelector('a[href="#/home"]').classList.add("active");
      } else if (hash === "/travels") {
        document.querySelector('a[href="#/travels"]').classList.add("active");
      }
    };

    // Update active link on component mount
    updateActiveLink();

    // Update active link on hash change
    window.addEventListener("hashchange", updateActiveLink);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("hashchange", updateActiveLink);
    };
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg b-orange bgi-transparent p-0  m-0 position-relative"
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
          className="navbar-toggler "
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
          <li
            className="nav-item dropdown align-self-center"
            style={{
              listStyleType: "none",
            }}
          >
            <button
              className="btn btn-link nav-link text-white p-2"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded={isDropdownOpen}
              onClick={toggleDropdown}
              style={{ padding: 0 }}
            >
              {selectedLanguage}
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
                  className="dropdown-item text-white p-2"
                  type="button"
                  onClick={() => handleLanguageChange("English")}
                >
                  English
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item text-white p-2"
                  type="button"
                  onClick={() => handleLanguageChange("Arabic")}
                >
                  Arabic
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item text-white p-2"
                  type="button"
                  onClick={() => handleLanguageChange("French")}
                >
                  French
                </button>
              </li>
            </ul>
          </li>

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
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/hotels">
                Hotels
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/hotels">
                Travels
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/hotels">
                About Us
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav m-2 mb-lg-0">
            <li className="m-auto">
              <Link className="btn m-2 order-lg-last nav-btn" to="/login">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
