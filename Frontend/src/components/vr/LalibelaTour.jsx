// LalibelaTour.jsx
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useContext } from "react";
import TourContext from "./TourContext";
import ImageGallery from "./ImageGallery";
import ImageViewer from "./ImageViewer";

const LalibelaTour = () => {
  const { setSelectedDestination, setSelectedImage } = useContext(TourContext);
  const images = [
    "/images/lalibela-1.png",
    "/images/lalibela-2.png",
    "/images/lalibela-3.png",
    "/images/lalibela-4.png",
    "/images/lalibela-5.png",
    "/images/lalibela-6.png",
  ];

  useEffect(() => {
    setSelectedDestination("Lalibela");
    setSelectedImage(images[0]);
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <ImageGallery images={images} />
      <ImageViewer />
    </Box>
  );
};

export default LalibelaTour;
