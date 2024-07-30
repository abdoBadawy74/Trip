// import { Link } from "react-router-dom";



import "./About.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import aboutlabel from "../../assets/aboutlabel.svg";
function About() {
    return (

        <div className="about-detials">
      <div className="about position-relative " >
      <div className="bg-orange">
            <Header />
          </div>
    <div className="container"> 
    
    <div>
      
     
    <div class="one1 d-flex">
<img src={aboutlabel} className="px-1" alt="aboutlabel" style={{marginBottom:"20px",paddingRight:"5px"}}/>
<p style={{marginLeft:"10px", fontSize:"20px",lineHeight:"37px", color:"#42A7C3"}}> About Us  </p> 
</div>
     




    </div>

    <h2>Our Company Overview</h2>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
       Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy
        text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever 
        since the 1500s,</p>
        </div>
        </div>
        <Footer/>
        </div>

    )
    
}
export default About;