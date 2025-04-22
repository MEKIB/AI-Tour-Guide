import React from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Link } from "react-router-dom";
import TouristInfoImage from "../../assets/tourist-info.jpg"; // Placeholder for hero image

const containerStyle = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px",
};
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
const tableContainerStyle = {
  background: "rgba(57, 62, 70, 0.8)",
  padding: "20px",
  borderRadius: "16px",
  color: "#EEEEEE",
};

const touristInfoData = [
  {
    destination: "Bahir Dar",
    centers: [
      {
        name: "Tisabay Tourist Information Center",
        contacts: [
          {
            person: "Tesfa Asmare",
            mobile: "+251937342603",
            phone: "+2515822370054",
          },
          { person: "Dagnet", mobile: "0991801262", phone: "+2515822370054" },
        ],
      },
      {
        name: "Bahirdar Airport Tourist Information Center",
        contacts: [
          {
            person: "Saleamlak Tilaye",
            mobile: "+25193449802",
            phone: "0991801262",
          },
          {
            person: "Wudeneh Betew",
            mobile: "+25191275111",
            phone: "0991801262",
          },
        ],
      },
    ],
  },
  {
    destination: "Gondar",
    centers: [
      {
        name: "Gonder Airport Tourist Information Center",
        contacts: [
          {
            person: "Aseged Tesfaye",
            mobile: "+251983154066",
            phone: "0991801262",
          },
          {
            person: "Abyot Gebeyehu",
            mobile: "+251918164710",
            phone: "0991801262",
          },
        ],
      },
      {
        name: "Gonder Betemengist Tourist Information Center",
        contacts: [
          { person: "Serkie", mobile: "+251918030878", phone: "+251581110022" },
          { person: "Getahun", mobile: "0991801262", phone: "+251581115138" },
        ],
      },
    ],
  },
  {
    destination: "Lalibela",
    centers: [
      {
        name: "Lalibela Airport Tourist Information Center",
        contacts: [
          {
            person: "Asnake Tadese",
            mobile: "+251910388588",
            phone: "0991801262",
          },
          {
            person: "Zemenu Iyew",
            mobile: "+251920049527",
            phone: "0991801262",
          },
        ],
      },
      {
        name: "Lalibela Churches Tourist Information Center",
        contacts: [
          { person: "Habtamu", mobile: "+251985259780", phone: "0991801262" },
        ],
      },
    ],
  },
  {
    destination: "Debark",
    centers: [
      {
        name: "Semien Mountain National Park Tourist Information Center",
        contacts: [
          { person: "Azanaw", mobile: "+251918381153", phone: "+251581170016" },
        ],
      },
    ],
  },
  {
    destination: "Combolcha",
    centers: [
      {
        name: "Combolcha Airport Tourist Information Center",
        contacts: [
          {
            person: "Endalew Alem",
            mobile: "+251933046025",
            phone: "0991801262",
          },
          {
            person: "Asnakew Hafez",
            mobile: "+251934449802",
            phone: "0991801262",
          },
        ],
      },
    ],
  },
];

const TouristInformationCenter = () => {
  return (
    <Box sx={{ background: "rgba(34, 40, 49, 0.8)", minHeight: "100vh" }}>
      <div style={containerStyle}>
        <div style={breadcrumbStyle}>
          <Link to="/" style={breadcrumbLinkStyle}>
            Navigation
          </Link>
          <span style={breadcrumbTextStyle}> / </span>
          <Link to="/tourist-and-facility" style={breadcrumbLinkStyle}>
            Tourist and Facility
          </Link>
          <span style={breadcrumbTextStyle}> / Tourist Information Center</span>
        </div>
        <div style={heroStyle}>
          <img
            src={TouristInfoImage}
            alt="Tourist Information Centers"
            style={heroImageStyle}
          />
          <h1 style={heroTitleStyle}>Tourist Information Centers</h1>
        </div>
        <div style={tableContainerStyle}>
          {touristInfoData.map((destinationData, index) => (
            <Box key={index} sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ color: "#00ADB5", mb: 2 }}>
                {destinationData.destination}
              </Typography>
              {destinationData.centers.map((center, centerIndex) => (
                <Box key={centerIndex} sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: "#EEEEEE", mb: 1 }}>
                    {center.name}
                  </Typography>
                  <Table
                    sx={{
                      background: "rgba(34, 40, 49, 0.8)",
                      borderRadius: "8px",
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            color: "#00ADB5",
                            fontWeight: "bold",
                            borderBottom: "1px solid #00ADB5",
                          }}
                        >
                          Contact Person
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#00ADB5",
                            fontWeight: "bold",
                            borderBottom: "1px solid #00ADB5",
                          }}
                        >
                          Mobile
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#00ADB5",
                            fontWeight: "bold",
                            borderBottom: "1px solid #00ADB5",
                          }}
                        >
                          Phone
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {center.contacts.map((contact, contactIndex) => (
                        <TableRow key={contactIndex}>
                          <TableCell
                            sx={{
                              color: "#EEEEEE",
                              borderBottom:
                                "1px solid rgba(255, 255, 255, 0.1)",
                            }}
                          >
                            {contact.person}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "#EEEEEE",
                              borderBottom:
                                "1px solid rgba(255, 255, 255, 0.1)",
                            }}
                          >
                            {contact.mobile}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "#EEEEEE",
                              borderBottom:
                                "1px solid rgba(255, 255, 255, 0.1)",
                            }}
                          >
                            {contact.phone || "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              ))}
            </Box>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default TouristInformationCenter;
