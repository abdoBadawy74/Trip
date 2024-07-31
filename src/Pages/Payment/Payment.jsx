import React, { useContext, useState, useEffect } from "react";
import Calendar from "./../../Components/Calendar/Calendar";
import SelectedRangeContext from "../../context/SelectedRange";
import Header from "../../Components/Header/Header";
import { format, parseISO, set } from "date-fns";
import PhoneInput from "react-phone-number-input";
import "./Payment.css";
import axios from "axios";
import { BASE } from "./../../API/Api";
import img from "../../assets/recipt.jpg";
import { useNavigate, useParams } from "react-router-dom";
import reviewIcon from "../../assets/Receipt.svg";
import successIcon from "../../assets/Success.svg";

export default function Payment() {
  const { travelId, hotelId } = useParams();
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const { selectedRange, setSelectedRange } = useContext(SelectedRangeContext);
  const [startDay, setStartDay] = useState("");
  const [startMonthYear, setStartMonthYear] = useState("");
  const [endDay, setEndDay] = useState("");
  const [endMonthYear, setEndMonthYear] = useState("");
  const [adults, setAdults] = useState(0);
  const [minors, setMinors] = useState(0);

  const [adultCost, setAdultCost] = useState(0);
  const [minorCost, setMinorCost] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [promoCode, setPromoCode] = useState("");
  const [isValidPromo, setIsValidPromo] = useState(false);
  const [promoId, setPromoId] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [status, setStatus] = useState(false);

  console.log(selectedRange);

  //  navigaet to previous page if reload the page
  const navigate = useNavigate();
  useEffect(() => {
    if (!selectedRange.start) {
      navigate(-1);
    }
  });

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (value) => setPhone(value);
  const handlePromoCodeChange = (e) => setPromoCode(e.target.value);

  //   get price for age categories
  useEffect(() => {
    axios.get(`${BASE}/booking-age-categories`).then((res) => {
      //   console.log(res.data);
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

  //   get payment methods
  useEffect(() => {
    axios
      .get(`${BASE}/payment-types`)
      .then((res) => {
        setPaymentMethods(res.data);
        console.log(res.data);
        setSelectedPaymentMethod(res.data[0].name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Handler for selecting a payment method
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
    setPaymentId(
      paymentMethods.find((method) => method.name === event.target.value).id
    );
    console.log(paymentId);
  };

  //   apply promo code
  const applyPromoCode = async () => {
    if (window.location.href.includes("/travels/")) {
      axios
        .post(`${BASE}/trips/validate-promo`, {
          code: promoCode,
          trip_id: travelId,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            setIsValidPromo(true);
            setDiscount(res.data.promo_code.discount);
            setPromoId(res.data.promo_code.id);
          }
        });
    }
  };

  //   Handling Payment Gateway Logic
  useEffect(() => {
    if (selectedPaymentMethod === "online") {
      console.log("Using payment gateway...");
      // Implement the logic to handle payment gateway
    }
  }, [selectedPaymentMethod]);

  const submitBookingData = async () => {
    const formData = new FormData();

    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("total_amount", getTotalCost());
    formData.append("payment_type_id", paymentId);
    formData.append("payment_method", selectedPaymentMethod);
    formData.append("payment_status", "pending");
    isValidPromo ? formData.append("promo_code_id", promoId) : "";
    formData.append("receipt", uploadedFile); // Ensure uploadedFile is a File object
    formData.append("booking_date", selectedRange.start);
    formData.append("trip_id", travelId);

    const peopleNumbers = [
      { people_category_id: 1, number_of_people: adults },
      { people_category_id: 2, number_of_people: minors },
    ];

    peopleNumbers.forEach((person, index) => {
      formData.append(
        `people_numbers[${index}][people_category_id]`,
        person.people_category_id
      );
      formData.append(
        `people_numbers[${index}][number_of_people]`,
        person.number_of_people
      );
    });

    try {
      if (window.location.href.includes("/travels/")) {
        // Post to trip booking API
        const response = await axios.post(`${BASE}/trips/booking`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response);
        setStatus(response.status);
      } else if (window.location.href.includes("/hotels/")) {
        // Post to hotel booking API
        formData.append("booking_date_from", selectedRange.start);
        formData.append("booking_date_until", selectedRange.end);
        formData.append("hotel_id", hotelId);

        const response = await axios.post(`${BASE}/hotels/booking`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response);
        setStatus(response.status);
      }
    } catch (error) {
      console.error("Error during booking submission:", error);
      // Optionally handle the error, e.g., show an error message to the user
    }
    if (status === 201) {
      setTimeout(() => {
        setShow4(true);
        setShow3(false);
      }, 2000);
    }
  };

  //   handle number of adults
  const handleAdultChange = (delta) => {
    setAdults((prev) => Math.max(0, prev + delta));
  };

  //   handle number of minors
  const handleMinorChange = (delta) => {
    setMinors((prev) => Math.max(0, prev + delta));
  };

  //   get total cost
  const getTotalCost = () => {
    return adults * adultCost + minors * minorCost;
  };

  //   update the selected range to show it in the payment page
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

  //   function to copy text to clipboard

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log(`Copied: ${text}`);
        // Optionally, you can show a toast or alert to indicate that the text has been copied
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  //   handle file upload and preview

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Corrected to access the first file selected
    setUploadedFile(file);
    console.log(uploadedFile);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //   handle error msg for required fields
  const handleErrors = () => {
    if (!firstName || !lastName || !email || !phone || adults <= 0) {
      console.log("handleErrors called");
      let toastBox = document.querySelector("#toastBox");
      if (!toastBox) {
        console.error("#toastBox not found in DOM.");
        return;
      }
      let errorMsg =
        '<i class="fas fa-times-circle"></i> Please fill all required fields';
      let toast = document.createElement("div");
      toast.classList.add("toast");
      toast.innerHTML = errorMsg;
      toastBox.appendChild(toast);
      console.log("Error message appended to #toastBox");

      setTimeout(() => {
        toast.remove();
        console.log("Toast removed");
      }, 3000);
    }
  };

  //   toast for Promo code

  function promoCodeToast() {
    if (isValidPromo) {
      let toastBox = document.querySelector("#toastBox");
      if (!toastBox) {
        console.error("#toastBox not found in DOM.");
        return;
      }
      let errorMsg =
        '<i class="fas fa-check-circle"></i> Promo code applied successfully';
      let toast = document.createElement("div");
      toast.classList.add("toast", "success");
      toast.innerHTML = errorMsg;
      toastBox.appendChild(toast);
      console.log("Success message appended to #toastBox");

      setTimeout(() => {
        toast.remove();
        console.log("Toast removed");
      }, 3000);
    } else {
      let toastBox = document.querySelector("#toastBox");
      if (!toastBox) {
        console.error("#toastBox not found in DOM.");
        return;
      }
      let errorMsg =
        '<i class="fas fa-times-circle"></i> Promo code is not valid';
      let toast = document.createElement("div");
      toast.classList.add("toast");
      toast.innerHTML = errorMsg;
      toastBox.appendChild(toast);
      console.log("Error message appended to #toastBox");

      setTimeout(() => {
        toast.remove();
        console.log("Toast removed");
      }, 3000);
    }
  }

  return (
    <div className="payment">
      <div id="toastBox"></div>
      <div className="bg-orange">
        <Header />
      </div>
      <div className="container py-4">
        <div
          className={`gap-1 align-items-md-center flex-column flex-md-row ${
            show4 ? "d-none" : "d-flex"
          }`}
        >
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
            <div className="col-12 col-md-8">
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
                    value={firstName}
                    onChange={handleFirstNameChange}
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
                    value={lastName}
                    onChange={handleLastNameChange}
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
                    value={email}
                    onChange={handleEmailChange}
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
                    className="mb-3 border-0 outline-0 p-2"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#F8F9F9",
                      width: "100%",
                    }}
                    value={phone}
                    onChange={handlePhoneChange}
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
            </div>
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
                  if (firstName && lastName && email && phone && adults > 0) {
                    setShow2(false);
                    setShow3(true);
                  } else handleErrors();
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {show3 && (
          <div className="method">
            <div className="d-flex gap-3 justify-content-center justify-content-md-start flex-wrap">
              <div className="d-flex flex-column col-12 col-md-3">
                <label
                  htmlFor="first-name"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "5px",
                  }}
                >
                  Payment
                </label>
                <select
                  id="payment-method"
                  value={selectedPaymentMethod}
                  onChange={handlePaymentMethodChange}
                  className="mb-3 border-0 outline-0 p-2"
                  style={{
                    borderRadius: "8px",
                    backgroundColor: "#F8F9F9",
                    width: "100%",
                  }}
                >
                  {paymentMethods.map((method) => (
                    <option key={method.id} value={method.name}>
                      {method.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="d-flex flex-column col-12 col-md-3">
                <label
                  htmlFor="first-name"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "5px",
                  }}
                >
                  Promo code
                </label>
                <div
                  className="border-0 outline-0 p-2 d-flex gap-3 px-2"
                  style={{
                    borderRadius: "8px",
                    backgroundColor: "#F8F9F9",
                    width: "100%",
                  }}
                >
                  <input
                    type="text"
                    className=" border-0 outline-0 bg-transparent  flex-grow-1"
                    onChange={handlePromoCodeChange}
                    value={promoCode}
                  />
                  <button
                    className="border-0 outline-0 text-white py-1 px-3 rounded"
                    style={{
                      backgroundColor: "#F77A40",
                    }}
                    onClick={() => {
                      applyPromoCode();
                      promoCodeToast();
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between flex-wrap">
              {selectedPaymentMethod === "Upload Receipt" && !previewSrc && (
                <div className="my-2 col-12 col-md-4">
                  <div className="d-flex flex-column position-relative my-3">
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        marginBottom: "5px",
                      }}
                    >
                      Account name
                    </span>
                    <span
                      style={{
                        color: "#8A8A8A",
                        fontSize: "16px",
                      }}
                      id="accountName"
                    >
                      Commercial international bank of egypt
                    </span>
                    <i
                      className="fa-regular fa-copy position-absolute end-0"
                      style={{
                        fontSize: "20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        copyToClipboard(
                          document.getElementById("accountName").textContent
                        )
                      }
                    ></i>
                  </div>

                  <div className="d-flex flex-column position-relative my-3">
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        marginBottom: "5px",
                      }}
                    >
                      Account number
                    </span>
                    <span
                      style={{
                        color: "#8A8A8A",
                        fontSize: "16px",
                      }}
                      id="accountNumber"
                    >
                      123456789023
                    </span>
                    <i
                      className="fa-regular fa-copy position-absolute end-0"
                      style={{
                        fontSize: "20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        copyToClipboard(
                          document.getElementById("accountNumber").textContent
                        )
                      }
                    ></i>
                  </div>

                  <div className="d-flex flex-column position-relative my-3">
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        marginBottom: "5px",
                      }}
                    >
                      Company name
                    </span>
                    <span
                      style={{
                        color: "#8A8A8A",
                        fontSize: "16px",
                      }}
                      id="companyName"
                    >
                      InfinityPlaces
                    </span>
                    <i
                      className="fa-regular fa-copy position-absolute end-0"
                      style={{
                        fontSize: "20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        copyToClipboard(
                          document.getElementById("companyName").textContent
                        )
                      }
                    ></i>
                  </div>

                  <div className="file">
                    <label htmlFor="receipt-img">
                      <img
                        src={img}
                        alt="receipt-img"
                        style={{
                          width: "360px",
                          borderRadius: "10px",
                        }}
                      />
                    </label>
                    <input
                      type="file"
                      //   accept="image/*"
                      hidden
                      id="receipt-img"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              )}

              {previewSrc && (
                <div className="d-flex gap-5 col-md-5 px-4 align-items-center">
                  <div className="d-flex flex-column justify-content-between">
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      reviewing the receipt info
                    </p>
                    <img src={reviewIcon} alt="reviewIcon" />
                    <button
                      className="d-block w-100 border-0 outline-0  btn bg-dark text-white"
                      style={{
                        padding: "10px 30px",
                      }}
                      onClick={() => {
                        setUploadedFile(null);
                        setPreviewSrc(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  <div>
                    <img
                      src={previewSrc}
                      alt="reciept"
                      style={{
                        width: "203px",
                        height: "300px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                </div>
              )}

              {selectedPaymentMethod === "Online" && (
                <div className="col-12 col-md-5">
                  <h1>Wait until Dealing with Payment Gateway..</h1>
                </div>
              )}

              <div className="col-12 col-md-4">
                <h4>Summary</h4>
                <div className="border-bottom mt-4 mx-1">
                  <div
                    className="d-flex justify-content-between my-2"
                    style={{ color: "#747688" }}
                  >
                    <span>Subtotal</span>
                    <span>{getTotalCost()} $</span>
                  </div>

                  <div
                    className="d-flex justify-content-between my-2"
                    style={{ color: "#747688" }}
                  >
                    <span>Fees</span>
                    <span>00 $</span>
                  </div>

                  <div
                    className="d-flex justify-content-between my-2"
                    style={{ color: "#747688" }}
                  >
                    <span>Discount</span>
                    <span>{discount} $</span>
                  </div>
                </div>
                <div className="total fw-bold d-flex justify-content-between pt-3">
                  <span>Total</span>
                  <span>
                    {discount ? getTotalCost() - discount : getTotalCost()}{" "}
                  </span>
                </div>
                {previewSrc && (
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
                      margin: "50px auto",
                      width: "100%",
                    }}
                    onClick={() => {
                      submitBookingData();
                    }}
                  >
                    pay
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {show4 && (
          <div className="d-flex justify-content-around p-4 align-items-center">
            <div className="d-flex flex-column align-items-center gap-3">
              <img src={successIcon} alt="successIcon" />
              <p
                style={{
                  fontSize: "32px",
                  color: "#1F1F1F",
                }}
              >
                Payment Success!
              </p>
            </div>
            <div className="col-12 col-md-5 ">
              <div className="d-flex justify-content-between align-items-center">
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "600",
                  }}
                >
                  <span
                    style={{
                      color: "#F77A40",
                      fontSize: "64px",
                    }}
                  >
                    {startDay} {endDay ? " - " + endDay : ""}
                  </span>{" "}
                  {startMonthYear} {endMonthYear ? " - " + endMonthYear : ""}
                </p>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "600",
                  }}
                >
                  <span
                    style={{
                      color: "#42A7C3",
                      fontSize: "64px",
                    }}
                  >
                    {adults + minors}
                  </span>{" "}
                  Tickets
                </p>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <p
                  style={{
                    color: "#A5A5A5",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  Name
                </p>
                <p
                  style={{
                    color: "#535355",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  {firstName} {lastName}
                </p>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <p
                  style={{
                    color: "#A5A5A5",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  Email
                </p>
                <p
                  style={{
                    color: "#535355",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  {email}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p
                  style={{
                    color: "#A5A5A5",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  Phone
                </p>
                <p
                  style={{
                    color: "#535355",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  {phone}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p
                  style={{
                    color: "#A5A5A5",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  Number of people
                </p>
                <p
                  style={{
                    color: "#535355",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  {adults} adults, {minors} minors
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p
                  style={{
                    color: "#A5A5A5",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  total price
                </p>
                <p
                  style={{
                    color: "#535355",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  {getTotalCost() - discount}$
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
