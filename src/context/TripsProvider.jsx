import { useState, useEffect } from "react";
import axios from "axios";
import TripsContext from "./TripsContext";
import { BASE } from "../API/Api";


const TripsProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get(`${BASE}/trips`);
        setTrips(response.data.data);
        console.log("Fetched Trips:", response.data.data); 
      } catch (error) {
        console.error("Error fetching Trips:", error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <TripsContext.Provider value={{ trips }}>
      {children}
    </TripsContext.Provider>
  );
};

export default TripsProvider;
