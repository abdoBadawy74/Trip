import address from "../../assets/address.svg";
import call from "../../assets/call.svg";
import mess from "../../assets/mess.svg";
import vila from "../../assets/vila.svg";

// import "./Contact.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
// translation
import t from "../../Translation/translation";
import useLanguage from "../../context/useLanguage";
import { useState } from "react";
import axios from "axios";
import { BASE } from "../../API/Api";
import { toast, ToastContainer } from "react-toastify";


function FeedBack() {
  // translation
  const { language } = useLanguage();

return (
<>
<div className="bg-orange">
    <Header/>

    <div className="container"></div>
        
                            




</div>
</>)
}
export default FeedBack;
