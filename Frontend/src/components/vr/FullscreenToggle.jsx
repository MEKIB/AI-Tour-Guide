// FullscreenToggle.jsx
import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const FullscreenToggle = ({ containerRef }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <IconButton
      onClick={toggleFullscreen}
      color="primary"
      sx={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}
    >
      {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </IconButton>
  );
};

export default FullscreenToggle;
