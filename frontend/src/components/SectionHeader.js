import React from "react";
import { Typography } from "@mui/material";
const SectionHeader = ({ title }) => {
  return (
    <div>
      <Typography variant={"h5"} style={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <div
        style={{
          height: 2,
          width: "96%",
          backgroundColor: "blue",
          marginTop: 5,
          marginBottom: 5,
        }}
      />
    </div>
  );
};

export default SectionHeader;
