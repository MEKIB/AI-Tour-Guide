// ImageGallery.jsx
import React, { useContext } from "react";
import { ImageList, ImageListItem } from "@mui/material";
import TourContext from "./TourContext";

const ImageGallery = ({ images }) => {
  const { selectedImage, setSelectedImage } = useContext(TourContext);

  return (
    <div
      style={{ width: "25%", overflowY: "auto", backgroundColor: "#f5f5f5" }}
    >
      <ImageList cols={1} gap={8}>
        {images.map((img, index) => (
          <ImageListItem
            key={index}
            onClick={() => setSelectedImage(img)}
            sx={{ cursor: "pointer" }}
          >
            <img
              src={img}
              alt={`Thumbnail ${index}`}
              style={{
                width: "100%",
                border: selectedImage === img ? "2px solid blue" : "none",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default ImageGallery;
