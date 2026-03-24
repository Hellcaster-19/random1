// src/pages/Home.jsx
import { Box, Typography } from "@mui/material";
import BottomNav from "../components/BottomNav";
import RideCard from "../components/RideCard";
import SectionHeader from "../components/SectionHeader";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function Home() {
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
      }}
    >
      {/* HEADER */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Hi, Devashish 👋</Typography>
        <Typography sx={{ color: "#aaa" }}>
          Find your next ride
        </Typography>
      </Box>

      {/* RECOMMENDED */}
      <Box sx={{ px: 2 }}>
        <SectionHeader title="Recommended" />

        {rides.map((ride) => (
          <RideCard key={ride._id} ride={ride} />
        ))}
      </Box>

      <BottomNav active="Home" />
    </Box>
  );
}