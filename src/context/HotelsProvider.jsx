import { useState, useEffect } from "react";
import axios from "axios";
import HotelsContext from "./HotelsContext";
import { BASE } from "../API/Api";

const HotelsProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${BASE}/hotels`);
        setHotels(response.data.data);
        console.log("Fetched Hotels:", response.data.data); 
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <HotelsContext.Provider value={{ hotels }}>
      {children}
    </HotelsContext.Provider>
  );
};

export default HotelsProvider;
