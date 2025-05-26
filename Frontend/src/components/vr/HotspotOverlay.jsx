// HotspotOverlay.jsx
import React from "react";
import { Box } from "@mui/material";

const HotspotOverlay = () => {
  const handleClick = () => {
    alert("Hotspot clicked!");
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: "absolute",
        top: "50%", // center vertically (50% from top)
        left: "50%", // center horizontally (50% from left)
        width: 24,
        height: 24,
        backgroundColor: "rgba(255, 0, 0, 0.7)",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)", // offset by half of its width/height
        cursor: "pointer",
        zIndex: 5,
      }}
    />
  );
};

export default HotspotOverlay;
