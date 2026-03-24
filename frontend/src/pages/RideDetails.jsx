import { Box, Typography, Avatar, Button, Card } from "@mui/material";
import BottomNav from "../components/BottomNav";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function RideDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ride, setRide] = useState(null);

  useEffect(() => {
    api.get(`/rides/${id}`).then((res) => {
      setRide(res.data);
    });
  }, [id]);

  const handleJoin = () => {
    api.post(`/rides/${id}/join`).then(() => {
      navigate(`/active/${id}`);
    });
  };

  if (!ride) return null;

  return (
    <Box
      sx={{
        bgcolor: "#000",
        minHeight: "100vh",
        color: "#fff",
        pb: 12,
        maxWidth: 420,
        mx: "auto",
      }}
    >
      {/* 🗺️ MAP PREVIEW */}
      <Box
        sx={{
          height: "35vh",
          background: "#1a1a1a",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ color: "#aaa" }}>
          Route Preview Map
        </Typography>
      </Box>

      {/* 🚴 RIDE INFO */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {ride.name}
        </Typography>

        <Typography sx={{ color: "#aaa", mt: 1 }}>
          {ride.distance} km • {ride.time} • {ride.type}
        </Typography>
      </Box>

      {/* 👤 ORGANIZER */}
      <Card
        sx={{
          mx: 2,
          p: 2,
          borderRadius: 3,
          background: "#111",
          color: "#fff",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ mr: 2 }} />
          <Box>
            <Typography>{ride.organizerName}</Typography>
            <Typography sx={{ fontSize: 12, color: "#aaa" }}>
              ⭐ {ride.rating || "4.5"}
            </Typography>
          </Box>
        </Box>
      </Card>

      {/* 👥 PARTICIPANTS */}
      <Box sx={{ px: 2, mb: 2 }}>
        <Typography sx={{ mb: 1 }}>
          {ride.participants?.length || 0} participants joined
        </Typography>

        <Box sx={{ display: "flex" }}>
          {ride.participants?.slice(0, 5).map((p, i) => (
            <Avatar key={i} sx={{ mr: 1 }} />
          ))}
        </Box>
      </Box>

      {/* 📊 DETAILS */}
      <Box sx={{ px: 2 }}>
        <Typography sx={{ mb: 1 }}>Ride Details</Typography>

        <Card
          sx={{
            p: 2,
            borderRadius: 3,
            background: "#111",
            color: "#fff",
            mb: 2,
          }}
        >
          <Typography>Distance: {ride.distance} km</Typography>
          <Typography>Duration: {ride.duration}</Typography>
          <Typography>Difficulty: {ride.difficulty}</Typography>
          <Typography>Start: {ride.startLocation}</Typography>
          <Typography>End: {ride.endLocation}</Typography>
        </Card>
      </Box>

      {/* 💬 DESCRIPTION */}
      <Box sx={{ px: 2, mb: 2 }}>
        <Typography sx={{ mb: 1 }}>About Ride</Typography>
        <Typography sx={{ color: "#aaa" }}>
          {ride.description}
        </Typography>
      </Box>

      {/* 🤝 OFFERS */}
      {ride.offer && (
        <Card
          sx={{
            mx: 2,
            p: 2,
            borderRadius: 3,
            background:
              "linear-gradient(45deg,#FF6129,#FC3B00)",
            color: "#fff",
            mb: 2,
          }}
        >
          <Typography>{ride.offer}</Typography>
        </Card>
      )}

      {/* 🎯 JOIN BUTTON */}
      <Box
        sx={{
          position: "fixed",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: 420,
        }}
      >
        <Button
          fullWidth
          onClick={handleJoin}
          sx={{
            background:
              "linear-gradient(45deg,#FF6129,#FC3B00)",
            color: "#fff",
            py: 1.5,
            borderRadius: "12px",
          }}
        >
          Join Ride
        </Button>
      </Box>

      {/* 📱 NAVBAR */}
      <BottomNav active="Campaigns" />
    </Box>
  );
}