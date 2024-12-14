import { useState, useEffect } from "react";
import axios from "axios";
import HotelsContext from "./HotelsContext";
import { BASE } from "../API/Api";
import useLanguage from "./useLanguage";

const HotelsProvider = ({ children }) => {
  // translation
  const { language } = useLanguage();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${BASE}/hotels`, {
          headers: {
            lang: language
          }
        });
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
