import { Box, Typography } from "@mui/material";
import BottomNav from "../components/BottomNav";
import RideCard from "../components/RideCard";
import SectionHeader from "../components/SectionHeader";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function Campaign() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    api.get("/rides/nearby").then((res) => {
      setRides(res.data);
    });
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "#000",
        minHeight: "100vh",
        color: "#fff",
        pb: 10,
        maxWidth: 420,
        mx: "auto",
        position: "relative",
      }}
    >
      {/* 🗺️ MAP SECTION */}
      <Box
        sx={{
          height: "55vh",
          width: "100%",
          background: "#1a1a1a",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ color: "#aaa" }}>
          Map Placeholder (Integrate Mapbox / Google Maps)
        </Typography>
      </Box>

      {/* 📍 FLOATING SEARCH CARD */}
      <Box
        sx={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          bgcolor: "#111",
          borderRadius: "16px",
          p: 2,
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>
          Where do you want to ride?
        </Typography>
        <Typography sx={{ fontSize: 12, color: "#aaa" }}>
          Select start & destination
        </Typography>
      </Box>

      {/* 🚴 RIDES LIST */}
      <Box sx={{ px: 2, mt: 2 }}>
        <SectionHeader title="Available Rides" />

        {rides.map((ride) => (
          <RideCard key={ride._id} ride={ride} />
        ))}
      </Box>

      {/* 📱 NAVBAR */}
      <BottomNav active="Campaigns" />
    </Box>
  );
}