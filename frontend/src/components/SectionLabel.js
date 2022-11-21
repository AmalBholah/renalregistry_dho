import React from "react";
import { Typography } from "@mui/material";
const SectionLabel = ({ title, content }) => {
  return (
    <div style={{ flexDirection: "row", display: "flex" }}>
      <Typography variant={"button"} style={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography
        variant={"button"}
        style={{ fontWeight: "bold", color: "darkblue", marginLeft: 5 }}
      >
        {content}
      </Typography>
    </div>
  );
};

export default SectionLabel;
