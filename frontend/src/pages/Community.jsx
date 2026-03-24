import { Box, Typography, Avatar } from "@mui/material";
import BottomNav from "../components/BottomNav";
import SectionHeader from "../components/SectionHeader";
import { useNavigate } from "react-router-dom";

export default function Community() {
  const navigate = useNavigate();

  const chats = [
    { id: 1, name: "Sunrise Ride", last: "Let's ride 🚴" },
    { id: 2, name: "Weekend Crew", last: "Tomorrow 6AM!" },
  ];

  return (
    <Box sx={{ bgcolor: "#000", minHeight: "100vh", color: "#fff", pb: 10, maxWidth: 420, mx: "auto" }}>

      {/* HEADER */}
      <Box sx={{ p: 2 }}>
        <SectionHeader title="Community" />
      </Box>

      {/* LIST */}
      {chats.map((chat) => (
        <Box
          key={chat.id}
          onClick={() => navigate(`/chat/${chat.id}`)}
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid #222",
            cursor: "pointer",
          }}
        >
          <Avatar sx={{ mr: 2 }} />

          <Box>
            <Typography>{chat.name}</Typography>
            <Typography sx={{ fontSize: 12, color: "#aaa" }}>
              {chat.last}
            </Typography>
          </Box>
        </Box>
      ))}

      <BottomNav active="Community" />
    </Box>
  );
}