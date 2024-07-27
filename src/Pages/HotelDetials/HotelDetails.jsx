import { Link } from "react-router-dom";
import locationIcon from "../../assets/location-icon.svg";
import hoteldet from "../../assets/hotrldetals.svg";
import more from "../../assets/infomore.svg";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HotelsContext from "../../context/HotelsContext";
import "./HotelDetails.css";
import Header from "../../Components/Header/Header";
import Calendar from "../../Components/Calendar/Calendar";

function HotelDetails() {
  const { hotelId } = useParams();
  const { hotels } = useContext(HotelsContext);
  const hotel = hotels.find((hotel) => hotel.id === parseInt(hotelId));
  console.log(hotel);
  const [discoveredHotels, setDiscoveredHotels] = useState([]);

  const [backgroundImage, setBackgroundImage] = useState();
  useEffect(() => {
    window.scroll(0, 0);
    if (hotel) {
      setBackgroundImage(hotel.images[0].url);
      setDiscoveredHotels(hotels.filter((h) => h.id !== hotel.id));
    }
  }, [hotel, hotels]);

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

  if (!hotel) {
    return (
      <div className="bg-orange">
        <Header />
        <h2 className="my-5 text-center py-3 fw-bold text-uppercase">
          Hotel not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="hotel-detials">
      <div className="header position-relative">
        <div className="position-absolute start-0 end-0 top-0">
          <Header />
        </div>

        <div
          className="imgs d-flex gap-2 justify-content-start align-items-end p-3"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "80vh",
            width: "100%",
          }}
        >
          {hotel?.images.map((img, index) => {
            return (
              <img
                key={index}
                src={img.url}
                alt="image1"
                height={"75px"}
                width={"90px"}
                className="rounded active"
                onClick={() => setBackgroundImage(img.url)}
                style={{
                  cursor: "pointer",
                  border:
                    backgroundImage === img.url ? "2px solid #fff" : "none",
                  padding: backgroundImage === img.url ? "2px" : "none",
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="carddetails">
        <div className="container mt-4 pt-4">
          <div className="d-flex gap-4">
            <div className="card-body-details">
              {hotel ? (
                <>
                  <div
                    className="d-flex"
                    style={{
                      justifyContent: "space-between",
                      margin: "0 15px 0 0",
                    }}
                  >
                    <h1 className="card-title-details fw-bold">{hotel.name}</h1>
                    <div className="rating d-flex fw-bold fs-6 gap-1 align-items-center">
                      {renderStars(hotel.rating)}
                      {hotel.rating} ({hotel.number_of_ratings})
                    </div>
                  </div>
                  <p style={{ color: "#6B7A85" }}>
                    <img src={locationIcon} className="px-1" alt="location" />
                    {hotel.location}
                  </p>
                  <div className="d-flex">
                    <p style={{ color: "#6B7A85" }}>Services: </p>
                    <p className="card-text-price">
                      {hotel.services.map((s, i) =>
                        i === hotel.services.length - 1 ? s : s + " - "
                      )}
                    </p>
                  </div>
                  <div className="d-flex one ">
                    <p style={{ color: "#6B7A85" }}>Ticket Price: </p>
                    <p className="card-text-price mb-4">
                      {hotel.ticket_price_from} HD - {hotel.ticket_price_to} HD
                    </p>
                  </div>
                  <span
                    style={{
                      display: "block",
                      width: "40%",
                      height: "1px",
                      backgroundColor: "#E5E5E5",
                      margin: "20px 0",
                    }}
                  ></span>

                  <div className="d-flex">
                    <h3 className="mb-4" style={{ fontWeight: "600" }}>
                      About this travel
                    </h3>
                    <img
                      src={hoteldet}
                      style={{ marginBottom: "20px", marginLeft: "5px" }}
                      alt="location"
                    />
                  </div>

                  <p
                    className="card-text-details"
                    style={{
                      color: "#33312C",
                      opacity: "0.7",
                    }}
                  >
                    {hotel.description}
                  </p>
                  <span
                    style={{
                      display: "block",
                      width: "40%",
                      height: "1px",
                      backgroundColor: "#E5E5E5",
                      margin: "20px 0",
                    }}
                  ></span>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <Calendar/>
          </div>

          <p
            className=""
            style={{
              color: "#42A7C3",
              fontSize: "20px",
              fontWeight: "600",
              margin: "1rem 0 ",
            }}
          >
            Discover more hotels
          </p>

          <div className="d-flex gap-3">
            {discoveredHotels.slice(0, 4).map((hotel) => (
              <div className="col-md-2 pt-4" key={hotel.id}>
                <div className="box bg-white rounded ">
                  <div className="text px-2">
                    <div className="align-items-center">
                      <h4 style={{ fontWeight: "600" }}>
                        <a>{hotel.name}</a>
                      </h4>
                      <p
                        style={{
                          color: "#8A8A8A",
                          fontSize: "16px",
                          fontWeight: "700",
                          marginBottom: "20px",
                        }}
                      >
                        {hotel.ticket_price_from} HD - {hotel.ticket_price_to}{" "}
                        HD
                      </p>

                      <Link
                        className="d-flex text-decoration-none"
                        to={`/hotels/${hotel.id}`}
                      >
                        <p
                          className="mb-4"
                          style={{
                            fontWeight: "600",
                            color: "#F77A40",
                            borderBottom: "1px solid #F77A40",
                            fontSize: "14px",
                          }}
                        >
                          more info
                        </p>
                        <img
                          src={more}
                          style={{
                            marginBottom: "24px",
                            marginLeft: "0px",
                            borderBottom: "1px solid #F77A40",
                          }}
                          alt="location"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;
