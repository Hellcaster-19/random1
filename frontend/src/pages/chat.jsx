import { Box, Typography, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text) return;
    setMessages([...messages, { text, sender: "me" }]);
    setText("");
  };

  return (
    <Box sx={{ bgcolor: "#000", minHeight: "100vh", color: "#fff", pb: 10, maxWidth: 420, mx: "auto" }}>

      {/* MESSAGES */}
      <Box sx={{ p: 2 }}>
        {messages.map((msg, i) => (
          <Box
            key={i}
            sx={{
              mb: 1,
              display: "flex",
              justifyContent: msg.sender === "me" ? "flex-end" : "flex-start",
            }}
          >
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                background:
                  msg.sender === "me"
                    ? "linear-gradient(45deg,#FF6129,#FC3B00)"
                    : "#111",
              }}
            >
              <Typography>{msg.text}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* INPUT */}
      <Box
        sx={{
          position: "fixed",
          bottom: 10,
          width: "90%",
          maxWidth: 420,
          display: "flex",
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          sx={{ bgcolor: "#111", borderRadius: 2 }}
        />

        <IconButton onClick={sendMessage} sx={{ color: "#fff" }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}