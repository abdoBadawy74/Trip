// import { Link } from "react-router-dom";

import address from "../../assets/address.svg";
import call from "../../assets/call.svg";
import mess from "../../assets/mess.svg";
import vila from "../../assets/vila.svg";
// import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

import "./Contact.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

function Contact() {
    return (

        <div className="contact-detials">
      <div className="contact position-relative">
      <div className="bg-orange">
            <Header />
          </div>
          <div className="container container-contact d-flex" style={{ }}>

          <div class="one  position-relative" style={{backgroundColor:" #42A7C3" , color:"white" ,padding:"2rem 2rem 0 2rem",margin:"2rem",borderRadius:"15px"}}>

<h3 style={{paddingBottom:"3.2rem"}}>Contact Information</h3> 

<div className="onetop" style={{paddingBottom:"3rem"}}>
<div class="one1 d-flex">
<img src={address} className="px-1" alt="address" style={{marginBottom:"20px",paddingRight:"5px"}}/>
<p style={{marginLeft:"10px"}}> Block !!!, part !!!!! St. !!!!. Nasr City, Cairo. Egypt  </p> 
</div>

<div class="one1 d-flex">
<img src={call} className="px-1" alt="call" style={{marginBottom:"20px",paddingRight:"5px"}}/>
<p style={{marginLeft:"10px"}}> +20 154154151515  </p> 
</div>

<div class="one1 d-flex">
<img src={mess} className="px-1" alt="mess" style={{marginBottom:"20px",paddingRight:"5px"}}/>
<p style={{marginLeft:"10px"}}> sherif@trip.com  </p> 
</div>
</div> 
 

<div style={{marginBottom:"-150px"}}>
    
        <img  src={vila} className="px-1 imagesvila" alt="address" />

<div className="onebottom">
<i class="fa-brands fa-twitter"></i>
<i class="fa-brands fa-instagram"></i>
<i class="fa-brands fa-discord"></i>
</div>
</div>


</div>
         
         
         
<form id="registerForm" class="flex  m-5 position-relative ">

    <div class="name d-flex">
        <div className="d-flex pb" style={{flexDirection:"column"}}>
        <label className="namelabel"> FirstName</label>
    <input type="text" id="username" name="username" class="firstname " required=""/></div>
      
    <div className="d-flex pb" style={{flexDirection:"column"}}>
    <label className="namelabel"> LastName</label>
      <input type="text" id="username" name="username"  className="lastname" required=""/>
      </div>
</div>
    
<div class="name d-flex ">
        <div className="d-flex pb" style={{flexDirection:"column"}}>
        <label className="namelabel"> Email</label>
    <input type="email" id="emil" name="emil" class="firstname " required=""/></div>
      
    <div className="d-flex pb" style={{flexDirection:"column"}}>
    <label className="namelabel"> Phone Number</label>
      <input type="tel" id="tel" name="tel"  className="lastname" required=""/>
      </div>
</div>
    

<div>

<div className="d-flex" style={{flexDirection:"column"}}>
<label className="namelabel"> Message</label>
        <textarea id="message" name="message" rows="1" placeholder="Write your message.." class="message" required=""></textarea>
   </div>

        <button type="submit" class="sub m-4 ">Send Message</button> 
    
        </div>

</form>
         
         
         
         
         
          </div>
        </div>
        <Footer/>
        </div>

    )
    
}
export default Contact;