import { Link, Outlet } from "react-router-dom";
import locationIcon from "../../assets/location-icon.svg";
import hoteldet from "../../assets/hotrldetals.svg";
import more from "../../assets/infomore.svg";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HotelsContext from "../../context/HotelsContext";
import "./HotelDetails.css";
import Header from "../../Components/Header/Header";
import Calendar from "../../Components/Calendar/Calendar";
// translation
import t from "../../Translation/translation";
import useLanguage from "../../context/useLanguage";

function HotelDetails() {
  // translation
  const { language } = useLanguage();
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

  console.log(hotels);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa-solid fa-star mx-1 ${i <= rating ? "text-warning" : "text-secondary"
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
      {location.hash.slice(2, location.hash.length - 2) === "hotels" && (
        <div>
          <div className="header position-relative">
            <div className="position-absolute start-0 end-0 top-0">
              <Header />
            </div>

            <div
              className="imgs d-flex gap-2 justify-content-between align-items-end px-5 py-3"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "80vh",
                width: "100%",
              }}
            >
              <div className="d-flex gap-2 position-relative">
                {hotel?.images.map((img, index) => {
                  return (
                    <img
                      key={index}
                      src={img.url}
                      alt="image1"
                      height={"75px"}
                      width={"90px"}
                      onClick={() => setBackgroundImage(img.url)}
                      style={{
                        cursor: "pointer",
                        borderRadius: "10px",
                        border:
                          backgroundImage === img.url
                            ? "2px solid #fff"
                            : "none",
                        padding: backgroundImage === img.url ? "2px" : "none",
                      }}
                    />
                  );
                })}
              </div>
              <div
                style={{
                  position: "relative",
                  zIndex: "1",
                }}
              >
                {hotel?.images.map((img, index) => {
                  return (
                    <span
                      key={index}
                      style={{
                        display: "inline-block",
                        width: "23px",
                        height: "8px",
                        backgroundColor: "#fff",
                        opacity: backgroundImage === img.url ? "1" : "0.5",
                        borderRadius: "5px",
                        margin: "0 3px",
                        cursor: "pointer",
                      }}
                      onClick={() => setBackgroundImage(img.url)}
                    ></span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="carddetails">
            <div className="container-fluid mt-4 pt-4">
              <div className="d-flex flex-wrap justify-content-center px-2">
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
                        <h1 className="card-title-details fw-bold">
                          {hotel.name}
                        </h1>
                        <div className="rating d-flex fw-bold fs-6 gap-1 align-items-center">
                          {renderStars(hotel.rating)}
                          {hotel.rating} ({hotel.number_of_ratings})
                        </div>
                      </div>
                      <p style={{ color: "#6B7A85" }}>
                        <img
                          src={locationIcon}
                          className="px-1"
                          alt="location"
                        />
                        {hotel.location}
                      </p>
                      <div className="d-flex">
                        <p style={{ color: "#6B7A85" }}>{t[language].Services} : </p>
                        <p className="card-text-price">
                          {hotel.services.map((s, i) =>
                            i === hotel.services.length - 1 ? s : s + " - "
                          )}
                        </p>
                      </div>
                      <div className="d-flex one ">
                        <p style={{ color: "#6B7A85" }}>{t[language].TicketPrice} : </p>
                        <p className="card-text-price mb-4">
                          {hotel.ticket_price} {t[language].DH}
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
                          {t[language].aboutThisHotel}
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
                <Calendar />
              </div>

              {discoveredHotels.length > 0 && <p
                className=""
                style={{
                  color: "#42A7C3",
                  fontSize: "20px",
                  fontWeight: "600",
                  margin: "1rem 0 ",
                }}
              >
                {t[language].discoverMoreHotels}
              </p>}

              <div className="d-flex gap-2 mb-3">
                {discoveredHotels.slice(0, 4).map((hotel) => (
                  <div className="col-md-2 pt-4 border rounded" key={hotel.id}>
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
                            {hotel.ticket_price} HD
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
      )}
      <Outlet />
    </div>
  );
}

export default HotelDetails;
