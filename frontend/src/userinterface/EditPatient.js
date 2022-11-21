import React, { Component, Fragment } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, Container,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import renderIf from "render-if";
import moment from "moment";
import utils from "../utils";
import ListItemAssessment from "../components/ListItemAssessment";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { AppBar, Toolbar, ListItemAvatar, Avatar } from "@mui/material";
import {
  listhealthinstitutions,
  seekeraedta,
  listcomorbiditiesmaster,
  listdisabilitiesmaster, readeraedtatable,listhemodialysisunits
} from "../apis/master-lists";
import { updatepatientregistration } from "../apis/patient-registration";

import { Navigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { blue } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";

export default class EditPatient extends Component {
  state = {
    activeStep: 0,
    identifierselection: "National ID Number",
    identifiervalue: "",
    healthinstitution: "",
    unitnumber: "",
    surname: "",
    name: "",
    dateofbirth: moment(new Date()),
    gender: "Male",
    address: "",
    homenumber: "",
    mobilenumber: "",
    emailaddress: "",
    height: "",
    weight: "",
    birthweight: "",
    ethnicgroup: "General Population",
    maritalstatus: "Single",
    occupation: "Employed",
    currentemployment: "",
    previousoccupation: "",
    primaryrenaldiagnosis: "Choose a primary renal diagnosis",
    secondaryrenaldiagnosis: "Choose a secondary renal diagnosis",
    patientondialysis: true,
    latestcreatinine: "",
    isblack: false,
    calculatedegfr: "Calculated eGFR : 0 ml/min",
    egfr: 0,
    latesthb: "",
    dateperformed: moment(new Date()),
    clinicalfrailtyscale: 1,
    clinicalfrailtymessage: utils.ClinicalFrailtyScaleExplanativeText(1),
    smokingstatus: "Unknown",
    alcoholusedisorder: "Unknown",
    hepatitisb: "Unknown",
    hepatitisc: "Unknown",
    hiv: "Unknown",
    comorbidities: [],
    disabilities: [],
    //Peripherals
    healthinstitutions: [],
    modalicdstatus: false,
    eraedta_search: "",
    eraedta_searchresults: [],
    icd10direction: "",
    comorbiditiesmaster: [],
    comorbiditystatus: false,
    disabilitiesmaster: [],
    disabilitystatus: false,
    //STATE ADDITIONS
    showModalSelector: false,
    navPath: 0,
    //ERA-EDTA SUPPORT
    primaryrenaldiagnosiscode: "",
    primaryrenaldiagnosisdescription: "",
    secondaryrenaldiagnosiscode: "",
    secondaryrenaldiagnosisdescription: "",
    eraedta_selectedobject:{},
    //health institution mapping
    healthinstitutioncode:'',
    healthinstitutiondescription:'',
    //hd unit mapping
    hdunits:[],
    hdunitcode:'',
    hdunitdescription:'',
    hdunit: '',
    hdunit_object:{},
    hdaccess:'Unknown'
  };

  PatientOptionSelected(val) {
    utils.setTempMemory(this.state);
    this.setState({ navPath: val });
  }

  async componentDidMount() {
    var _listhealthinstitutions = [];
    var _comorbiditiesmaster = [];
    var _disabilitiesmaster = [];
    var _eraedta_searchresults = [];
    var _hdunits = [];
    _hdunits = await listhemodialysisunits();
    _eraedta_searchresults = await readeraedtatable();
    _listhealthinstitutions = await listhealthinstitutions();
    if (_listhealthinstitutions.length > 0) {
      this.setState({
        healthinstitutions: _listhealthinstitutions,
        healthinstitution: _listhealthinstitutions[0].code + ' - ' + _listhealthinstitutions[0].description,
        healthinstitution_object:_listhealthinstitutions[0]
      });
    }
    if (_hdunits.length > 0) {
      this.setState({
        hdunits: _hdunits,
        hdunit: _hdunits[0].code + ' - ' + _hdunits[0].description,
        hdunit_object:_hdunits[0]
      });
    }
    //Read memory bus
    let restoredState = utils.getTempMemory();
    restoredState.dateofbirth = new moment(restoredState.dateofbirth);
    restoredState.dateperformed = new moment(restoredState.dateperformed);
    this.setState(restoredState);
    console.log("restoredState", restoredState);
    if (_eraedta_searchresults.length > 0) {
      this.setState({
        eraedta_searchresults: _eraedta_searchresults,
      });
    }
    _disabilitiesmaster = await listdisabilitiesmaster();
    _comorbiditiesmaster = await listcomorbiditiesmaster();

    if (_disabilitiesmaster.length > 0) {
      this.setState({
        disabilitiesmaster: _disabilitiesmaster,
      });
    }

    if (_comorbiditiesmaster.length > 0) {
      this.setState({
        comorbiditiesmaster: _comorbiditiesmaster,
      });
    }
  }

  render() {
    return (
      <div>
        {renderIf(this.state.navPath == 1)(
          <Navigate to="/editpatient" replace={true} />
        )}

        {renderIf(this.state.navPath == 2)(
          <Navigate to="/listmodeofdialysis" replace={true} />
        )}
        {renderIf(this.state.navPath == 3)(
          <Navigate to="/newmodeofdialysis" replace={true} />
        )}

        {renderIf(this.state.navPath == 4)(
          <Navigate to="/dialysishistory" replace={true} />
        )}
        {renderIf(this.state.navPath == 5)(
          <Navigate to="/newdialysis" replace={true} />
        )}
        {renderIf(this.state.navPath == 6)(
          <Navigate to="/stopdialysis" replace={true} />
        )}
        {renderIf(this.state.navPath == 7)(
          <Navigate to="/listpatients" replace={true} />
        )}
        {renderIf(this.state.navPath == 8)(
            <Navigate to="/viewpatient" replace={true} />
        )}

        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Button
              id="fade-button"
              onClick={() => this.setState({ showModalSelector: true })}
              variant="contained"
              color="secondary"
              endIcon={<ArrowCircleDownIcon />}
            >
              Navigation options
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
          <Stepper
            activeStep={this.state.activeStep}
            alternativeLabel
            style={{ padding: 20 }}
          >
            <Step key={"Identification"} style={{ cursor: "pointer" }}>
              <StepLabel>{"Identification"}</StepLabel>
            </Step>
            <Step key={"Other Details"} style={{ cursor: "pointer" }}>
              <StepLabel>{"Other Details"}</StepLabel>
            </Step>
            <Step key={"Renal Profile"} style={{ cursor: "pointer" }}>
              <StepLabel>{"Renal Profile"}</StepLabel>
            </Step>
            <Step key={"Assessment"} style={{ cursor: "pointer" }}>
              <StepLabel>{"Assessment"}</StepLabel>
            </Step>
          </Stepper>

          <div style={{ margin: "auto", maxWidth: "90vw", marginTop: 20 }}>
            {
              //Identification
              renderIf(this.state.activeStep == 0)(
                <Fragment>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="choose-identifier-select-label">
                          Choose Identifier *
                        </InputLabel>
                        <Select
                          labelId="choose-identifier-select-label"
                          value={this.state.identifierselection}
                          label="Choose Identifier *"
                          onChange={(val) =>
                            this.setState({
                              identifierselection: val.target.value,
                            })
                          }
                        >
                          <MenuItem value={"National ID Number"}>
                            National ID Number
                          </MenuItem>
                          <MenuItem value={"Passport Number"}>
                            Passport Number
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          required
                          labelId="nicpassport-label"
                          id="outlined-basic"
                          value={this.state.identifiervalue}
                          onChange={(e) =>
                            this.setState({ identifiervalue: e.target.value })
                          }
                          label="NIC/Passport Number"
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="choose-healthinstitution-select-label">
                          Health Institution *
                        </InputLabel>
                        <Select
                          labelId="choose-healthinstitution-select-label"
                          label="Health Institution *"
                          value={this.state.healthinstitution}
                          onChange={(val) =>
                            this.setState({
                              healthinstitution: val.target.value,
                            })
                          }
                        >
                          {this.state.healthinstitutions.map((institution) => {
                            let resultant = institution.code + ' - ' + institution.description;
                            return (
                                <MenuItem
                                    key={institution.pkhealthinstitutionid}
                                    value={resultant}
                                >
                                  {resultant}
                                </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          label="Unit Number"
                          variant="outlined"
                          value={this.state.unitnumber}
                          onChange={(val) =>
                            this.setState({ unitnumber: val.target.value })
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          required
                          label="Surname"
                          variant="outlined"
                          value={this.state.surname}
                          onChange={(val) =>
                            this.setState({ surname: val.target.value })
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          required
                          label="Name"
                          variant="outlined"
                          value={this.state.name}
                          onChange={(val) =>
                            this.setState({ name: val.target.value })
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <MobileDatePicker
                            label="Date of Birth"
                            inputFormat="DD/MM/YYYY"
                            value={this.state.dateofbirth}
                            onChange={(e) => this.computeEGFR_Age(e)}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>

                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="choose-gender-select-label">
                          Gender
                        </InputLabel>
                        <Select
                          labelId="choose-gender-select-label"
                          value={this.state.gender}
                          label="Gender"
                          onChange={(e) =>
                            this.computeEGFR_Gender(e.target.value)
                          }
                        >
                          <MenuItem value={"Male"}>Male</MenuItem>
                          <MenuItem value={"Female"}>Female</MenuItem>
                          <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          label="Address"
                          variant="outlined"
                          value={this.state.address}
                          onChange={(val) =>
                            this.setState({ address: val.target.value })
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          label="Home Number"
                          variant="outlined"
                          value={this.state.homenumber}
                          onChange={(val) =>
                            this.setState({ homenumber: val.target.value })
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          label="Mobile Number"
                          variant="outlined"
                          value={this.state.mobilenumber}
                          onChange={(val) =>
                            this.setState({ mobilenumber: val.target.value })
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          label="Email Address"
                          variant="outlined"
                          value={this.state.emailaddress}
                          onChange={(val) =>
                            this.setState({ emailaddress: val.target.value })
                          }
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Fragment>
              )
            }
            {
              //Other Details
              renderIf(this.state.activeStep == 1)(
                <Fragment>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          label="Height (cm)"
                          variant="outlined"
                          value={this.state.height}
                          onChange={(val) =>
                            this.setState({ height: val.target.value })
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          label="Weight (kg)"
                          variant="outlined"
                          value={this.state.weight}
                          onChange={(val) =>
                            this.setState({ weight: val.target.value })
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          label="Birth Weight (kg)"
                          variant="outlined"
                          value={this.state.birthweight}
                          onChange={(val) =>
                            this.setState({ birthweight: val.target.value })
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="choose-Religion-select-label">
                          Religion
                        </InputLabel>
                        <Select
                          labelId="choose-Religion-select-label"
                          value={this.state.ethnicgroup}
                          label="Gender"
                          onChange={(val) =>
                            this.setState({ ethnicgroup: val.target.value })
                          }
                        >
                          <MenuItem value={"General Population"}>General Population</MenuItem>
                          <MenuItem value={"Hindu"}>Hindu</MenuItem>
                          <MenuItem value={"Islam"}>Islam</MenuItem>
                          <MenuItem value={"Chinese (Buddhist)"}>Chinese (Buddhist)</MenuItem>
                          <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="choose-maritalstatus-select-label">
                          Marital Status
                        </InputLabel>
                        <Select
                          labelId="choose-maritalstatus-select-label"
                          value={this.state.maritalstatus}
                          label="Gender"
                          onChange={(val) =>
                            this.setState({ maritalstatus: val.target.value })
                          }
                        >
                          <MenuItem value={"Single"}>Single</MenuItem>
                          <MenuItem value={"Married"}>Married</MenuItem>
                          <MenuItem value={"Widow"}>Widow</MenuItem>
                          <MenuItem value={"Divorced"}>Divorced</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="choose-Occupation-select-label">
                          Occupation
                        </InputLabel>
                        <Select
                          labelId="choose-Occupation-select-label"
                          value={this.state.occupation}
                          label="Gender"
                          onChange={(val) =>
                            this.setState({ occupation: val.target.value })
                          }
                        >
                          <MenuItem value={"Employed"}>Employed</MenuItem>
                          <MenuItem value={"Unemployed"}>Unemployed</MenuItem>
                          <MenuItem value={"Housewife"}>Housewife</MenuItem>
                          <MenuItem value={"Retired"}>Retired</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          label="Current Employment"
                          variant="outlined"
                          value={this.state.currentemployment}
                          onChange={(val) =>
                            this.setState({
                              currentemployment: val.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          label="Previous Occupation"
                          variant="outlined"
                          value={this.state.previousoccupation}
                          onChange={(val) =>
                            this.setState({
                              previousoccupation: val.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Fragment>
              )
            }
            {
              //Renal Profile
              renderIf(this.state.activeStep == 2)(
                <Fragment>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                      <div style={{ flexDirection: "row", display: "flex" }}>
                        <Typography
                          labelId="choose-prd-select-label"
                          style={{
                            flexGrow: 1,
                            fontSize: 20,
                            fontWeight: "bold",
                          }}
                        >
                          {this.state.primaryrenaldiagnosis}
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={() =>
                            this.setState({
                              icd10direction: "PRIMARY",
                              modalicdstatus: true,
                            })
                          }
                        >
                          Select code
                        </Button>
                      </div>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <div style={{ flexDirection: "row", display: "flex" }}>
                        <Typography
                          labelId="choose-prd-select-label"
                          variant="h6"
                          style={{
                            flexGrow: 1,
                            fontSize: 20,
                            fontWeight: "bold",
                          }}
                        >
                          {this.state.secondaryrenaldiagnosis}
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={() =>
                            this.setState({
                              icd10direction: "SECONDARY",
                              modalicdstatus: true,
                            })
                          }
                        >
                          Select code
                        </Button>
                      </div>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant={"h6"}>
                        Is the patient already on dialysis?
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={this.state.patientondialysis}
                        onChange={(x) =>
                          this.setState({ patientondialysis: x.target.value })
                        }
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </Grid>

                    <Grid item xs={6} md={6}>
                      <Typography variant={"h6"}>
                        Racial type? ((If in doubt eg mixed race select 'other')
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={this.state.isblack}
                        onChange={(e) => this.computeEGFR_Black(e.target.value)}
                      >
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="All other races"
                        />
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Afro/Black"
                        />
                      </RadioGroup>
                    </Grid>

                  </Grid>
                  {renderIf(this.state.patientondialysis.toString()=='false')(
                      <Container maxWidth="lg" style={{marginTop:20}}>
                        <Box sx={{ bgcolor: '#cfe8fc'  }}>
                          <Grid spacing={2} container style={{padding:20}}>
                            <Grid item xs={6} md={6}>
                              <FormControl fullWidth>
                                <TextField
                                    value={this.state.latestcreatinine}
                                    onChange={(e) =>
                                        this.computeEGFR_CREATININE(e.target.value)
                                    }
                                    type={"numeric"}
                                    label="Latest creatinine (umol/L)"
                                    variant="outlined"
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={6} md={6}>
                              <Typography
                                  variant={"h6"}
                                  style={{ color: "red", fontWeight: "bold", margin: 10 }}
                              >
                                {this.state.calculatedegfr}
                              </Typography>
                            </Grid>

                            <Grid item xs={6} md={6}>
                              <FormControl fullWidth>
                                <TextField
                                    value={this.state.latesthb}
                                    onChange={(e) =>
                                        this.setState({ latesthb: e.target.value })
                                    }
                                    type={"numeric"}
                                    label="Latest Hb (g/dl)"
                                    variant="outlined"
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={6} md={6}>
                              <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                  <MobileDatePicker
                                      label="Date done"
                                      inputFormat="DD/MM/YYYY"
                                      value={this.state.dateperformed}
                                      onChange={(e) =>
                                          this.setState({ dateperformed: e })
                                      }
                                      renderInput={(params) => <TextField {...params} />}
                                  />
                                </LocalizationProvider>
                              </FormControl>
                            </Grid>
                            <Grid item xs={6} md={6}>
                              <FormControl fullWidth>
                                <InputLabel id="choose-modality-select-label">
                                  Mode of Dialysis
                                </InputLabel>
                                <Select
                                    labelId="choose-Occupation-select-label"
                                    value={this.state.modeofdialysis}
                                    label="Mode of Dialysis"
                                    onChange={(val) =>
                                        this.setState({ modeofdialysis: val.target.value })
                                    }
                                >
                                  <MenuItem value={"Hemodialysis (HD)"}>Hemodialysis (HD)</MenuItem>
                                  <MenuItem value={"Peritoneal Dialysis (PD)"}>Peritoneal Dialysis (PD)</MenuItem>
                                  <MenuItem value={"TX (On treatment)"}>TX (On treatment)</MenuItem>
                                  <MenuItem value={"NK (Native kidney function)"}>NK (Native kidney function)</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Box>
                      </Container>)}

                  {renderIf(this.state.patientondialysis.toString()=='true')(
                      <Container maxWidth="lg" style={{marginTop:20}}>
                        <Box sx={{ bgcolor: '#cfe8fc'  }}>
                          <Grid spacing={2} container style={{padding:20}}>
                            <Grid item xs={6} md={6}>
                              <FormControl fullWidth>
                                <InputLabel id="choose-hd-select-label">
                                  Hemodialysis Unit (HD UNIT)
                                </InputLabel>
                                <Select
                                    labelId="choose-hd-select-label"
                                    label="Hemodialysis Unit (HD UNIT) *"
                                    value={this.state.hdunit}
                                    onChange={(val) =>
                                        this.setState({
                                          hdunit: val.target.value,
                                        })
                                    }
                                >
                                  {this.state.hdunits.map((unit) => {
                                    let resultant = unit.code + ' - ' + unit.description;
                                    return (
                                        <MenuItem
                                            key={unit.code}
                                            value={resultant}
                                        >
                                          {resultant}
                                        </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={6} md={6}>
                              <FormControl fullWidth>
                                <InputLabel id="choose-hdaccess-select-label">
                                  Initial Access
                                </InputLabel>
                                <Select
                                    labelId="choose-hdaccess-select-label"
                                    value={this.state.hdaccess}
                                    label="Gender"
                                    onChange={(e) =>
                                        this.setState({hdaccess:e.target.value})
                                    }
                                >
                                  <MenuItem value={"Unknown"}>Unknown</MenuItem>
                                  <MenuItem value={"Arteriovenous Fistula (AVF)"}>Arteriovenous Fistula (AVF)</MenuItem>
                                  <MenuItem value={"Arteriovenous Graft (AVG)"}>Arteriovenous Graft (AVG)</MenuItem>
                                  <MenuItem value={"Tunneled Catheter (TC)"}>Tunneled Catheter (TC)</MenuItem>
                                  <MenuItem value={"Non Tunneled Catheter (NTC)"}>Non Tunneled Catheter (NTC)</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Box>
                      </Container>)}

                </Fragment>
              )
            }
            {
              //Assessment
              renderIf(this.state.activeStep == 3)(
                <Fragment>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={6}
                      md={6}
                      style={{ flexDirection: "column", display: "flex" }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                          <Typography
                            variant={"h5"}
                            style={{ fontWeight: "bold" }}
                          >
                            Comorbidities
                          </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Button
                            onClick={() =>
                              this.setState({ comorbiditystatus: true })
                            }
                            variant={"contained"}
                            style={{ fontWeight: "bold" }}
                          >
                            Add
                          </Button>
                        </Grid>
                      </Grid>
                      <div style={{ height: 200, overflowY: "auto" }}>
                        {this.state.comorbidities.map((item) => {
                          return (
                            <ListItemAssessment
                              data={item}
                              OnRemove={(item) => this.removeComorbidity(item)}
                            />
                          );
                        })}
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      md={6}
                      style={{ flexDirection: "column", display: "flex" }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                          <Typography
                            variant={"h5"}
                            style={{ fontWeight: "bold", marginTop: 5 }}
                          >
                            Disabilities
                          </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Button
                            onClick={() =>
                              this.setState({ disabilitystatus: true })
                            }
                            variant={"contained"}
                            style={{ fontWeight: "bold", marginTop: 5 }}
                          >
                            Add
                          </Button>
                        </Grid>
                      </Grid>
                      <div style={{ height: 200, overflowY: "auto" }}>
                        {this.state.disabilities.map((item) => {
                          return (
                            <ListItemAssessment
                              data={item}
                              OnRemove={(item) => this.removeDisability(item)}
                            />
                          );
                        })}
                      </div>
                    </Grid>

                    <Grid item xs={6} md={6}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "75%",
                          marginLeft: 25,
                        }}
                      >
                        <Typography
                          variant={"h5"}
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          Clinical Frailty Scale :
                          <Typography
                            variant={"h5"}
                            style={{ fontWeight: "bold", marginLeft: 5 }}
                          >
                            {this.state.clinicalfrailtymessage}
                          </Typography>
                        </Typography>
                        <Slider
                          aria-label="Always visible"
                          valueLabelDisplay="on"
                          value={this.state.clinicalfrailtyscale}
                          style={{ marginTop: 35 }}
                          onChange={(x) => this.handleSlider(x.target.value)}
                          min={1}
                          max={9}
                          step={1}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth style={{ marginTop: 25 }}>
                        <InputLabel id="choose-smoke-select-label">
                          Smoking Status *
                        </InputLabel>
                        <Select
                          labelId="choose-smoke-select-label"
                          value={this.state.smokingstatus}
                          label="Gender"
                          onChange={(val) =>
                            this.setState({ smokingstatus: val.target.value })
                          }
                        >
                          <MenuItem value={"Unknown"}>Unknown</MenuItem>
                          <MenuItem value={"Never Smoked"}>
                            Never Smoked
                          </MenuItem>
                          <MenuItem value={"Smoker"}>Smoker</MenuItem>
                          <MenuItem value={"Stopped"}>Stopped</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="choose-alcohol-select-label">
                          Alcohol use disorder *
                        </InputLabel>
                        <Select
                          labelId="choose-alcohol-select-label"
                          value={this.state.alcoholusedisorder}
                          label="Gender"
                          onChange={(val) =>
                            this.setState({
                              alcoholusedisorder: val.target.value,
                            })
                          }
                        >
                          <MenuItem value={"Unknown"}>Unknown</MenuItem>
                          <MenuItem value={"Never"}>Never</MenuItem>
                          <MenuItem value={"Active"}>Active</MenuItem>
                          <MenuItem value={"Stopped"}>Stopped</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="choose-hepb-select-label">
                          Hepatitis B *
                        </InputLabel>
                        <Select
                          labelId="choose-hepb-select-label"
                          value={this.state.hepatitisb}
                          label="Gender"
                          onChange={(val) =>
                            this.setState({ hepatitisb: val.target.value })
                          }
                        >
                          <MenuItem value={"Unknown"}>Unknown</MenuItem>
                          <MenuItem value={"Positive"}>Positive</MenuItem>
                          <MenuItem value={"Negative"}>Negative</MenuItem>
                          <MenuItem value={"Immune"}>Immune</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="choose-hepc-select-label">
                          Hepatitis C *
                        </InputLabel>
                        <Select
                          labelId="choose-hepc-select-label"
                          value={this.state.hepatitisc}
                          label="Gender"
                          onChange={(val) =>
                            this.setState({ hepatitisc: val.target.value })
                          }
                        >
                          <MenuItem value={"Unknown"}>Unknown</MenuItem>
                          <MenuItem value={"Positive"}>Positive</MenuItem>
                          <MenuItem value={"Negative"}>Negative</MenuItem>
                          <MenuItem value={"Cured"}>Cured</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="choose-hepc-select-label">
                          HIV *
                        </InputLabel>
                        <Select
                          labelId="choose-hepc-select-label"
                          value={this.state.hiv}
                          label="Gender"
                          onChange={(val) =>
                            this.setState({ hiv: val.target.value })
                          }
                        >
                          <MenuItem value={"Unknown"}>Unknown</MenuItem>
                          <MenuItem value={"Positive"}>Positive</MenuItem>
                          <MenuItem value={"Negative"}>Negative</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Fragment>
              )
            }

            {/* Comorbidities SELECTOR MODAL */}
            <Dialog
              open={this.state.comorbiditystatus}
              onClose={() => this.setState({ comorbiditystatus: false })}
            >
              <DialogTitle>Choose a Comorbidity</DialogTitle>
              <DialogContent>
                <List style={{ height: 500, overflowY: "auto", width: 500 }}>
                  {this.state.comorbiditiesmaster.map((item) => {
                    return (
                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={() => this.confirmComorbidity(item)}
                        >
                          <ListItemText primary={item.name} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </DialogContent>
            </Dialog>
            {/* Comorbidities SELECTOR MODAL */}

            {/* Disabilities SELECTOR MODAL */}
            <Dialog
              open={this.state.disabilitystatus}
              onClose={() => this.setState({ disabilitystatus: false })}
            >
              <DialogTitle>Choose a Disability</DialogTitle>
              <DialogContent>
                <List style={{ height: 500, overflowY: "auto", width: 500 }}>
                  {this.state.disabilitiesmaster.map((item) => {
                    return (
                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={() => this.confirmDisability(item)}
                        >
                          <ListItemText primary={item.name} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </DialogContent>
            </Dialog>
            {/* Disabilities SELECTOR MODAL */}

            {/* ICD 10 SELECTOR MODAL */}
            <Dialog
              open={this.state.modalicdstatus}
              onClose={() => this.setState({ modalicdstatus: false })}
            >
              <DialogTitle>Choose an ICD-10 Code</DialogTitle>
              <DialogContent>
                <TextField
                  style={{ width: 550 }}
                  value={this.state.eraedta_search}
                  onKeyDown={(e) => this.seekicd10(e)}
                  onChange={(e) =>
                    this.setState({ eraedta_search: e.target.value })
                  }
                  placeholder="Type here & hit enter"
                  inputProps={{
                    "aria-label": "Type here & hit enter",
                  }}
                />

                <List style={{ height: 500, overflowY: "auto" }}>
                  {this.state.eraedta_searchresults.map((item) => {
                    return (
                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={() =>
                            this.setState({
                              eraedta_search: item.code + " - " + item.description,
                              eraedta_selectedobject:item
                            })
                          }
                        >
                          <ListItemText
                            primary={item.code + "-" + item.description}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => this.setState({ modalicdstatus: false })}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={() => this.confirmICD10Code()}
                >
                  Choose code
                </Button>
              </DialogActions>
            </Dialog>
            {/* ICD 10 SELECTOR MODAL */}
          </div>

          <Box sx={{ mb: 2 }} className={"bottom-centered"}>
            <div>
              <Button
                variant="contained"
                onClick={() => this.handleNext()}
                sx={{ mt: 1, mr: 1 }}
                style={{ fontWeight: "bold" }}
              >
                {this.state.activeStep === 3 ? "Update Patient" : "Continue"}
              </Button>
              <Button
                disabled={this.state.activeStep === 0}
                onClick={() => this.handleBack()}
                style={{ fontWeight: "bold" }}
                sx={{ mt: 1, mr: 1 }}
              >
                Back
              </Button>
            </div>
          </Box>
        </Paper>
      </div>
    );
  }

  handleNext() {
    if (this.state.activeStep < 3) {
      this.setState({ activeStep: this.state.activeStep + 1 });
    }
    this.updatePatient();
  }
  handleBack() {
    if (this.state.activeStep >= 0) {
      this.setState({ activeStep: this.state.activeStep - 1 });
    }
  }

  handleSlider(value) {
    this.setState({
      clinicalfrailtyscale: value,
      clinicalfrailtymessage: utils.ClinicalFrailtyScaleExplanativeText(value),
    });
  }

  //EGFR MODIFIERS -- Age/Black/Female/Creatinine

  //Age
  computeEGFR_Age(dateofbirth) {
    var isFemale = false;
    if (this.state.gender == "Female") {
      isFemale = true;
    }
    const egfr = utils.calculateEGFR(
      parseFloat(this.state.latestcreatinine.toString()),
      moment().diff(dateofbirth, "years"),
      this.state.isblack,
      isFemale
    );
    this.setState({
      egfr: egfr,
      dateofbirth: dateofbirth,
      calculatedegfr: "Estimated eGFR : " + egfr + " ml/min",
    });
  }
  //Black
  computeEGFR_Black(isBlack) {
    var isFemale = false;
    if (this.state.gender == "Female") {
      isFemale = true;
    }
    const egfr = utils.calculateEGFR(
      parseFloat(this.state.latestcreatinine.toString()),
      moment().diff(this.state.dateofbirth, "years"),
      isBlack,
      isFemale
    );
    this.setState({
      isblack: isBlack,
      egfr: egfr,
      calculatedegfr: "Estimated eGFR : " + egfr + " ml/min",
    });
  }

  //Female
  computeEGFR_Gender(gender) {
    var isFemale = false;
    if (this.state.gender == "Female") {
      isFemale = true;
    }
    const egfr = utils.calculateEGFR(
      parseFloat(this.state.latestcreatinine.toString()),
      moment().diff(this.state.dateofbirth, "years"),
      this.state.isblack,
      isFemale
    );
    this.setState({
      gender: gender,
      egfr: egfr,
      calculatedegfr: "Estimated eGFR : " + egfr + " ml/min",
    });
  }

  //Creatinine
  computeEGFR_CREATININE(creatininevalue) {
    var isFemale = false;
    if (this.state.gender == "Female") {
      isFemale = true;
    }
    const egfr = utils.calculateEGFR(
      creatininevalue,
      moment().diff(this.state.dateofbirth, "years"),
      this.state.isblack,
      isFemale
    );
    this.setState({
      egfr: egfr,
      latestcreatinine: creatininevalue,
      calculatedegfr: "Estimated eGFR : " + egfr + " ml/min",
    });
  }

  //Update Patient API Call
  async updatePatient() {
    if (this.state.activeStep == 3) {
      var objectToSend = this.state;
      objectToSend.createdby = window.localStorage.getItem("login");
      objectToSend.healthinstitutioncode = this.state.healthinstitution.toString().split(" - ")[0];
      objectToSend.healthinstitutiondescription = this.state.healthinstitution.toString().split(" - ")[1];
      objectToSend.hdunitcode = this.state.hdunit.toString().split(" - ")[0];
      objectToSend.hdunitdescription = this.state.hdunit.toString().split(" - ")[1];
      objectToSend.dateofbirth = moment(this.state.dateofbirth).format(
        "YYYY-MM-DD"
      );
      objectToSend.dateperformed = moment(this.state.dateperformed).format(
        "YYYY-MM-DD"
      );
      console.log("objectToSend", objectToSend);
      //   let registerPT = await registerpatient(objectToSend);
      //   console.log(registerPT);
      let updatePT = await updatepatientregistration(objectToSend);
      console.log(updatePT);
      this.setState({ operationComplete: true, navPath: 8 });
    }
  }

  async seekicd10(e) {
    if (e.keyCode == 13) {
      let results = await seekeraedta(this.state.eraedta_search);
      this.setState({ eraedta_searchresults: results });
    }
  }

  confirmICD10Code() {
    if (this.state.icd10direction == "PRIMARY") {
      this.setState({
        modalicdstatus: false,
        primaryrenaldiagnosiscode: this.state.eraedta_selectedobject.code,
        primaryrenaldiagnosisdescription: this.state.eraedta_selectedobject.description,
        primaryrenaldiagnosis:this.state.eraedta_selectedobject.code + " - " + this.state.eraedta_selectedobject.description
      });
    } else {
      this.setState({
        modalicdstatus: false,
        secondaryrenaldiagnosiscode: this.state.eraedta_selectedobject.code,
        secondaryrenaldiagnosisdescription: this.state.eraedta_selectedobject.description,
        secondaryrenaldiagnosis:this.state.eraedta_selectedobject.code + " - " + this.state.eraedta_selectedobject.description
      });
    }
  }

  confirmComorbidity(item) {
    var comorbidities = this.state.comorbidities;
    comorbidities.push(item);
    this.setState({ comorbiditystatus: false, comorbidities: comorbidities });
  }

  removeComorbidity(item) {
    const indexToRemove = parseInt(item.pkcomorbidityid);
    var newBuffer = [];
    this.state.comorbidities.map((x) => {
      if (parseInt(x.pkcomorbidityid) != indexToRemove) {
        newBuffer.push(x);
      }
    });
    this.setState({ comorbidities: newBuffer });
  }

  confirmDisability(item) {
    var disabilities = this.state.disabilities;
    disabilities.push(item);
    this.setState({ disabilitystatus: false, disabilities: disabilities });
  }

  removeDisability(item) {
    const indexToRemove = parseInt(item.pkdisabilityid);
    var newBuffer = [];
    this.state.disabilities.map((x) => {
      if (parseInt(x.pkdisabilityid) != indexToRemove) {
        newBuffer.push(x);
      }
    });
    this.setState({ disabilities: newBuffer });
  }
}
