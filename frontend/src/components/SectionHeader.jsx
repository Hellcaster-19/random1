import { Box, Typography } from "@mui/material";

export default function SectionHeader({ title, action }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1,
      }}
    >
      <Typography sx={{ fontWeight: 600 }}>{title}</Typography>

      {action && (
        <Typography
          sx={{
            fontSize: 12,
            color: "#FF6129",
            cursor: "pointer",
          }}
        >
          {action}
        </Typography>
      )}
    </Box>
  );
}