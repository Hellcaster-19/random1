import { Box, Typography, Card } from "@mui/material";
import BottomNav from "../components/BottomNav";
import SectionHeader from "../components/SectionHeader";

export default function Profile() {
  return (
    <Box sx={{ bgcolor: "#000", minHeight: "100vh", color: "#fff", pb: 10, maxWidth: 420, mx: "auto" }}>

      {/* HEADER */}
      <Box sx={{ p: 2 }}>
        <SectionHeader title="Profile" />
      </Box>

      {/* STATS */}
      <Card sx={{ m: 2, p: 2, background: "#111", color: "#fff" }}>
        <Typography>Rides: 24</Typography>
        <Typography>Distance: 120 km</Typography>
      </Card>

      {/* SETTINGS */}
      <Box sx={{ px: 2 }}>
        <Typography sx={{ mb: 1 }}>Settings</Typography>

        {["Ride History", "Saved Rides", "Notifications", "Help"].map((item) => (
          <Box
            key={item}
            sx={{
              py: 2,
              borderBottom: "1px solid #222",
            }}
          >
            <Typography>{item}</Typography>
          </Box>
        ))}
      </Box>

      <BottomNav active="Profile" />
    </Box>
  );
}