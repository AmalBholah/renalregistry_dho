import React, { Component } from "react";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { AppBar, Toolbar } from "@mui/material";
import { blue } from "@mui/material/colors";
import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  ListItemText,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import renderIf from "render-if";
import utils from "../utils";
import { createstopdialysis } from "../apis/dialysis-api";
import { Navigate } from "react-router-dom";
export default class Stopdialysis extends Component {
  componentDidMount() {
    this.setState(utils.getTempMemory());
  }

  state = {
    pkpatientid: "0",
    dateoflastdialysis: new moment(new Date()),
    reason: "Died",
    dateofdeath: moment(new Date()),
    causeofdeath: "Unknown",
    //STATE ADDITIONS
    showModalSelector: false,
    navPath: 0,
  };

  PatientOptionSelected(val) {
    this.setState({ navPath: val });
  }
  render() {
    return (
      <div>
        <Dialog
          onClose={() => this.setState({ showModalSelector: false })}
          open={this.state.showModalSelector}
        >
          <DialogTitle>Choose an Option</DialogTitle>
          <List sx={{ pt: 0 }}>
            <ListItem
              button
              onClick={() => this.PatientOptionSelected(1)}
              key={1}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={"Edit patient details"} />
            </ListItem>
            <ListItem
              button
              onClick={() => this.PatientOptionSelected(2)}
              key={2}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={"View mode(s) of dialysis"} />
            </ListItem>
            <ListItem
              button
              onClick={() => this.PatientOptionSelected(3)}
              key={3}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={"Start/Change mode of dialysis"} />
            </ListItem>
            <ListItem
              button
              onClick={() => this.PatientOptionSelected(4)}
              key={4}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={"View dialysis history"} />
            </ListItem>
            <ListItem
              button
              onClick={() => this.PatientOptionSelected(5)}
              key={5}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={"New dialysis session"} />
            </ListItem>

            <div
              style={{
                height: 2,
                width: "90%",
                backgroundColor: "lightblue",
                margin: "auto",
              }}
            />

            <ListItem
              button
              onClick={() => this.PatientOptionSelected(7)}
              key={7}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <ArrowBackIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                style={{ color: "red" }}
                primary={"Back to Patient list"}
              />
            </ListItem>
          </List>
        </Dialog>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography
              onClick={() => this.setState({ showModalSelector: false })}
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
              style={{ marginRight: 25 }}
            >
              Stop dialysis
            </Typography>

            <Button
              id="fade-button"
              onClick={() => this.setState({ showModalSelector: true })}
              variant="contained"
              color="secondary"
              endIcon={<ArrowCircleDownIcon />}
            >
              Choose an Option
            </Button>
            <div style={{ flexGrow: 1 }} />
          </Toolbar>
        </AppBar>
        <Paper
          elevation={3}
          style={{
            margin: "auto",
            minHeight: "95vh",
            maxWidth: "95vw",
            marginTop: 20,
          }}
        >
          {renderIf(this.state.navPath == 1)(
            <Navigate to="/editpatient" replace={false} />
          )}

          {renderIf(this.state.navPath == 2)(
            <Navigate to="/listmodeofdialysis" replace={false} />
          )}
          {renderIf(this.state.navPath == 3)(
            <Navigate to="/newmodeofdialysis" replace={false} />
          )}

          {renderIf(this.state.navPath == 4)(
            <Navigate to="/dialysishistory" replace={false} />
          )}
          {renderIf(this.state.navPath == 5)(
            <Navigate to="/newdialysis" replace={false} />
          )}
          {renderIf(this.state.navPath == 6)(
            <Navigate to="/stopdialysis" replace={false} />
          )}
          {renderIf(this.state.navPath == 7)(
            <Navigate to="/listpatients" replace={false} />
          )}
          {renderIf(this.state.navPath == 8)(
              <Navigate to="/viewpatient" replace={false} />
          )}
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <MobileDatePicker
                label="Date of last dialysis"
                inputFormat="DD/MM/YYYY"
                value={this.state.dateoflastdialysis}
                onChange={(e) => this.setState({ dateoflastdialysis: e })}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl fullWidth style={{ marginTop: 20 }}>
            <InputLabel id="choose-c-select-label">Reason *</InputLabel>
            <Select
              labelId="choose-c-select-label"
              value={this.state.reason}
              label="Gender"
              onChange={(val) => this.setState({ reason: val.target.value })}
            >
              <MenuItem value={"Died"}>Died</MenuItem>
              <MenuItem value={"Recovered kidney function"}>
                Recovered kidney function
              </MenuItem>
              <MenuItem value={"Doctor's recommendation"}>
                Doctor's recommendation
              </MenuItem>
              <MenuItem value={"Lost to follow up"}>Lost to follow up</MenuItem>
              <MenuItem value={"Left mauritius"}>Left mauritius</MenuItem>
              <MenuItem value={"Patient or family choice"}>
                Patient or family choice
              </MenuItem>
            </Select>
          </FormControl>

          {renderIf(this.state.reason == "Died")(
            <FormControl fullWidth style={{ marginTop: 20 }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <MobileDatePicker
                  label="Date of death"
                  inputFormat="DD/MM/YYYY"
                  value={this.state.dateofdeath}
                  onChange={(e) => this.setState({ dateofdeath: e })}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          )}

          {renderIf(this.state.reason == "Died")(
            <FormControl fullWidth style={{ marginTop: 20 }}>
              <InputLabel id="choose-x-select-label">
                Cause of death *
              </InputLabel>
              <Select
                labelId="choose-x-select-label"
                value={this.state.causeofdeath}
                label="Cause of death *"
                onChange={(val) =>
                  this.setState({ causeofdeath: val.target.value })
                }
              >
                <MenuItem value={"Unknown"}>Unknown</MenuItem>
                <MenuItem value={"Cardiovascular"}>Cardiovascular</MenuItem>
                <MenuItem value={"Cerebrovascular"}>Cerebrovascular</MenuItem>
                <MenuItem value={"Infection"}>Infection</MenuItem>
                <MenuItem value={"Malignancy"}>Malignancy</MenuItem>
                <MenuItem value={"Stopped dialysis"}>Stopped dialysis</MenuItem>
              </Select>
            </FormControl>
          )}
          <Box sx={{ mb: 2 }} className={"bottom-centered"}>
            <div>
              <Button
                variant="contained"
                onClick={() => this.stopDialysisEvent()}
                sx={{ mt: 1, mr: 1 }}
                style={{ fontWeight: "bold" }}
              >
                {"Stop dialysis"}
              </Button>
            </div>
          </Box>
        </Paper>
      </div>
    );
  }

  async stopDialysisEvent() {
    var objectToSend = this.state;
    objectToSend.dateoflastdialysis = moment(
      this.state.dateoflastdialysis
    ).format("YYYY-MM-DD");
    objectToSend.dateofdeath = moment(this.state.dateofdeath).format(
      "YYYY-MM-DD"
    );
    objectToSend.createdby = window.localStorage.getItem('login');
    let responseFromServer = await createstopdialysis(objectToSend);
    this.setState({ navPath: 8 });
  }
}
