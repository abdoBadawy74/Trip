import { useContext, useState, useEffect } from "react";
import Calendar from "./../../Components/Calendar/Calendar";
import SelectedRangeContext from "../../context/SelectedRange";
import Header from "../../Components/Header/Header";
import { format, parseISO } from "date-fns";
import PhoneInput from "react-phone-number-input";
import "./Payment.css";
import axios from "axios";
import { BASE } from "./../../API/Api";
import img from "../../assets/recipt.jpg";
import { useNavigate, useParams } from "react-router-dom";
import reviewIcon from "../../assets/Receipt.svg";
import successIcon from "../../assets/Success.svg";
// translation
import t from "../../Translation/translation";
import useLanguage from "../../context/useLanguage";
import { toast } from "react-toastify";

export default function Payment() {
  // translation
  const { language } = useLanguage();
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
  const [adults, setAdults] = useState(1);
  const [minors, setMinors] = useState(0);
  const [children, setChildren] = useState(0);

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

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
        setSelectedPaymentMethod(res.data[1].name);
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
      { people_category_id: 3, number_of_people: children },
    ];

    formData.append("people_numbers", JSON.stringify(peopleNumbers));

    console.log("form data entries:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      setLoading(true); // Show loading overlay
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Delay for 3 seconds

      if (window.location.href.includes("/travels/")) {

        console.log("form data", formData);
        // Post to trip booking API
        const response = await axios.post(`${BASE}/trips/booking`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response);
        if (response.status === 201) {
          setShow4(true);
          setShow3(false);
        } else {
          // If response is not 201, show an error toast
          toast.error(t[language].toastMsg);
        }
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

        console.log("form hotels", response);
        if (response.status === 201) {
          setShow4(true);
          setShow3(false);
        } else {
          // If response is not 201, show an error toast
          toast.error(t[language].toastMsg);
        }
      }
    } catch (error) {
      console.error("Error during booking submission:", error);
      toast.error(t[language].toastMsg);
    } finally {
      setLoading(false); // Hide loading overlay
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
  const handleChildChange = (delta) => {
    setChildren((prev) => Math.max(0, prev + delta));
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
    if (!selectedRange.end) {
      setSelectedRange({ ...selectedRange, end: selectedRange.start });
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
      toast.error(language === "en" ? "Please fill all required fields" : language === "ar" ? "يرجى ملء جميع الحقول المطلوبة" : "Veuillez remplir tous les champs obligatoires");
    }
  };

  //   toast for Promo code
  function promoCodeToast() {
    if (isValidPromo) {
      toast.success(language === "en" ? "Promo code is valid" : language === "ar" ? "الرمز الترويجي صالح" : "Le code promo est valide");
    } else {
      toast.error(language === "en" ? "Promo code is invalid" : language === "ar" ? "الرمز الترويجي غير صالح" : "Le code promo n'est pas valide");
    }
  }

  useEffect(() => {
    return () => {
      // Clear selectedRange when the component unmounts
      setSelectedRange(null);
    };
  }, [setSelectedRange]);


  return (
    <div className="payment">
      {loading && (
        <div className="overlay">
          <div className="spinner"></div>
          <p>{t[language].Loading}</p>
        </div>
      )}

      <div id="toastBox"></div>
      <div className="bg-orange">
        <Header />
      </div>
      <div className="container py-4">
        <div
          className={`gap-1 align-items-md-center flex-column flex-md-row ${show4 ? "d-none" : "d-flex"
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
              {t[language].Date_Time}
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
              {t[language].RequiredInformation}
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
              {t[language].paymentMethod}
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
                {t[language].next}
              </button>
            </div>
          </div>
        )}

        {show2 && (
          <div className="form my-4 d-flex px-5 flex-wrap gap-5 justify-content-center">
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
                    {t[language].F_name}
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
                    {t[language].L_name}
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
                    {t[language].Email}
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
                    {t[language].Phone}
                  </label>
                  <PhoneInput
                    placeholder={"Enter Phone Number"}
                    defaultCountry="IT" // Set the default country code
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
                    {t[language].NoPeople}
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
                      {t[language].adults}
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
                    {t[language].children}
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
                      {t[language].minor}
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
                <div className="d-flex flex-column col-12 col-md-4">
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      marginBottom: "5px",
                      color: "#42A7C3",
                    }}
                  >
                    {t[language].children2}
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
                      {t[language].child}
                    </span>
                    <div className="d-flex align-items-center ">
                      <button
                        onClick={() => handleChildChange(1)}
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
                        value={children}
                        readOnly
                        style={{
                          width: "50px",
                          textAlign: "center",
                          border: "none",
                          background: "transparent",
                        }}
                      />

                      <button
                        onClick={() => handleChildChange(-1)}
                        style={{
                          border: "none",
                          background: children === 0 ? "#D9D9D9" : "#F77A40",
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
                      0$
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
                {t[language].includeFees}
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
                {t[language].next}
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
                  {t[language].Payment}
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
                  {t[language].promo}
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
                    {t[language].apply}
                  </button>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between flex-wrap gap-3">
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
                      {t[language].accountName}
                    </span>
                    <span
                      style={{
                        color: "#8A8A8A",
                        fontSize: "16px",
                      }}
                      id="accountName"
                    >
                      {t[language].bankName}
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
                      {t[language].accountNumber}
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
                      {t[language].companyName}
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

                  <div className="file text-center">
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

              {previewSrc && selectedPaymentMethod !== "Online" && (
                <div className="d-flex gap-5 col-md-5 px-4 align-items-center  justify-content-center flex-row-reverse flex-md-row flex-wrap">
                  <div className="d-flex flex-column justify-content-between">
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      {t[language].review}
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
                      {t[language].delete}
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
                <h4>{t[language].summary}</h4>
                <div className="border-bottom mt-4 mx-1">
                  <div
                    className="d-flex justify-content-between my-2"
                    style={{ color: "#747688" }}
                  >
                    <span>{t[language].Subtotal}</span>
                    <span>{getTotalCost()} $</span>
                  </div>

                  <div
                    className="d-flex justify-content-between my-2"
                    style={{ color: "#747688" }}
                  >
                    <span>{t[language].fees}</span>
                    <span>00 $</span>
                  </div>

                  <div
                    className="d-flex justify-content-between my-2"
                    style={{ color: "#747688" }}
                  >
                    <span>{t[language].discount}</span>
                    <span>{discount} $</span>
                  </div>
                </div>
                <div className="total fw-bold d-flex justify-content-between pt-3">
                  <span>{t[language].total}</span>
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
                    {t[language].done}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {show4 && (
          <div>
            <div className="d-flex justify-content-around p-4 align-items-center flex-wrap">
              <div className="d-flex flex-column align-items-center gap-3">
                <img src={successIcon} alt="successIcon" />
                <p
                  style={{
                    fontSize: "32px",
                    color: "#1F1F1F",
                  }}
                >
                  {t[language].success}
                </p>
              </div>
              <div className="col-12 col-md-5 ">
                <div className="d-flex justify-content-between align-items-center">
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      textAlign: "center",
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
                    <br />
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
                    {t[language].Tickets}
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
                    {t[language].name}
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
                    {t[language].Email}
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
                    {t[language].Phone}
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
                    {t[language].NoPeople}
                  </p>
                  <p
                    style={{
                      color: "#535355",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                  >
                    {adults} {t[language].adults}, {minors} {t[language].minor}, {children} {t[language].child}
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
                    {t[language].totalPrice}
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

            {window.location.href.includes("/travels/") && (
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
                  navigate("/travels");
                }}
              >
                {t[language].done}
              </button>
            )}


            {window.location.href.includes("/hotels/") && (
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
                  navigate("/hotels");
                }}
              >
                {t[language].done}
              </button>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
