import React from "react";
import { Box, Typography } from "@mui/material";
import { ThemeContext } from "@emotion/react";

export default function MusicianCard({ musician }) {
  return (
    <Box
      sx={{
        backgroundColor: "#fff3ef",
        borderRadius: "12px",
        padding: 2,
        textAlign: "center",
        boxShadow: 2,
        width: 400,
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        component="img"
        src={musician.musicianImage || "/placeholder.jpg"}
        alt={musician.name}
        sx={{
          width: "100%",
          height: 300,
          objectFit: "cover",
          objectPosition: "top",
          borderRadius: 1,
          mb: 1,
        }}
      />
      <Typography sx={{ fontWeight: 300, fontSize: 27, color: "gray" }}>{musician.name}</Typography>
    </Box>
  );
}
