import React, { createContext, useState } from "react";

const SelectedRangeContext = createContext();

export const SelectedRangeProvider = ({ children }) => {
  const [selectedRange, setSelectedRange] = useState({
    start: null,
    end: null,
  });

  return (
    <SelectedRangeContext.Provider value={{ selectedRange, setSelectedRange }}>
      {children}
    </SelectedRangeContext.Provider>
  );
};

export default SelectedRangeContext;