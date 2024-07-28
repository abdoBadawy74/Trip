import { Link } from "react-router-dom";
import tripdet from "../../assets/hotrldetals.svg";
import more from "../../assets/infomore.svg";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TripsContext from "../../context/TripsContext";
import "./TripDetials.css";
import Header from "../../Components/Header/Header";
import Calendar from "../../Components/Calendar/Calendar";

export default function TripDetials() {
  const { travelId } = useParams();
  const { trips } = useContext(TripsContext);
  const trip = trips.find((trip) => trip.id === parseInt(travelId));
  console.log(trip);
  const [discoveredTrips, setDiscoveredTrips] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState();

  useEffect(() => {
    window.scroll(0, 0);
    if (trip) {
      setBackgroundImage(trip.images[0].url);
      setDiscoveredTrips(trips.filter((h) => h.id !== trips.id));
    }
  }, [trips, trips]);

  if (!trip) {
    return (
      <div className="bg-orange">
        <Header />
        <h2 className="my-5 text-center py-3 fw-bold text-uppercase">
          trip not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="trip-detials">
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
            {trip?.images.map((img, index) => {
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
                      backgroundImage === img.url ? "2px solid #fff" : "none",
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
            {trip?.images.map((img, index) => {
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
              {trip ? (
                <>
                  <div
                    className="d-flex"
                    style={{
                      justifyContent: "space-between",
                      margin: "0 15px 0 0",
                    }}
                  >
                    <h1 className="card-title-details fw-bold">{trip.name}</h1>
                  </div>

                  <div className="d-flex">
                    <p style={{ color: "#6B7A85" }}>Duration: </p>
                    <p className="card-text-price">{trip.duration}</p>
                  </div>
                  <div className="d-flex one ">
                    <p style={{ color: "#6B7A85" }}>Ticket Price: </p>
                    <p className="card-text-price mb-4">
                      {trip.ticket_price_from} HD - {trip.ticket_price_to} HD
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
                      src={tripdet}
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
                    {trip.description}
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

          <p
            className=""
            style={{
              color: "#42A7C3",
              fontSize: "20px",
              fontWeight: "600",
              margin: "1rem 0 ",
            }}
          >
            Discover more trips
          </p>

          <div className="d-flex gap-3">
            {discoveredTrips.slice(0, 4).map((trip) => (
              <div className="col-md-2 pt-4" key={trip.id}>
                <div className="box bg-white rounded ">
                  <div className="text px-2">
                    <div className="align-items-center">
                      <h4 style={{ fontWeight: "600" }}>
                        <a>{trip.name}</a>
                      </h4>
                      <p
                        style={{
                          color: "#8A8A8A",
                          fontSize: "16px",
                          fontWeight: "700",
                          marginBottom: "20px",
                        }}
                      >
                        {trip.ticket_price_from} HD - {trip.ticket_price_to} HD
                      </p>

                      <Link
                        className="d-flex text-decoration-none"
                        to={`/trips/${trip.id}`}
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
