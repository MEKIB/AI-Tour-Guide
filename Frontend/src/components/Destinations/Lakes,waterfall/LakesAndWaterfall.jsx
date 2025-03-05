import React from "react";
import { Box, Typography } from "@mui/material";
import LakeZegena from '../../../assets/Lake-Zegena.jpg'
const LakesAndWaterfall = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "500px",
        overflow: "hidden",
      }}
    >
      <img
        src={LakeZegena}
        alt="Lakes and Waterfall"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
          zIndex: 1,
          width: "100%",
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          gutterBottom
          sx={{ textShadow: "2px 2px 4px #000000" }}
        >
        Lakes Hot Springs and Water falls
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "60px",
          background: "linear-gradient(rgba(0, 0, 0, 0.2), transparent)",
        }}
      />
    </Box>
  );
};

export default LakesAndWaterfall;
