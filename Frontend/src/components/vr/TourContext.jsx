// TourContext.jsx
import React, { createContext, useState } from "react";

// Create context for tour state
const TourContext = createContext();

export const TourProvider = ({ children }) => {
  // Global state: selectedDestination and selectedImage
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <TourContext.Provider
      value={{
        selectedDestination,
        setSelectedDestination,
        selectedImage,
        setSelectedImage,
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

export default TourContext;
