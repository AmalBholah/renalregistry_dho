import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
const DialysisSelector = ({ title, value, echoValue }) => {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{title}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={(e) => echoValue(e.target.value)}
      >
        <FormControlLabel
          value="Hemodialysis"
          control={<Radio />}
          label="Hemodialysis"
        />
        <FormControlLabel
          value="Peritoneal Dialysis"
          control={<Radio />}
          label="Peritoneal Dialysis"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default DialysisSelector;
