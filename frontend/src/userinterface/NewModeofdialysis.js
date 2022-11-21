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
  Slider,
  Dialog,
  DialogTitle,
  DialogContent,
  AppBar,
  Toolbar,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import renderIf from "render-if";
import utils from "../utils";
import ListItemAssessment from "../components/ListItemAssessment";
import {
  listhemodialysisunits,
  listcomorbiditiesmaster,
  listdisabilitiesmaster,
} from "../apis/master-lists";
import { createmodeofdialysis } from "../apis/dialysis-api";
import { Navigate } from "react-router-dom";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
export default class NewModeofdialysis extends Component {
  state = {
    activeStep: 0,
    modeofdialysis: "Native Kidney Function (NK)",
    hemodialysisunits: [],
    hemodialysisunit: "",
    accessonfirsthemodialysis: "Unknown",
    hemodialysisstartedinprivate: false,
    pdwholedaysbeforefirstexchange: "",
    pdcatheterinsertiontechnique: "Unknown",
    //Assessment
    clinicalfrailtyscale: 1,
    clinicalfrailtymessage: utils.ClinicalFrailtyScaleExplanativeText(1),
    smokingstatus: "Unknown",
    alcoholusedisorder: "Unknown",
    hepatitisb: "Unknown",
    hepatitisc: "Unknown",
    hiv: "Unknown",
    comorbidities: [],
    disabilities: [],
    comorbiditiesmaster: [],
    comorbiditystatus: false,
    disabilitiesmaster: [],
    disabilitystatus: false,
    //STATE ADDITIONS
    showModalSelector: false,
    navPath: 0,
    //FORM C ADDITIONS
    dtmodechange : moment(new Date()),
    firstkrt:false,
    visitbeforekrt:'ROPD',
    seendaysbeforekrt:'',
    lastcreatininebeforekrt:'',
    lastegfrbeforekrt:'',
    lasthbbeforekrt:'',
    completedhepb:'Unknown',
    dialysisdelay:false,
    daysofdelay:'',
    whynotavgavf:'Not created',
    createdby:'',
    //hd unit mapping
    hdunits:[],
    hdunitcode:'',
    hdunitdescription:'',
    hdunit: '',
    hdunit_object:{},
    hdaccess:'Unknown'
  };
  PatientOptionSelected(val) {
    this.setState({ navPath: val });
  }
  async componentDidMount() {
    var _hdunits = [];
    _hdunits = await listhemodialysisunits();
    let restoredState = utils.getTempMemory();
    this.setState(restoredState);
    if (_hdunits && _hdunits.length > 0) {
      this.setState({
        hdunits: _hdunits,
        hdunit: _hdunits[0].code + ' - ' + _hdunits[0].description,
        hdunit_object:_hdunits[0]
      });
    }
    var _comorbiditiesmaster = [];
    var _disabilitiesmaster = [];
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

        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography
              onClick={() => this.setState({ showModalSelector: false })}
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
              style={{ marginRight: 25 }}
            >
              New mode of dialysis
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
          <Stepper
            activeStep={this.state.activeStep}
            alternativeLabel
            style={{ padding: 20 }}
          >
            <Step key={"Mode of Dialysis"} style={{ cursor: "pointer" }}>
              <StepLabel>{"Mode of Dialysis"}</StepLabel>
            </Step>
            <Step key={"Assessment"} style={{ cursor: "pointer" }}>
              <StepLabel>{"Assessment"}</StepLabel>
            </Step>
          </Stepper>
          <div style={{ margin: "auto", maxWidth: "90vw", marginTop: 20 }}>
            {renderIf(this.state.activeStep == 0)(
              <Fragment>

                <Grid container spacing={2}>
                  <Grid item xs={6} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="choose-xmodeofdialysis-select-label">
                        New mode of dialysis :
                      </InputLabel>
                      <Select
                          labelId="choose-xmodeofdialysis-select-label"
                          value={this.state.modeofdialysis}
                          label="Gender"
                          onChange={(val) =>
                              this.setState({
                                modeofdialysis: val.target.value,
                              })
                          }
                      >
                        <MenuItem value={"Native Kidney Function (NK)"}>Native Kidney Function (NK)</MenuItem>
                        <MenuItem value={"Hemodialysis (HD)"}>
                          Hemodialysis (HD)
                        </MenuItem>
                        <MenuItem value={"Peritoneal Dialysis (PD)"}>
                          Peritoneal Dialysis (PD)
                        </MenuItem>
                        <MenuItem value={"Treatment (TX)"}>
                          Treatment (TX)
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <MobileDatePicker
                            label="Date of modality change"
                            inputFormat="DD/MM/YYYY"
                            value={this.state.dtmodechange}
                            onChange={(e) => this.setState({ dtmodechange: e })}
                            renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <FormControl fullWidth>
                      <FormLabel id="demo-row-radio-buttons-group-label">Is this the first KRT Modality?</FormLabel>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          value={this.state.firstkrt}
                          onChange={(e) => this.setState({firstkrt:e.target.value})}
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
                    </FormControl>
                  </Grid>

                  <Grid item xs={6} md={6}>
                    {renderIf(this.state.modeofdialysis == "Hemodialysis (HD)")(
                        <FormControl fullWidth style={{ marginTop: 20 }}>
                          <InputLabel id="choose-x-select-label">
                            Access on first Hemodialysis
                          </InputLabel>
                          <Select
                              labelId="choose-x-select-label"
                              value={this.state.accessonfirsthemodialysis}
                              label="Gender"
                              onChange={(val) =>
                                  this.setState({
                                    accessonfirsthemodialysis: val.target.value,
                                  })
                              }
                          >
                            <MenuItem value={"Unknown"}>Unknown</MenuItem>
                            <MenuItem value={"Arteriovenous Fistula (AVF)"}>
                              Arteriovenous Fistula (AVF)
                            </MenuItem>
                            <MenuItem value={"Arteriovenous Graft (AVG)"}>
                              Arteriovenous Graft (AVG)
                            </MenuItem>
                            <MenuItem value={"Tunneled catheter (TC)"}>
                              Tunneled catheter (TC)
                            </MenuItem>
                            <MenuItem value={"Non-tunneled catheter (NTC)"}>
                              Non-tunneled catheter (NTC)
                            </MenuItem>
                          </Select>
                        </FormControl>
                    )}
                  </Grid>

                  {renderIf(this.state.accessonfirsthemodialysis == "Tunneled catheter (TC)"||this.state.accessonfirsthemodialysis == "Non-tunneled catheter (NTC)")(
                      <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="choose-x5-select-label">
                          Why AVF/AVG not used to initiate HD?
                        </InputLabel>
                        <Select
                            labelId="choose-x5-select-label"
                            value={this.state.whynotavgavf}
                            label="Gender"
                            onChange={(val) =>
                                this.setState({
                                  whynotavgavf: val.target.value,
                                })
                            }
                        >
                          <MenuItem value={"Not created"}>Not created</MenuItem>
                          <MenuItem value={"Not ready"}>
                            Not ready
                          </MenuItem>
                          <MenuItem value={"Already failed"}>
                            Already failed
                          </MenuItem>
                        </Select>
                      </FormControl>
                      </Grid>
                  )}


                  <Grid item xs={6} md={6}>
                    {renderIf(this.state.modeofdialysis == "Hemodialysis (HD)")(
                        <FormControl fullWidth>
                          <InputLabel id="choose-z-select-label">
                            If Hemodialysis, state Hemodialysis Unit
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
                    )}
                  </Grid>
                  <Grid item xs={6} md={6}>
                    {renderIf(this.state.modeofdialysis == "Hemodialysis (HD)")(
                          <FormControl fullWidth>
                            <FormLabel id="demo-row-radio-buttons-group-label">
                              Hemodialysis started in private?
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={this.state.hemodialysisstartedinprivate}
                                onChange={(e) =>
                                    this.setState({
                                      hemodialysisstartedinprivate: e.target.value,
                                    })
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
                          </FormControl>
                    )}
                  </Grid>
                  <Grid item xs={6} md={6}>
                    {renderIf(this.state.modeofdialysis == "Peritoneal Dialysis (PD)")(
                          <FormControl fullWidth>
                            <TextField
                                value={this.state.pdwholedaysbeforefirstexchange}
                                onChange={(e) =>
                                    this.setState({
                                      pdwholedaysbeforefirstexchange: e.target.value,
                                    })
                                }
                                label="How early was the Peritoneal dialysis catheter inserted (whole days before first exchange)?"
                                variant="outlined"
                            />
                          </FormControl>
                    )}
                  </Grid>
                  <Grid item xs={6} md={6}>
                    {renderIf(this.state.modeofdialysis == "Peritoneal Dialysis (PD)")(
                        <FormControl fullWidth>
                          <InputLabel id="choose-a-select-label">
                            Peritoneal dialysis catheter insertion technique
                          </InputLabel>
                          <Select
                              labelId="choose-a-select-label"
                              label="Peritoneal dialysis catheter insertion technique"
                              value={this.state.pdcatheterinsertiontechnique}
                              onChange={(val) =>
                                  this.setState({
                                    pdcatheterinsertiontechnique: val.target.value,
                                  })
                              }
                          >
                            <MenuItem value={"Unknown"}>Unknown</MenuItem>
                            <MenuItem value={"Open surgery"}>
                              Open surgery
                            </MenuItem>
                            <MenuItem value={"Laparoscopic"}>
                              Laparoscopic
                            </MenuItem>
                            <MenuItem value={"Percutaneous"}>
                              Percutaneous
                            </MenuItem>
                          </Select>
                        </FormControl>
                    )}
                  </Grid>
                </Grid>



                {renderIf(this.state.firstkrt.toString() == 'true')(
                <Box sx={{ bgcolor: '#cfe8fc'  }} style={{marginTop:20}}>
                  <Grid container spacing={2} style={{padding:10}}>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="choose-x1-select-label">
                          Which of the following has the patient seen in the year before starting KRT?
                        </InputLabel>
                        <Select
                            labelId="choose-x1-select-label"
                            value={this.state.visitbeforekrt}
                            label="Gender"
                            onChange={(val) =>
                                this.setState({
                                  visitbeforekrt: val.target.value,
                                })
                            }
                        >
                          <MenuItem value={"ROPD"}>ROPD</MenuItem>
                          <MenuItem value={"MOPD"}>
                            MOPD
                          </MenuItem>
                          <MenuItem value={"LHC"}>
                            LHC
                          </MenuItem>
                          <MenuItem value={"Other Hospital Doctor"}>
                            Other Hospital Doctor
                          </MenuItem>
                          <MenuItem value={"Private Nephrologist"}>
                            Private Nephrologist
                          </MenuItem>
                          <MenuItem value={"Other Private Doctor"}>
                            Other Private Doctor
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <TextField
                            value={this.state.seendaysbeforekrt}
                            onChange={(e) =>
                                this.setState({
                                  seendaysbeforekrt: e.target.value,
                                })
                            }
                            label="Time first seen by ROPD or private nephrologist in days before starting KRT"
                            variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <TextField
                            value={this.state.lastcreatininebeforekrt}
                            onChange={(e) =>
                                this.setState({
                                  lastcreatininebeforekrt: e.target.value,
                                })
                            }
                            label="Last creatinine before KRT"
                            variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <TextField
                            value={this.state.lastegfrbeforekrt}
                            onChange={(e) =>
                                this.setState({
                                  lastegfrbeforekrt: e.target.value,
                                })
                            }
                            label="Last eGFR before KRT"
                            variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <TextField
                            value={this.state.lasthbbeforekrt}
                            onChange={(e) =>
                                this.setState({
                                  lasthbbeforekrt: e.target.value,
                                })
                            }
                            label="Last Hb before KRT"
                            variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="choose-x2-select-label">
                          Has the patient completed Hepatitis B vaccination?
                        </InputLabel>
                        <Select
                            labelId="choose-x2-select-label"
                            value={this.state.completedhepb}
                            label="Gender"
                            onChange={(val) =>
                                this.setState({
                                  completedhepb: val.target.value,
                                })
                            }
                        >
                          <MenuItem value={"Unknown"}>Unknown</MenuItem>
                          <MenuItem value={"Yes"}>
                            Yes
                          </MenuItem>
                          <MenuItem value={"No"}>
                            No
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <FormLabel id="demo-rowx-radio-buttons-group-label">Did patient delay the start of dialysis despite nephrology advice?</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-rowx-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={this.state.dialysisdelay}
                            onChange={(e) => this.setState({dialysisdelay:e.target.value})}
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
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth>
                        <TextField
                            value={this.state.daysofdelay}
                            onChange={(e) =>
                                this.setState({
                                  daysofdelay: e.target.value,
                                })
                            }
                            label="Delay in full days in start of dialysis"
                            variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>)}




              </Fragment>
            )}
            {renderIf(this.state.activeStep == 1)(
              <Fragment>
                <div style={{ height: "65vh", overflowY: "auto" }}>
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
                </div>
              </Fragment>
            )}
          </div>
          <Box sx={{ mb: 2 }} className={"bottom-centered"}>
            <div>
              <Button
                variant="contained"
                onClick={() => this.handleNext()}
                sx={{ mt: 1, mr: 1 }}
                style={{ fontWeight: "bold" }}
              >
                {this.state.activeStep === 1
                  ? "Create Mode of Dialysis"
                  : "Continue"}
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
        </Paper>
      </div>
    );
  }

