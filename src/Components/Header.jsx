import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Header.css";
export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-transparent px-2">
        <div className="container-fluid flex-nowrap">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo" width={"184px"} height={"62px"} />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ width: "fit-content" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <li
              className="nav-item dropdown"
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
                      ? "fa-solid fa-chevron-up"
                      : "fa-solid fa-chevron-down"
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

            <ul className="navbar-nav mx-auto m-2 mb-lg-0">
              <li className="nav-item active">
                <NavLink className="nav-link active" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/home/myevents">
                  About
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav m-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="btn text-white m-2 order-lg-last order-first"
                  to="/login"
                  style={{ backgroundColor: "#3296d4" }}
                >
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <button
                  className="btn m-2 register-btn"
                  style={{
                    color: "#3296d4",
                    borderColor: "#3296d4",
                    width: "fit-content",
                  }}
                >
                  test
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
