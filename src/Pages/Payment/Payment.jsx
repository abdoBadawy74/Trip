import React, { useContext, useState, useEffect } from "react";
import Calendar from "./../../Components/Calendar/Calendar";
import SelectedRangeContext from "../../context/SelectedRange";
import Header from "../../Components/Header/Header";
import { format, parseISO } from "date-fns";
import PhoneInput from "react-phone-number-input";
import "./Payment.css";
import axios from "axios";
import { BASE } from "./../../API/Api";

export default function Payment() {
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const { selectedRange, setSelectedRange } = useContext(SelectedRangeContext);
  const [startDay, setStartDay] = useState("");
  const [startMonthYear, setStartMonthYear] = useState("");
  const [endDay, setEndDay] = useState("");
  const [endMonthYear, setEndMonthYear] = useState("");
  const [adults, setAdults] = useState(0);
  const [minors, setMinors] = useState(0);
  const [total, setTotal] = useState(0);
  const [adultCost, setAdultCost] = useState(0);
  const [minorCost, setMinorCost] = useState(0);

  useEffect(() => {
    axios.get(`${BASE}/booking-age-categories`).then((res) => {
      console.log(res.data);
      res.data.map((category) => {
        if (category.title === "Adult") {
          setAdultCost(category.price);
        }
        if (category.title === "Child") {
          setMinorCost(category.price);
        }
      });
    });
  }, []);

  const handleAdultChange = (delta) => {
    setAdults((prev) => Math.max(0, prev + delta));
  };

  const handleMinorChange = (delta) => {
    setMinors((prev) => Math.max(0, prev + delta));
  };

  const getTotalCost = () => {
    return adults * adultCost + minors * minorCost;
  };

  useEffect(() => {
    if (selectedRange.start) {
      const startDate = parseISO(selectedRange.start);
      setStartDay(format(startDate, "d"));
      setStartMonthYear(format(startDate, "MMMM, yyyy"));
    }
    if (selectedRange.end) {
      const endDate = parseISO(selectedRange.end);
      setEndDay(format(endDate, "d"));
      setEndMonthYear(format(endDate, "MMMM, yyyy"));
    }
  }, [selectedRange]);

  console.log(adultCost, minorCost);

  return (
    <div className="payment">
      <div className="bg-orange">
        <Header />
      </div>
      <div className="container py-4">
        <div className="d-flex gap-1 align-items-md-center flex-column flex-md-row ">
          <div className="d-flex gap-2 align-items-center">
            <p
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: show1 ? "#42A7C3" : "#D9D9D9",
                color: show1 ? "#fff" : "#8A8A8A",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              01
            </p>
            <p
              style={{
                color: show1 ? "#42A7C3" : "#8A8A8A",
                fontWeight: "600",
                fontSize: "20px",
              }}
            >
              Date and Time
            </p>
          </div>
          <span
            className="d-none d-md-block"
            style={{
              width: "170px",
              height: "1px",
              backgroundColor: "#D9D9D9",
            }}
          ></span>
          <div className="d-flex gap-2 align-items-center">
            <p
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: show2 ? "#42A7C3" : "#D9D9D9",
                color: show2 ? "#fff" : "#8A8A8A",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              02
            </p>
            <p
              style={{
                color: show2 ? "#42A7C3" : "#8A8A8A",
                fontWeight: "600",
                fontSize: "20px",
              }}
            >
              Required Information
            </p>
          </div>
          <span
            className="d-none d-md-block"
            style={{
              width: "170px",
              height: "1px",
              backgroundColor: "#D9D9D9",
            }}
          ></span>
          <div className="d-flex gap-2 align-items-center">
            <p
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: show3 ? "#42A7C3" : "#D9D9D9",
                color: show3 ? "#fff" : "#8A8A8A",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              03
            </p>
            <p
              style={{
                color: show3 ? "#42A7C3" : "#8A8A8A",
                fontWeight: "600",
                fontSize: "20px",
              }}
            >
              Required Information
            </p>
          </div>
        </div>

        {show1 && (
          <div className="d-flex align-items-center justify-content-around flex-wrap">
            <Calendar />
            <div>
              <h2
                style={{
                  color: "#F77A40",
                  fontSize: "64px",
                  fontWeight: "600",
                  textAlign: "center",
                  marginTop: "2rem",
                }}
              >
                {startDay} {endDay ? " - " + endDay : ""}
              </h2>
              <p
                style={{
                  color: "#000",
                  fontSize: "24px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {startMonthYear} {endMonthYear ? " - " + endMonthYear : ""}
              </p>
              <button
                style={{
                  backgroundColor: "#F77A40",
                  color: "#fff",
                  fontSize: "20px",
                  fontWeight: "500",
                  padding: "10px 50px",
                  borderRadius: "8px",
                  border: "none",
                  outline: "none",
                  display: "block",
                  margin: "auto",
                }}
                onClick={() => {
                  setShow1(false);
                  setShow2(true);
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {show2 && (
          <div className="form my-4 d-flex px-5 flex-wrap gap-5">
            <form className="col-12 col-md-8">
              <div className="d-flex gap-4 flex-wrap">
                <div className="d-flex flex-column col-12 col-md-4">
                  <label
                    htmlFor="first-name"
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      marginBottom: "5px",
                    }}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    placeholder="your first name"
                    className="mb-3 border-0 outline-0 p-2"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#F8F9F9",
                      width: "100%",
                    }}
                  />
                </div>

                <div className="d-flex flex-column col-12 col-md-4">
                  <label
                    htmlFor="first-name"
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      marginBottom: "5px",
                    }}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    placeholder="your last name"
                    className="mb-3 border-0 outline-0 p-2"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#F8F9F9",
                      width: "100%",
                    }}
                  />
                </div>
              </div>

              <div className="d-flex gap-4 flex-wrap">
                <div className="d-flex flex-column col-12 col-md-4">
                  <label
                    htmlFor="email"
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      marginBottom: "5px",
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your email"
                    className="mb-3 border-0 outline-0 p-2"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#F8F9F9",
                      width: "100%",
                    }}
                  />
                </div>
                <div className="d-flex flex-column col-12 col-md-4">
                  <label
                    htmlFor="phone"
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      marginBottom: "5px",
                    }}
                  >
                    Phone
                  </label>
                  <PhoneInput
                    placeholder={"Enter Phone Number"}
                    defaultCountry="EG" // Set the default country code
                    name="PhoneNumber"
                    onChange={(value) => console.log(value)}
                    className="mb-3 border-0 outline-0 p-2"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#F8F9F9",
                      width: "100%",
                    }}
                  />
                </div>
              </div>
              <div className="d-flex gap-4 flex-wrap">
                <div className="d-flex flex-column col-12 col-md-4">
                  <span
                    htmlFor="numberofpeople"
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      marginBottom: "5px",
                    }}
                  >
                    number of people
                  </span>
                  <div
                    className="mb-3 border-0 outline-0 p-2 d-flex justify-content-between"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#F8F9F9",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        color: "#8A8A8A",
                        fontSize: "16px",
                      }}
                    >
                      Adults
                    </span>
                    <div className="d-flex align-items-center">
                      <button
                        onClick={() => handleAdultChange(1)}
                        style={{
                          border: "none",
                          background: "#F77A40",
                          width: "20px",
                          height: "20px",
                          color: "white",
                          borderRadius: "5px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        +
                      </button>

                      <input
                        type="number"
                        id="numberofadults"
                        value={adults}
                        readOnly
                        style={{
                          width: "50px",
                          textAlign: "center",
                          border: "none",
                          background: "transparent",
                        }}
                      />
                      <button
                        onClick={() => handleAdultChange(-1)}
                        style={{
                          border: "none",
                          background: adults === 0 ? "#D9D9D9" : "#F77A40",
                          width: "20px",
                          height: "20px",
                          color: "white",
                          borderRadius: "5px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        -
                      </button>
                    </div>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "600",
                        fontFamily: "Montserrat",
                      }}
                    >
                      {adults * adultCost}$
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column col-12 col-md-4">
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      marginBottom: "5px",
                      color: "#42A7C3",
                    }}
                  >
                    less than 12 years old
                  </span>
                  <div
                    className="mb-3 border-0 outline-0 p-2 d-flex justify-content-between"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#F8F9F9",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        color: "#8A8A8A",
                        fontSize: "16px",
                      }}
                    >
                      minor
                    </span>
                    <div className="d-flex align-items-center ">
                      <button
                        onClick={() => handleMinorChange(1)}
                        style={{
                          border: "none",
                          background: "#F77A40",
                          width: "20px",
                          height: "20px",
                          color: "white",
                          borderRadius: "5px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        +
                      </button>
                      <input
                        type="number"
                        id="numberofminors"
                        value={minors}
                        readOnly
                        style={{
                          width: "50px",
                          textAlign: "center",
                          border: "none",
                          background: "transparent",
                        }}
                      />

                      <button
                        onClick={() => handleMinorChange(-1)}
                        style={{
                          border: "none",
                          background: minors === 0 ? "#D9D9D9" : "#F77A40",
                          width: "20px",
                          height: "20px",
                          color: "white",
                          borderRadius: "5px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        -
                      </button>
                    </div>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "600",
                        fontFamily: "Montserrat",
                      }}
                    >
                      {minors * minorCost}$
                    </span>
                  </div>
                </div>
              </div>
            </form>
            <div>
              <h2
                style={{
                  color: "#F77A40",
                  fontSize: "64px",
                  fontWeight: "600",
                  textAlign: "center",
                  marginTop: "2rem",
                }}
              >
                {getTotalCost()}$
              </h2>
              <p
                style={{
                  color: "#000",
                  fontSize: "24px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                include fees
              </p>
              <button
                style={{
                  backgroundColor: "#F77A40",
                  color: "#fff",
                  fontSize: "20px",
                  fontWeight: "500",
                  padding: "10px 50px",
                  borderRadius: "8px",
                  border: "none",
                  outline: "none",
                  display: "block",
                  margin: "auto",
                }}
                onClick={() => {
                  setShow2(false);
                  setShow3(true);
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
