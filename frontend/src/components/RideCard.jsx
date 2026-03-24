import { Card, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RideCard({ ride }) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/ride/${ride._id}`)}
      sx={{
        p: 2,
        borderRadius: 3,
        background: "#111",
        color: "#fff",
        cursor: "pointer",
        mb: 2,
        border: "1px solid #222",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <Typography variant="h6">{ride.name}</Typography>

      <Typography sx={{ fontSize: 13, color: "#aaa", mt: 1 }}>
        {ride.distance} km • {ride.time}
      </Typography>

      <Box sx={{ mt: 1 }}>
        <Typography sx={{ fontSize: 12, color: "#FF6129" }}>
          {ride.type || "Group Ride"}
        </Typography>
      </Box>
    </Card>
  );
}