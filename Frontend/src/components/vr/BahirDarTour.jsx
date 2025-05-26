// BahirDarTour.jsx
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useContext } from "react";
import TourContext from "./TourContext";
import ImageGallery from "./ImageGallery";
import ImageViewer from "./ImageViewer";

const BahirDarTour = () => {
  const { setSelectedDestination, setSelectedImage } = useContext(TourContext);
  // Array of panorama images for Bahir Dar (in public/images/)
  const images = [
    "/images/bahirdar-1.jpg",
    "/images/bahirdar-2.jpg",
    "/images/bahirdar-3.jpg",
    "/images/bahirdar-4.jpg",
    "/images/bahirdar-5.jpg",
    "/images/bahirdar-6.jpg",
  ];

  // On mount, set the destination and default image
  useEffect(() => {
    setSelectedDestination("Bahir Dar");
    setSelectedImage(images[0]);
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Thumbnails on left */}
      <ImageGallery images={images} />
      {/* 360 viewer on right */}
      <ImageViewer />
    </Box>
  );
};

export default BahirDarTour;
