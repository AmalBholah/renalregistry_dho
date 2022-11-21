import React, {Component} from 'react';
import { Navigate } from "react-router-dom";
import renderIf from "render-if";
import {
    Paper,
    ButtonGroup,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Alert,
    Grid,
    AlertTitle,
    Button, DialogContent,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {
    filterregisteredpatients,
    viewpatient,
} from "../apis/patient-registration";

import utils from "../utils";
import CloseIcon from '@mui/icons-material/Cancel';
import Loader from "../components/Loader";
import {
    listdialysissessions,
    listmodesofdialysis,
    viewdialysissession,
    viewmodeofdialysis,
    viewstopdialysis
} from "../apis/dialysis-api";
import AdminDrawer from "../components/AdminDrawer";
import PatientViewer from "../components/PatientViewer";
import SectionHeader from "../components/SectionHeader";
import SectionLabel from "../components/SectionLabel";
import ModeofdialysisViewer from "../components/ModeofdialysisViewer";
import DialysisViewer from "../components/DialysisViewer";

var currentModeSelected = {};

export default class ViewPatient extends Component {
    state = {
        showDialysis:false,
        showModeofdialysis:false,
        dialysishistory: [],
        modalities: [],
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
        let patient = utils.getTempMemory();
        this.setState({ loading: true });
        let patientDetails = await viewpatient(patient.pkpatientid);
        let stopdialysis = await viewstopdialysis(patient);
        let modalities = await listmodesofdialysis(
            patient.pkpatientid
        );
        console.log('modalities',modalities)
        if (modalities) {
            this.setState({ modalities: modalities  });
        }
        var STP = {
            //Stop dialysis
            dateoflastdialysis: "",
            reason: "",
            dateofdeath: "",
            causeofdeath: "",
            dialysisStop: false,
        };
        if (stopdialysis.length > 0) {
            STP.dateoflastdialysis = utils.formatSimpleDate(
                stopdialysis[0].dateoflastdialysis
            );
            STP.reason = stopdialysis[0].reason;
            STP.dateofdeath = utils.formatSimpleDate(stopdialysis[0].dateofdeath);
            STP.causeofdeath = stopdialysis[0].causeofdeath;
            STP.dialysisStop = true;
        }

        this.setState({
            loading: false,
            ...patientDetails,
            ...patientDetails.patientregistration[0],
            ...STP,
        });
        let dialysishistoryItems = await listdialysissessions(
            utils.getTempMemory().pkpatientid
        );
        if (dialysishistoryItems) {
            this.setState({ dialysishistory: dialysishistoryItems, loading: false });
        }
    }

    PatientOptionSelected(val) {
        utils.setTempMemory(this.state);
        this.setState({ navPath: val });
    }

    render() {  console.log('state',this.state)
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
                        padding:20,
                    }}
                >
                    <Dialog
                        onClose={() => this.setState({ showPatientSelector: false })}
                        open={this.state.showPatientSelector}
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
                            <ListItem
                                button
                                onClick={() => this.PatientOptionSelected(6)}
                                key={6}
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={"Stop dialysis"} />
                            </ListItem>

                            <div
                                style={{
                                    height: 2,
                                    width: "90%",
                                    backgroundColor: "lightblue",
                                    margin: "auto",
                                }}
                            />
                        </List>
                    </Dialog>

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
                    {renderIf(this.state.navPath == 9)(
                        <Navigate to="/editmodeofdialysis" replace={true} />
                    )}
                    {renderIf(this.state.navPath == 10)(
                        <Navigate to="/" replace={true} />
                    )}
                    {renderIf(this.state.navPath == 11)(
                        <Navigate to="/updatedialysis" replace={true} />
                    )}
                    {renderIf(this.state.navPath == 20)(
                        <Navigate to="/registerpatient" replace={false} />
                    )}
                    {this.state.dialysisStop && (
                        <Alert severity="warning">
                            <AlertTitle>
                                Patient stopped dialysis on{" "}
                                {utils.formatSimpleDate(this.state.dateoflastdialysis)}
                            </AlertTitle>
                            {renderIf(this.state.reason == "Died")(
                                <strong>
                                    Died on {this.state.dateofdeath} with cause of death being{" "}
                                    {this.state.causeofdeath}
                                </strong>
                            )}
                            {renderIf(this.state.reason != "Died")(
                                <strong>Reason being {this.state.reason}</strong>
                            )}
                        </Alert>
                    )}
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            {/* Basic Information */}
                            <SectionHeader title={"Basic Information"} />
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={6}>
                                    <SectionLabel
                                        title={"Surname :"}
                                        content={this.state.surname}
                                    />
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <SectionLabel title={"Name :"} content={this.state.name} />
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <SectionLabel
                                        title={"Identifier type :"}
                                        content={this.state.identifierselection}
                                    />
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <SectionLabel
                                        title={"Unique ID :"}
                                        content={this.state.identifiervalue}
                                    />
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <SectionLabel
                                        title={"Unit Number :"}
                                        content={this.state.unitnumber}
                                    />
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <SectionLabel
                                        title={"Health institution :"}
                                        content={this.state.healthinstitution}
                                    />
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <SectionLabel
                                        title={"Date of Birth :"}
                                        content={utils.formatSimpleDate(this.state.dateofbirth)}
                                    />
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <SectionLabel
                                        title={"Gender :"}
                                        content={this.state.gender}
                                    />
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <SectionLabel
                                        title={"Address :"}
                                        content={this.state.address}
                                    />
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Button variant={'contained'}
                                            style={{backgroundColor:'black'}}
                                            onClick={()=>this.setState({showPatientDetails:true})}
                                            size="small" color={'primary'}>View more details</Button>
                                </Grid>
                            </Grid>
                            {/* Basic Information */}
                        </Grid>
                        <Grid item xs={4}>
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
                                <ListItem
                                    button
                                    onClick={() => this.PatientOptionSelected(6)}
                                    key={6}
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                            <PersonIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={"Stop dialysis"} />
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} style={{marginTop:20}} >
                        <Grid item xs={7}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead style={{ backgroundColor: "black" }}>
                                        <TableRow>
                                            <TableCell style={{ fontWeight: "bold", color: "white" }}>
                                                Dialysis Date
                                            </TableCell>
                                            <TableCell style={{ fontWeight: "bold", color: "white" }}>
                                                Access used
                                            </TableCell>
                                            <TableCell style={{ fontWeight: "bold", color: "white" }}>
                                                Ferritin (ng/ml)
                                            </TableCell>
                                            <TableCell style={{ fontWeight: "bold", color: "white" }}>
                                                TSAT (%)
                                            </TableCell>
                                            <TableCell style={{ fontWeight: "bold", color: "white" }}>
                                                HBA1C(%)
                                            </TableCell>
                                            <TableCell style={{ fontWeight: "bold", color: "white" }}>
                                                Options
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.dialysishistory.map((row) => (
                                            <TableRow
                                                key={row.pkdialysisid}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {utils.formatSimpleDate(row.createdon)}
                                                </TableCell>
                                                <TableCell>{row.lastaccessusedfordialysis}</TableCell>
                                                <TableCell>{row.ferritin}</TableCell>
                                                <TableCell>{row.transferrinsaturation}</TableCell>
                                                <TableCell>{row.glycosylatedhemoglobin}</TableCell>

                                                <TableCell>
                                                    <ButtonGroup
                                                        variant="contained"
                                                        aria-label="outlined primary button group"
                                                    >
                                                        <Button onClick={() => this.viewDialysis(row)}>
                                                            View{" "}
                                                        </Button>
                                                        <Button
                                                            onClick={() => this.editDialysis(row)}
                                                            color="secondary"
                                                        >
                                                            Edit{" "}
                                                        </Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={5}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead style={{ backgroundColor: "black" }}>
                                        <TableRow>
                                            <TableCell style={{ fontWeight: "bold", color: "white" }}>
                                                Mode of Dialysis
                                            </TableCell>
                                            <TableCell style={{ fontWeight: "bold", color: "white" }}>
                                                Date Started
                                            </TableCell>
                                            <TableCell style={{ fontWeight: "bold", color: "white" }}>
                                                Options
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.modalities.map((row) => (
                                            <TableRow
                                                key={row.pkmodeofdialysisid}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <TableCell>{row.krtmodality}</TableCell>
                                                <TableCell component="th" scope="row">
                                                    {utils.formatSimpleDate(row.createdon)}
                                                </TableCell>

                                                <TableCell>
                                                    <ButtonGroup
                                                        variant="contained"
                                                        aria-label="outlined primary button group"
                                                    >
                                                        <Button onClick={() => this.viewMode(row)}>
                                                            View{" "}
                                                        </Button>
                                                        <Button
                                                            onClick={() => this.editMode(row)}
                                                            color="secondary"
                                                        >
                                                            Edit{" "}
                                                        </Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>



                    <Dialog open={this.state.showPatientDetails} maxWidth={'xl'} onClose={()=>this.setState({showPatientDetails:false})}>
                        <DialogTitle style={{marginTop:10}}>Viewing Patient Details</DialogTitle>
                        <IconButton size={'medium'}
                            aria-label="close"
                            onClick={()=>this.setState({showPatientDetails:false})}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                            }}
                        >
                            <CloseIcon style={{color:'black',height:45,width:45}} />
                        </IconButton>
                        <DialogContent>
                        <PatientViewer state={this.state}/>
                        </DialogContent>

                    </Dialog>

                    <Dialog open={this.state.showModeofdialysis} maxWidth={'xl'} onClose={()=>this.setState({showModeofdialysis:false})}>
                        <DialogTitle style={{marginTop:10}}>Viewing Mode of Dialysis</DialogTitle>
                        <IconButton size={'medium'}
                                    aria-label="close"
                                    onClick={()=>this.setState({showModeofdialysis:false})}
                                    sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                    }}
                        >
                            <CloseIcon style={{color:'black',height:45,width:45}} />
                        </IconButton>
                        <DialogContent>
                        <ModeofdialysisViewer state={currentModeSelected}/>
                        </DialogContent>

                    </Dialog>

                    <Dialog open={this.state.showDialysis} maxWidth={'xl'} onClose={()=>this.setState({showDialysis:false})}>
                        <DialogTitle style={{marginTop:10}}>Viewing Dialysis</DialogTitle>
                        <IconButton size={'medium'}
                                    aria-label="close"
                                    onClick={()=>this.setState({showDialysis:false})}
                                    sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                    }}
                        >
                            <CloseIcon style={{color:'black',height:45,width:45}} />
                        </IconButton>
                        <DialogContent>
                            <DialysisViewer state={currentModeSelected}/>
                        </DialogContent>

                    </Dialog>


                    <Loader visible={this.state.loading} />
                </Paper>
            </div>
        );
    }

    async patientSelected(patient) {
        this.setState({ loading: true, showPatientDetails: true });
        let patientDetails = await viewpatient(patient.pkpatientid);
        let stopdialysis = await viewstopdialysis(patient);
        var STP = {
            //Stop dialysis
            dateoflastdialysis: "",
            reason: "",
            dateofdeath: "",
            causeofdeath: "",
            dialysisStop: false,
        };
        if (stopdialysis.length > 0) {
            STP.dateoflastdialysis = utils.formatSimpleDate(
                stopdialysis[0].dateoflastdialysis
            );
            STP.reason = stopdialysis[0].reason;
            STP.dateofdeath = utils.formatSimpleDate(stopdialysis[0].dateofdeath);
            STP.causeofdeath = stopdialysis[0].causeofdeath;
            STP.dialysisStop = true;
        }

        this.setState({
            loading: false,
            ...patientDetails,
            ...patientDetails.patientregistration[0],
            ...STP,
        });
    }
    async searchForPatient(e) {
        if (e.keyCode == 13) {
            let results = await filterregisteredpatients(this.state.searchField);
            this.setState({ patients: results });
        }
    }

    async viewMode(mode){
        this.setState({ loading: true });
        let modeContents = await viewmodeofdialysis(mode.pkmodeofdialysisid);
        let sendObj = {
            loading: false,
            ...modeContents,
            ...modeContents.modeofdialysis[0],
        };
        currentModeSelected = sendObj;
        this.setState({ loading: false,showModeofdialysis:true });
    }
    async editMode(mode){
        this.setState({ loading: true });
        let modeContents = await viewmodeofdialysis(mode.pkmodeofdialysisid);
        let sendObj = {
            loading: false,
            ...modeContents,
            ...modeContents.modeofdialysis[0],
        };
        utils.setTempMemoryModeofdialysis(sendObj);
        this.setState({ navPath:9 });
    }

    async viewDialysis(dialysis) {
        this.setState({ loading: true });
        let dialysisContents = await viewdialysissession(dialysis.pkdialysisid);
        let dataSet ={
            showDialysisDetails: true,
            loading: false,
            ...dialysisContents,
            ...dialysisContents.dialysis[0],
        };
        currentModeSelected = dataSet;
        this.setState({ loading: false,showDialysis:true });
    }
    async editDialysis(dialysis) {
        this.setState({ loading: true });
        let dialysisContents = await viewdialysissession(dialysis.pkdialysisid);
        let sendObj = {
            loading: false,
            ...dialysisContents,
            ...dialysisContents.dialysis[0],
        };
        utils.setTempMemoryDialysis(sendObj);
        this.setState({ navPath: 11 });
    }
}
