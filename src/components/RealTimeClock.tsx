import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const RealTimeClock: React.FC = () => {
  const [dateTime, setDateTime] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setDateTime(formatted);
    };

    updateDateTime(); // initial call
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        display: "flex",
        alignItems: "center",
        gap: 1,
        backgroundColor: "#FFD500",
        padding: "10px 16px",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        zIndex: 9999,
      }}
    >
      <AccessTimeIcon fontSize="medium" sx={{ color: "#fff" }} />
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 600, color: "#1f2937" }}
      >
        {dateTime}
      </Typography>
    </Box>
  );
};

export default RealTimeClock;
