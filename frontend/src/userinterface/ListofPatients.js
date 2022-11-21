import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import renderIf from "render-if";
import {
  Paper,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {
  listregisteredpatients,
  filterregisteredpatients,
} from "../apis/patient-registration";

import utils from "../utils";
import Loader from "../components/Loader";
import AdminDrawer from "../components/AdminDrawer";


export default class ListofPatients extends Component {
  state = {
    patients: [],
    searchField: "",
    showPatientDetails: false,
    loading: false,
    identifierselection: "",
    identifiervalue: "",
    healthinstitution: "",
    unitnumber: "",
    surname: "",
    name: "",
    dateofbirth: "",
    gender: "",
    address: "",
    homenumber: "",
    mobilenumber: "",
    emailaddress: "",
    height: "",
    weight: "",
    birthweight: "",
    ethnicgroup: "",
    maritalstatus: "",
    occupation: "",
    currentemployment: "",
    previousoccupation: "",
    primaryrenaldiagnosis: "",
    secondaryrenaldiagnosis: "",
    patientondialysis: "",
    latestcreatinine: "",
    calculatedegfr: "",
    egfr: "",
    latesthb: "",
    dateperformed: "",
    clinicalfrailtyscale: "",
    clinicalfrailtymessage: "",
    smokingstatus: "",
    alcoholusedisorder: "",
    hepatitisb: "",
    hepatitisc: "",
    hiv: "",
    comorbidities: [],
    disabilities: [],
    createdon: "",
    //Peripherals
    navPath: 0,
    showPatientSelector: false,
    //Stop dialysis
    dateoflastdialysis: "",
    reason: "",
    dateofdeath: "",
    causeofdeath: "",
    dialysisStop: false,
    drawerOpen: false,
  };

  async componentDidMount() {
    let _max100_query = await listregisteredpatients(
        window.localStorage.getItem('isadmin'),
        window.localStorage.getItem('healthinstitutioncode')
    );
    this.setState({ patients: _max100_query });
  }

  PatientOptionSelected(val) {
    utils.setTempMemory(this.state);
    this.setState({ navPath: val });
  }

  PatientOptionSelectedWithRow(val,row){
    utils.setTempMemory(row);
    this.setState({ navPath: val });
  }

  render() {
    return (
      <div>
        <AdminDrawer
          drawerOpen={this.state.drawerOpen}
          drawerToggle={() =>
            this.setState({ drawerOpen: !this.state.drawerOpen })
          }
        />
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              onClick={() =>
                this.setState({ drawerOpen: !this.state.drawerOpen })
              }
            >
              <MenuIcon style={{ color: "white" }} />
            </IconButton>

            <Typography
              variant="h6"
              component="div"
              style={{ marginRight: 25, flexGrow: 1 }}
            >
              Mauritius Renal Registry
            </Typography>

            <Button
              style={{ marginRight: 50 }}
              onClick={() => this.setState({ navPath: 20 })}
              id="fade-button"
              variant="contained"
              color="secondary"
              endIcon={<AddIcon />}
            >
              Create new Patient
            </Button> 
            <Button
              onClick={() => this.setState({ navPath: 10 })}
              id="fade-button"
              variant="contained"
              color="secondary"
              endIcon={<LogoutIcon />}
            >
              Logout
            </Button>
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
          {renderIf(this.state.navPath == 10)(
            <Navigate to="/" replace={true} />
          )}
          {renderIf(this.state.navPath == 20)(
            <Navigate to="/registerpatient" replace={false} />
          )}

          <TextField
            onKeyDown={(e) => this.searchForPatient(e)}
            value={this.state.searchField}
            onChange={(e) => this.setState({ searchField: e.target.value })}
            id="outlined-basic"
            label="Search patient (By name, unique identifier, address, home/mobile number) & hit enter"
            variant="outlined"
            style={{ margin: 20, width: "92.5vw" }}
          />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead style={{ backgroundColor: "black" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold", color: "white" }}>
                    Full Name
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "white" }}>
                    Address
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "white" }}>
                    Unique ID
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "white" }}>
                    Primary Diagnosis
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.patients.map((row) => (
                  <TableRow
                    key={row.pkpatientid}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ cursor: "pointer" }}
                    onClick={() => this.PatientOptionSelectedWithRow(8,row)}
                  >
                    <TableCell component="th" scope="row">
                      {row.name + " " + row.surname}
                    </TableCell>

                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.identifiervalue}</TableCell>
                    <TableCell>{row.primaryrenaldiagnosis}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>


          <Loader visible={this.state.loading} />
        </Paper>
      </div>
    );
  }


  async searchForPatient(e) {
    if (e.keyCode == 13) {
      let results = await filterregisteredpatients(
          this.state.searchField,
          window.localStorage.getItem('isadmin'),
          window.localStorage.getItem('healthinstitutioncode')
      );
      this.setState({ patients: results });
    }
  }
}