  handleSlider(value) {
    this.setState({
      clinicalfrailtyscale: value,
      clinicalfrailtymessage: utils.ClinicalFrailtyScaleExplanativeText(value),
    });
  }

  async handleNext() {
    if (this.state.activeStep < 1) {
      this.setState({ activeStep: this.state.activeStep + 1 });
    }
    if (this.state.activeStep == 1) {
      var objectToSend = this.state;
      //Adaptations
      if (objectToSend.hemodialysisstartedinprivate.toString() == "true") {
        objectToSend.hemodialysisstartedinprivate = true;
      } else {
        objectToSend.hemodialysisstartedinprivate = false;
      }
      objectToSend.krtmodality = objectToSend.modeofdialysis;
      objectToSend.createdby = window.localStorage.getItem('login');
      objectToSend.hdunitcode = this.state.hdunit.toString().split(" - ")[0];
      objectToSend.hdunitdescription = this.state.hdunit.toString().split(" - ")[1];
      objectToSend.dtmodechange = moment(this.state.dtmodechange).format(
          "YYYY-MM-DD"
      );
      console.log("objectToSend", objectToSend);
      await createmodeofdialysis(objectToSend);
      this.setState({ navPath: 8 });
    }
  }
  handleBack() {
    if (this.state.activeStep >= 0) {
      this.setState({ activeStep: this.state.activeStep - 1 });
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
