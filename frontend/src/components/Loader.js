import React from "react";
import { Backdrop, Alert, AlertTitle, CircularProgress } from "@mui/material";
const Loader = ({ visible }) => {
  return (
    <Backdrop style={{ color: "#fff", zIndex: 10000 }} open={visible}>
      <Alert severity={"info"}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <AlertTitle style={{ flexGrow: 1 }}>Please wait ...</AlertTitle>

          <CircularProgress size={20} />
        </div>
        <strong>Loading requested information</strong>
      </Alert>
    </Backdrop>
  );
};
export default Loader;
