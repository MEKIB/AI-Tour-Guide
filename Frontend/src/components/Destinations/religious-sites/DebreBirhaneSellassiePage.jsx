import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DebreBirhanSellasieImage from "../../../assets/debre_berhan_selassie.jpg";

const containerStyle = { width: "100%", padding: "20px" };
const breadcrumbStyle = { marginBottom: "20px" };
const breadcrumbLinkStyle = {
  color: "#00ADB5",
  textDecoration: "none",
  fontSize: "1rem",
};
const breadcrumbTextStyle = { color: "#EEEEEE", fontSize: "1rem" };
const heroStyle = {
  position: "relative",
  width: "100%",
  height: "500px",
  overflow: "hidden",
  borderRadius: "16px",
  marginBottom: "20px",
};
const heroImageStyle = { width: "100%", height: "100%", objectFit: "cover" };
const heroTitleStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#00ADB5",
  fontSize: "2.5rem",
  fontWeight: 600,
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
  textAlign: "center",
};
const contentStyle = {
  background: "rgba(57, 62, 70, 0.8)",
  padding: "20px",
  borderRadius: "16px",
  color: "#EEEEEE",
};
const textStyle = { fontSize: "1rem", lineHeight: "1.6", marginBottom: "15px" };

const DebreBirhaneSellassiePage = () => {
  return (
    <Box
      sx={{
        background: "rgba(34, 40, 49, 0.8)",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div style={containerStyle}>
        <div style={breadcrumbStyle}>
          <Link to="/" style={breadcrumbLinkStyle}>
            Home
          </Link>
          <span style={breadcrumbTextStyle}> / </span>
          <Link to="/religious-sites" style={breadcrumbLinkStyle}>
            Religious Sites
          </Link>
          <span style={breadcrumbTextStyle}> / Debre Birhane Sellassie</span>
        </div>
        <div style={heroStyle}>
          <img
            src={DebreBirhanSellasieImage}
            alt="Debre Birhane Sellassie"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Debre Birhane Sellassie</h1>
        </div>
        <div style={contentStyle}>
          <Typography style={textStyle}>
            The Debre Birhane Sillassie church, founded by Iyasu I in the 1690s
            and the only Gondarine church that escaped entirely unscathed from
            the Madadist war when the Dervish of Sudan attacked Gondar at the
            end of the 19th century. This is one of the most beautiful churches
            in Ethiopia.
          </Typography>
          <Typography style={textStyle}>
            The sides of the walls of the church are completely covered with
            paintings showing various scenes. The southern wall concentrates on
            the life of Jesus Christ, while the northern wall depicts various
            saints. The much-photographed ceiling, decorated with paintings of
            80 angelic faces, is probably the most famous single example of
            ecclesiastical art in Ethiopia.
          </Typography>
          <Typography style={textStyle}>
            The paintings are traditionally believed to be the work of the
            17th-century artist Aba Haile Meskel Woldu. The church lies about 1
            km to the northeast of the castle.
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default DebreBirhaneSellassiePage;
