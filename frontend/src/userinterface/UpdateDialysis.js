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
  DialogActions,
  AppBar,
  Toolbar,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import renderIf from "render-if";
import utils from "../utils";
import ListItemAssessment from "../components/ListItemAssessment";
import SectionLabel from "../components/SectionLabel";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import {
  listhemodialysisunits,
  listcomorbiditiesmaster,
  listdisabilitiesmaster,
} from "../apis/master-lists";
import SectionHeader from "../components/SectionHeader";
import Medication from "../components/Medication";
import {
  listmodesofdialysis,
  updatedialysissession,
} from "../apis/dialysis-api";
import { Navigate } from "react-router-dom";
export default class UpdateDialysis extends Component {
  state = {
    pkpatientid: "0",
    //Dialysis
    currentmodeofdialysis: "",
    ureareductionratio: "",
    ureareductionratiomodal: false,
    postdialysisweight: "",
    dialysisefficiency: "",
    dialysisefficiencymodal: false,
    hemodialysisunit: "",
    lastaccessusedfordialysis: "Unknown",
    sessionsperweek: "",
    hourspersession: "",
    //Laboratory
    hemoglobin: "",
    transferrinsaturation: "",
    calcium: "",
    bicarbonate: "",
    ferritin: "",
    glycosylatedhemoglobin: "",
    albumin: "",
    parathyroidhormone: "",
    phosphate: "",
    //Medications
    esaweekly: "",
    esaeachtwoweeks: "",
    esaeachfourweeks: "",
    irondose: "",
    insulin: "Unknown",
    sulphonylureas: "Unknown",
    dpp4i: "Unknown",
    glp1a: "Unknown",
    meglitinides: "Unknown",
    sglt2i: "Unknown",
    acarbose: "Unknown",
    metformin: "Unknown",
    other: "Unknown",
    acei: "Unknown",
    arb: "Unknown",
    ccblocker: "Unknown",
    betablocker: "Unknown",
    alphablocker: "Unknown",
    centrallyacting: "Unknown",
    peripheralvasodilators: "Unknown",
    loopdiuretics: "Unknown",
    mineralocorticosteroidreceptorantagonists: "Unknown",
    thiazides: "Unknown",
    renininhibitors: "Unknown",
    others: "Unknown",
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
    //Peripherals
    activeStep: 0,
    preHD: "",
    postHD: "",
    PostBUN: "",
    PreBUN: "",
    UF: "",
    Weight: "",
    hemodialysisunits: [],
    //STATE ADDITIONS
    showModalSelector: false,
    navPath: 0,
    //FORM ADDITIONS
    pdexchangesperday:"",
    pdfluidlitresperday:"",
    pdadequacy:"",
    bp:"",
    whyntc:"Arteriovenous fistula/graft not ready",
    createdby:"",
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
    //Read memory bus
    let restoredState = utils.getTempMemoryDialysis();
    restoredState.modeofdialysis = restoredState.krtmodality;
    this.setState(restoredState);
    console.log("restoredState", restoredState);
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
    let modesofdialysis = await listmodesofdialysis(restoredState.pkpatientid);
    this.setState({ currentmodeofdialysis: modesofdialysis[0].krtmodality });

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
                New Dialysis Assessment
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
              <Step key={"Dialysis"} style={{ cursor: "pointer" }}>
                <StepLabel>{"Dialysis"}</StepLabel>
              </Step>
              <Step key={"Laboratory"} style={{ cursor: "pointer" }}>
                <StepLabel>{"Laboratory"}</StepLabel>
              </Step>
              <Step key={"Medications"} style={{ cursor: "pointer" }}>
                <StepLabel>{"Medications"}</StepLabel>
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
                          <SectionLabel
                              title="Current mode of dialysis :"
                              content={this.state.currentmodeofdialysis}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <div style={{ flexDirection: "row", display: "flex" }}>
                          <Typography
                              labelId="choose-urr-select-label"
                              style={{
                                flexGrow: 1,
                                fontSize: 20,
                              }}
                          >
                            Urea Reduction Ratio (%) :{" "}
                            {this.state.ureareductionratio}
                          </Typography>
                          <Button
                              variant="contained"
                              onClick={() =>
                                  this.setState({
                                    ureareductionratiomodal: true,
                                  })
                              }
                          >
                            Calculate
                          </Button>
                        </div>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                          <TextField
                              value={this.state.postdialysisweight}
                              onChange={(e) =>
                                  this.setState({ postdialysisweight: e.target.value })
                              }
                              type={"numeric"}
                              label="Post hemodialysis or dry peritoneal dialysis weight (kg)"
                              variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <div
                            style={{
                              flexDirection: "row",
                              display: "flex",
                              marginTop: 12.5,
                            }}
                        >
                          <Typography
                              style={{
                                flexGrow: 1,
                                fontSize: 20,
                              }}
                          >
                            Dialysis efficiency calculator (kt/V){" "}
                            {this.state.dialysisefficiency}
                          </Typography>
                          <Button
                              variant="contained"
                              onClick={() =>
                                  this.setState({
                                    dialysisefficiencymodal: true,
                                  })
                              }
                          >
                            Calculate
                          </Button>
                        </div>
                      </Grid>
                      <Grid item xs={6} md={6}>
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

                      </Grid>
                      <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                          <InputLabel id="choose-x-select-label">
                            Last access used for dialysis
                          </InputLabel>
                          <Select
                              labelId="choose-x-select-label"
                              value={this.state.lastaccessusedfordialysis}
                              label="Gender"
                              onChange={(val) =>
                                  this.setState({
                                    lastaccessusedfordialysis: val.target.value,
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
                      </Grid>

                      {renderIf(this.state.lastaccessusedfordialysis=='Non-tunneled catheter (NTC)' )(
                          <Grid item xs={6} md={6}>
                            <FormControl fullWidth>
                              <InputLabel id="choose-ntc-select-label">
                                If on NTC why?
                              </InputLabel>
                              <Select
                                  labelId="choose-ntc-select-label"
                                  value={this.state.whyntc}
                                  label="Gender"
                                  onChange={(val) =>
                                      this.setState({
                                        whyntc: val.target.value,
                                      })
                                  }
                              >
                                <MenuItem value={"Arteriovenous fistula/graft not ready"}>Arteriovenous fistula/graft not ready</MenuItem>
                                <MenuItem value={"Arteriovenous fistula/graft not dysfunction"}>
                                  Arteriovenous fistula/graft not dysfunction
                                </MenuItem>
                                <MenuItem value={"On waiting list"}>
                                  On waiting list
                                </MenuItem>
                                <MenuItem value={"No veins"}>
                                  No veins
                                </MenuItem>
                                <MenuItem value={"Patient choice"}>
                                  Patient choice
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                      )}

                      {renderIf(this.state.currentmodeofdialysis=='Peritoneal Dialysis (PD)' )(
                          <Grid item xs={6} md={6}>
                            <FormControl fullWidth>
                              <TextField
                                  value={this.state.pdexchangesperday}
                                  onChange={(e) =>
                                      this.setState({ pdexchangesperday: e.target.value })
                                  }
                                  type={"numeric"}
                                  label="PD exchanges/day"
                                  variant="outlined"
                              />
                            </FormControl>
                          </Grid>
                      )}
                      {renderIf(this.state.currentmodeofdialysis=='Peritoneal Dialysis (PD)' )(
                          <Grid item xs={6} md={6}>
                            <FormControl fullWidth>
                              <TextField
                                  value={this.state.pdfluidlitresperday}
                                  onChange={(e) =>
                                      this.setState({ pdfluidlitresperday: e.target.value })
                                  }
                                  type={"numeric"}
                                  label="PD Fluid litres/day"
                                  variant="outlined"
                              />
                            </FormControl>
                          </Grid>
                      )}
                      <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                          <TextField
                              value={this.state.bp}
                              onChange={(e) =>
                                  this.setState({ bp: e.target.value })
                              }
                              type={"numeric"}
                              label="BP (mm Hg)"
                              variant="outlined"
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                          <TextField
                              value={this.state.sessionsperweek}
                              onChange={(e) =>
                                  this.setState({ sessionsperweek: e.target.value })
                              }
                              type={"numeric"}
                              label="Sessions per week"
                              variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                          <TextField
                              value={this.state.hourspersession}
                              onChange={(e) =>
                                  this.setState({ hourspersession: e.target.value })
                              }
                              type={"numeric"}
                              label="Hours per session"
                              variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Fragment>
              )}
              {renderIf(this.state.activeStep == 1)(
                  <Fragment>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                          <TextField
                              value={this.state.hemoglobin}
                              onChange={(e) =>
                                  this.setState({ hemoglobin: e.target.value })
                              }
                              type={"numeric"}
                              label="Hemoglobin (g/dl)"
                              variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                          <TextField
                              value={this.state.transferrinsaturation}
                              onChange={(e) =>
                                  this.setState({
                                    transferrinsaturation: e.target.value,
                                  })
                              }
                              type={"numeric"}
                              label="Transferrin Saturation (%)"
                              variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                          <TextField
                              value={this.state.calcium}
                              onChange={(e) =>
                                  this.setState({ calcium: e.target.value })
                              }
                              type={"numeric"}
                              label="Calcium (mmol/L)"
                              variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                          <TextField
                              value={this.state.bicarbonate}
                              onChange={(e) =>
                                  this.setState({ bicarbonate: e.target.value })
                              }
                              type={"numeric"}
                              label="Bicarbonate (mmol/L)"
                              variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                          <TextField
                              value={this.state.ferritin}
                              onChange={(e) =>
                                  this.setState({ ferritin: e.target.value })
                              }
                              type={"numeric"}
                              label="Ferritin (ng/ml) *"
                              variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                          <TextField
                              value={this.state.glycosylatedhemoglobin}
                              onChange={(e) =>
                                  this.setState({
                                    glycosylatedhemoglobin: e.target.value,
                                  })
                              }
                              type={"numeric"}
                              label="HbA1C (%) *"
                              variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                          <TextField
                              value={this.state.albumin}
                              onChange={(e) =>
                                  this.setState({ albumin: e.target.value })
                              }
                              type={"numeric"}
                              label="Albumin (g/L) :"
                              variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                          <TextField
                              value={this.state.parathyroidhormone}
                              onChange={(e) =>
                                  this.setState({ parathyroidhormone: e.target.value })
                              }
                              type={"numeric"}
                              label="PTH (pmol/L) *"
                              variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                          <TextField
                              value={this.state.phosphate}
                              onChange={(e) =>
                                  this.setState({ phosphate: e.target.value })
                              }
                              type={"numeric"}
                              label="Phosphate (mmol/l)"
                              variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Fragment>
              )}
              {renderIf(this.state.activeStep == 2)(
                  <Fragment>
                    <div style={{ height: "65vh", overflowY: "auto" }}>
                      <SectionHeader
                          title={"Erythropoetin Stimulating Agent (ESA)"}
                      />
                      <Grid container spacing={2} style={{ marginTop: 10 }}>
                        <Grid item xs={6} md={6}>
                          <FormControl fullWidth>
                            <TextField
                                value={this.state.esaweekly}
                                onChange={(e) =>
                                    this.setState({ esaweekly: e.target.value })
                                }
                                type={"numeric"}
                                label="International Units/week (short acting)"
                                variant="outlined"
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormControl fullWidth>
                            <TextField
                                value={this.state.esaeachtwoweeks}
                                onChange={(e) =>
                                    this.setState({ esaeachtwoweeks: e.target.value })
                                }
                                type={"numeric"}
                                label="Mcg/2 weekly (darbepoetin)"
                                variant="outlined"
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormControl fullWidth>
                            <TextField
                                value={this.state.esaeachfourweeks}
                                onChange={(e) =>
                                    this.setState({ esaeachfourweeks: e.target.value })
                                }
                                type={"numeric"}
                                label="Mcg/4 weekly (mircera)"
                                variant="outlined"
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                      <div style={{ height: 20 }} />
                      <SectionHeader title={"Intra-venous Iron Dose"} />
                      <div style={{ height: 10 }} />
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                          <FormControl fullWidth>
                            <TextField
                                value={this.state.irondose}
                                onChange={(e) =>
                                    this.setState({ irondose: e.target.value })
                                }
                                type={"numeric"}
                                label="Mg/month"
                                variant="outlined"
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                      <div style={{ height: 20 }} />
                      <SectionHeader title={"Anti-Diabetic Medications"} />
                      <div style={{ height: 10 }} />
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"Insulin *"}
                              value={this.state.insulin}
                              echoValue={(newVal) =>
                                  this.setState({ insulin: newVal })
                              }
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"Sulphonylureas *"}
                              value={this.state.sulphonylureas}
                              echoValue={(newVal) =>
                                  this.setState({ sulphonylureas: newVal })
                              }
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"DPP4i *"}
                              value={this.state.dpp4i}
                              echoValue={(newVal) => this.setState({ dpp4i: newVal })}
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"GLP1A *"}
                              value={this.state.glp1a}
                              echoValue={(newVal) => this.setState({ glp1a: newVal })}
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"Meglitinides *"}
                              value={this.state.meglitinides}
                              echoValue={(newVal) =>
                                  this.setState({ meglitinides: newVal })
                              }
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"SGLT2i *"}
                              value={this.state.sglt2i}
                              echoValue={(newVal) =>
                                  this.setState({ sglt2i: newVal })
                              }
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"Acarbose *"}
                              value={this.state.acarbose}
                              echoValue={(newVal) =>
                                  this.setState({ acarbose: newVal })
                              }
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"Metformin *"}
                              value={this.state.metformin}
                              echoValue={(newVal) =>
                                  this.setState({ metformin: newVal })
                              }
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"Other *"}
                              value={this.state.other}
                              echoValue={(newVal) => this.setState({ other: newVal })}
                          />
                        </Grid>
                      </Grid>
                      <div style={{ height: 20 }} />
                      <SectionHeader title={"Anti-Hypertensive Medications"} />
                      <div style={{ height: 10 }} />
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"ACEi *"}
                              value={this.state.acei}
                              echoValue={(newVal) => this.setState({ acei: newVal })}
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"ARB *"}
                              value={this.state.arb}
                              echoValue={(newVal) => this.setState({ arb: newVal })}
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"CC Blocker *"}
                              value={this.state.ccblocker}
                              echoValue={(newVal) =>
                                  this.setState({ ccblocker: newVal })
                              }
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"Beta Blocker *"}
                              value={this.state.betablocker}
                              echoValue={(newVal) =>
                                  this.setState({ betablocker: newVal })
                              }
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"Alpha Blocker *"}
                              value={this.state.alphablocker}
                              echoValue={(newVal) =>
                                  this.setState({ alphablocker: newVal })
                              }
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"Centrally acting *"}
                              value={this.state.centrallyacting}
                              echoValue={(newVal) =>
                                  this.setState({ centrallyacting: newVal })
                              }
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"Peripheral Vasodilators *"}
                              value={this.state.peripheralvasodilators}
                              echoValue={(newVal) =>
                                  this.setState({ peripheralvasodilators: newVal })
                              }
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"Loop diuretics *"}
                              value={this.state.loopdiuretics}
                              echoValue={(newVal) =>
                                  this.setState({ loopdiuretics: newVal })
                              }
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"Mineralocorticoid Receptor Antagonists *"}
                              value={
                                this.state.mineralocorticosteroidreceptorantagonists
                              }
                              echoValue={(newVal) =>
                                  this.setState({
                                    mineralocorticosteroidreceptorantagonists: newVal,
                                  })
                              }
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"Thiazides *"}
                              value={this.state.thiazides}
                              echoValue={(newVal) =>
                                  this.setState({ thiazides: newVal })
                              }
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"Renin Inhibitor *"}
                              value={this.state.renininhibitors}
                              echoValue={(newVal) =>
                                  this.setState({ renininhibitors: newVal })
                              }
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Medication
                              title={"Others *"}
                              value={this.state.others}
                              echoValue={(newVal) =>
                                  this.setState({ others: newVal })
                              }
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </Fragment>
              )}
              {
                //Assessment
                renderIf(this.state.activeStep == 3)(
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
                                        OnRemove={(item) =>
                                            this.removeComorbidity(item)
                                        }
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
                )
              }
            </div>

            {/* URR CALCULATION DIALOG */}
            <Dialog
                open={this.state.ureareductionratiomodal}
                onClose={() => this.setState({ ureareductionratiomodal: false })}
            >
              <DialogTitle>Calculate Urea Reduction Ratio (%)</DialogTitle>
              <DialogContent>
                <TextField
                    autoFocus
                    variant={"outlined"}
                    margin="dense"
                    id="name"
                    label="Urea pre-dialysis"
                    value={this.state.preHD}
                    onChange={(e) => this.setState({ preHD: e.target.value })}
                    type="numeric"
                    fullWidth
                />
                <TextField
                    autoFocus
                    variant={"outlined"}
                    margin="dense"
                    id="name"
                    label="Urea post-dialysis"
                    value={this.state.postHD}
                    onChange={(e) => this.setState({ postHD: e.target.value })}
                    type="numeric"
                    fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button
                    onClick={() =>
                        this.setState({ ureareductionratiomodal: false })
                    }
                >
                  Cancel
                </Button>
                <Button
                    onClick={() =>
                        this.setState({
                          ureareductionratiomodal: false,
                          ureareductionratio: utils.calculateURR(
                              parseFloat(this.state.preHD),
                              parseFloat(this.state.postHD)
                          ),
                        })
                    }
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
            {/* URR CALCULATION DIALOG */}

            {/* DIALYSIS EFFICIENCY CALCULATION DIALOG */}
            <Dialog
                open={this.state.dialysisefficiencymodal}
                onClose={() => this.setState({ dialysisefficiencymodal: false })}
            >
              <DialogTitle>Dialysis Efficiency Calculator (Kt/V)</DialogTitle>
              <DialogContent>
                <TextField
                    autoFocus
                    variant={"outlined"}
                    margin="dense"
                    id="name"
                    label="Pre-dialysis BUN"
                    value={this.state.PreBUN}
                    onChange={(e) => this.setState({ PreBUN: e.target.value })}
                    type="numeric"
                    fullWidth
                />
                <TextField
                    autoFocus
                    variant={"outlined"}
                    margin="dense"
                    id="name"
                    label="Post-dialysis BUN"
                    value={this.state.PostBUN}
                    onChange={(e) => this.setState({ PostBUN: e.target.value })}
                    type="numeric"
                    fullWidth
                />
                <TextField
                    autoFocus
                    variant={"outlined"}
                    margin="dense"
                    id="name"
                    label="Dialysis duration (hours)"
                    value={this.state.hourspersession}
                    onChange={(e) =>
                        this.setState({ hourspersession: e.target.value })
                    }
                    type="numeric"
                    fullWidth
                />
                <TextField
                    autoFocus
                    variant={"outlined"}
                    margin="dense"
                    id="name"
                    label="Ultrafiltration Volume (L)"
                    value={this.state.UF}
                    onChange={(e) => this.setState({ UF: e.target.value })}
                    type="numeric"
                    fullWidth
                />
                <TextField
                    autoFocus
                    variant={"outlined"}
                    margin="dense"
                    id="name"
                    label="Post-dialysis weight (kg)"
                    value={this.state.Weight}
                    onChange={(e) => this.setState({ Weight: e.target.value })}
                    type="numeric"
                    fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button
                    onClick={() =>
                        this.setState({ dialysisefficiencymodal: false })
                    }
                >
                  Cancel
                </Button>
                <Button
                    onClick={() =>
                        this.setState({
                          dialysisefficiencymodal: false,
                          dialysisefficiency: utils.calculateDialysisEfficiency(
                              this.state.PostBUN,
                              this.state.PreBUN,
                              this.state.hourspersession,
                              this.state.UF,
                              this.state.Weight
                          ),
                        })
                    }
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
            {/* DIALYSIS EFFICIENCY CALCULATION DIALOG */}

            <Box sx={{ mb: 2 }} className={"bottom-centered"}>
              <div>
                <Button
                    variant="contained"
                    onClick={() => this.handleNext()}
                    sx={{ mt: 1, mr: 1 }}
                    style={{ fontWeight: "bold" }}
                >
                  {this.state.activeStep === 3 ? "Save Dialysis" : "Continue"}
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

  async handleNext() {
    if (this.state.activeStep < 3) {
      this.setState({ activeStep: this.state.activeStep + 1 });
    }
    if (this.state.activeStep == 3) {
      var objectToSend = this.state;
      objectToSend.createdby = window.localStorage.getItem('login');
      objectToSend.hdunitcode = this.state.hdunit.toString().split(" - ")[0];
      objectToSend.hdunitdescription = this.state.hdunit.toString().split(" - ")[1];
      console.log("objectToSend", objectToSend);
      let _updatedialysissession = await updatedialysissession(objectToSend);
      this.setState({ navPath: 8 });
    }
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
