import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { BASE } from "/src/API/Api.js";
import axios from "axios";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import img1 from "../../assets/hoteldetail1.png";
import img2 from "../../assets/hoteldetail2.png";
import img3 from "../../assets/hoteldetail3.png";
import img4 from "../../assets/hoteldetail4.png";
import locationIcon from "../../assets/location-icon.svg";
import hoteldet from "../../assets/hotrldetals.svg";
import Ifomore from "../../assets/infomore.svg";
import "./HotelDetails.css";
import { Link } from "react-router-dom";

function HotelDetails() {
  const { hotelId } = useParams();
  const [product, setProduct] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(img1);
  const [activeImage, setActiveImage] = useState(img1);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE}/hotels`)
      .then((res) => {
        const hotel = res.data.data.find(hotel => hotel.id === parseInt(hotelId));
        if (hotel) {
          setProduct(hotel);
        } else {
          console.log("Hotel not found");
        }
        setHotels(res.data.data);
      })
      .catch((err) => {
        console.log("Error fetching hotel data:", err);
      });
  }, [hotelId]);

  const handleImageClick = (imgSrc) => {
    console.log(imgSrc);  
    setBackgroundImage(imgSrc);
    setActiveImage(imgSrc);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa-solid fa-star mx-1 ${
            i <= rating ? "text-warning" : "text-secondary"
          }`}
        ></i>
      );
    }
    return stars;
  };

  return (
    <div className="HotelDetails">
      <div
        className="landing-section position-relative w-100"
        style={{
          height: "100vh",
          overflow: "hidden",
          background: `url(${backgroundImage}) no-repeat center center/cover`
        }}
      >
        <Header />

        <div className="images position-absolute bottom-0 w-100 d-flex mb-4">
          <img
            className={activeImage === img1 ? "active" : ""}
            src={img1}
           
            onClick={() => handleImageClick(img1)}
            style={{
              cursor: "pointer",
              objectFit: "cover",
              margin: "0 15px"
            }}
          />
          <img
            className={activeImage === img2 ? "active" : ""}
            src={img2}
          
            onClick={() => handleImageClick(img2)}
            style={{
              cursor: "pointer",
              objectFit: "cover",
              margin: "0 15px"
            }}
          />
          <img
            className={activeImage === img3 ? "active" : ""}
            src={img3}
        
            onClick={() => handleImageClick(img3)}
            style={{
              cursor: "pointer",
              objectFit: "cover",
              margin: "0 15px"
            }}
          />
          <img
            className={activeImage === img4 ? "active" : ""}
            src={img4}
          
            onClick={() => handleImageClick(img4)}
            style={{
              cursor: "pointer",
              objectFit: "cover",
              margin: "0 15px"
            }} />
        </div>
      </div>

      <div className="carddetails">
        <div className="container mt-4 pt-4">
          <div className="d-flex all">
            <div className="card-body-details">
              {product ? (
                <>
                  <div className="d-flex" style={{ justifyContent: "space-between", margin: "0 15px 0 0" }}>
                    <h1 className="card-title-details fw-bold">{product.name}</h1>
                    <div className="rating d-flex fw-bold fs-6 gap-1 align-items-center">
                      {renderStars(product.rating)}
                      {product.rating} ({product.number_of_ratings})
                    </div>
                  </div>
                  <p style={{ color: "#6B7A85" }}>
                    <img src={locationIcon} className="px-1" alt="location" />
                    {product.location}
                  </p>
                  <div className="d-flex">
                    <p style={{ color: "#6B7A85" }}>
                      Services: </p>
                    <p className="card-text-price">{product.services[0]}- {product.services[1]}</p>
                  </div>
                  <div className="d-flex one ">
                    <p style={{ color: "#6B7A85" }}>
                      Ticket Price: </p>
                    <p className="card-text-price mb-4">{product.ticket_price_from} HD - {product.ticket_price_to} HD</p>
                  </div>

                  <div className="d-flex">
                    <h3 className="mb-4" style={{ fontWeight: "600" }}>About this travel </h3>
                    <img src={hoteldet} style={{ marginBottom: "20px", marginLeft: "5px" }} alt="location" />
                  </div>

                  <p className="card-text-details">{product.description}</p>
                  <div className="one "> </div>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <p> calender</p>
          </div>

          <p className="" style={{ color: "#42A7C3", margin: "1rem 0 " }}> Discover more hotels </p>

          <div className="d-flex all">
            {hotels.slice(0, 4).map((hotel) => (
              <div className="col-md-2 pt-4" key={hotel.id}>
                <div className="box bg-white rounded ">
                  <div className="text px-2">
                    <div className="align-items-center">
                      <h4 style={{  fontWeight: "700" }}>
                        <a>{hotel.name}</a>
                      </h4>
                      <p style={{ color: "#8A8A8A", fontSize: "12px", fontWeight: "600", marginBottom: "20px" }}>
                        {hotel.ticket_price_from} HD - {hotel.ticket_price_to} HD
                      </p>

                      <Link className="d-flex" to={`/hotels/${hotel.id}`}>
                        <p className="mb-4" style={{ fontWeight: "600", color: "#F77A40", borderBottom: "1px solid #F77A40", fontSize: "14px" }}>
                          more info
                        </p>
                        <img src={Ifomore} style={{ marginBottom: "24px", marginLeft: "0px", borderBottom: "1px solid #F77A40" }} alt="location" />
                      </Link>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HotelDetails;
