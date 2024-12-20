import address from "../../assets/address.svg";
import call from "../../assets/call.svg";
import mess from "../../assets/mess.svg";
import vila from "../../assets/vila.svg";

import "./Contact.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
// translation
import t from "../../Translation/translation";
import useLanguage from "../../context/useLanguage";
import { useState } from "react";
import axios from "axios";
import { BASE } from "../../API/Api";
import { toast, ToastContainer } from "react-toastify";

function Contact() {
  // translation
  const { language } = useLanguage();

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Check for empty fields
    const { first_name, last_name, email, phone, message } = data;

    if (!first_name || !last_name || !email || !phone || !message) {
      toast.error("Please fill in all fields.");
      return; // Exit the function if validation fails
    }

    try {
      const res = await axios.post(`${BASE}/contact`, data);
      console.log(res)
      if (res.status === 201) {
        toast.success(language === "en" ? "Message sent successfully." : language === "ar" ? "تم إرسال الرسالة بنجاح." : "Messaggio inviato con successo.");
        // Reset form only if the request is successful
        setData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error(language === "en" ? "Failed to send message." : language === "ar" ? "فشل في إرسال الرسالة." : "Impossibile inviare il messaggio.");
    }
  }

  return (
    <div className="contact-detials">
      <div className="contact position-relative">
        <ToastContainer />
        <div className="bg-orange">
          <Header />
        </div>
        <div
          className="container container-contact d-flex flex-wrap justify-content-center"
          style={{}}
        >
          <div
            className="one  position-relative"
            style={{
              backgroundColor: " #42A7C3",
              color: "white",
              padding: "2rem 2rem 0 2rem",
              margin: "2rem",
              borderRadius: "15px",
            }}
          >
            <h3 style={{ paddingBottom: "3.2rem" }}>
              {t[language].contactInformation}
            </h3>

            <div className="onetop" style={{ paddingBottom: "3rem" }}>
              <div className="one1 d-flex">
                <img
                  src={address}
                  className="px-1"
                  alt="address"
                  style={{ marginBottom: "20px", paddingRight: "5px" }}
                />
                <p style={{ marginLeft: "10px" }}>
                  {" "}
                  Block !!!, part !!!!! St. !!!!. Nasr City, Cairo. Egypt{" "}
                </p>
              </div>

              <div className="one1 d-flex">
                <img
                  src={call}
                  className="px-1"
                  alt="call"
                  style={{ marginBottom: "20px", paddingRight: "5px" }}
                />
                <p style={{ marginLeft: "10px" }}> +20 154154151515 </p>
              </div>

              <div className="one1 d-flex">
                <img
                  src={mess}
                  className="px-1"
                  alt="mess"
                  style={{ marginBottom: "20px", paddingRight: "5px" }}
                />
                <p style={{ marginLeft: "10px" }}> sherif@trip.com </p>
              </div>
            </div>

            <div style={{ marginBottom: "-150px" }}>
              <img src={vila} className="px-1 imagesvila" alt="address" />

              <div className="onebottom">
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-discord"></i>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} id="registerForm" className="flex m-5 position-relative ">
            <div className="name d-flex">
              <div className="d-flex pb" style={{ flexDirection: "column" }}>
                <label className="namelabel"> {t[language].F_name}</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="firstname "
                  value={data.first_name}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex pb" style={{ flexDirection: "column" }}>
                <label className="namelabel"> {t[language].L_name}</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="lastname"
                  value={data.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="name d-flex ">
              <div className="d-flex pb" style={{ flexDirection: "column" }}>
                <label className="namelabel"> {t[language].Email}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="firstname "
                  value={data.email}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex pb" style={{ flexDirection: "column" }}>
                <label className="namelabel">{t[language].Phone}</label>
                <input
                  type="tel"
                  id="tel"
                  name="phone"
                  className="lastname"
                  value={data.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="d-flex" style={{ flexDirection: "column" }}>
                <label className="namelabel"> {t[language].Message}</label>
                <textarea
                  id="message"
                  name="message"
                  rows="1"
                  placeholder={t[language].write}
                  className="message"
                  value={data.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="sub m-4 ">
                {t[language].send}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Contact;
