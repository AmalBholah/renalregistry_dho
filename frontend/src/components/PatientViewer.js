import React from 'react';
import {Alert, AlertTitle, Grid, Typography} from "@mui/material";
import utils from "../utils";
import renderIf from "render-if";
import SectionHeader from "./SectionHeader";
import SectionLabel from "./SectionLabel";

const PatientViewer = ({state}) =>{
    let hdunit = state.hdunitcode + ' - ' + state.hdunitdescription;
    return(
            <div
                style={{
                    margin: "auto",
                    minHeight: "95vh",
                    width: "95vw",
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    overflowY: "auto",
                }}
            >
                {state.dialysisStop && (
                    <Alert severity="warning">
                        <AlertTitle>
                            Patient stopped dialysis on{" "}
                            {utils.formatSimpleDate(state.dateoflastdialysis)}
                        </AlertTitle>
                        {renderIf(state.reason == "Died")(
                            <strong>
                                Died on {state.dateofdeath} with cause of death being{" "}
                                {state.causeofdeath}
                            </strong>
                        )}
                        {renderIf(state.reason != "Died")(
                            <strong>Reason being {state.reason}</strong>
                        )}
                    </Alert>
                )}

                {/* Basic Information */}
                <SectionHeader title={"Basic Information"} />
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Surname :"}
                            content={state.surname}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel title={"Name :"} content={state.name} />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Identifier type :"}
                            content={state.identifierselection}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Unique ID :"}
                            content={state.identifiervalue}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Unit Number :"}
                            content={state.unitnumber}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Health institution :"}
                            content={state.healthinstitution}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Date of Birth :"}
                            content={utils.formatSimpleDate(state.dateofbirth)}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Gender :"}
                            content={state.gender}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Address :"}
                            content={state.address}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Home Number :"}
                            content={state.homenumber}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Mobile Number :"}
                            content={state.mobilenumber}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Email Address :"}
                            content={state.emailaddress}
                        />
                    </Grid>
                </Grid>
                {/* Basic Information */}

                <div style={{ height: 20 }} />

                {/* Other Details */}
                <SectionHeader title={"Other Details"} />
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Height (cm) :"}
                            content={state.height}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Weight (kg) :"}
                            content={state.weight}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Birth Weight (kg) :"}
                            content={state.birthweight}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Ethnic Group :"}
                            content={state.ethnicgroup}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Marital Status :"}
                            content={state.maritalstatus}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Occupation :"}
                            content={state.occupation}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Current Employment :"}
                            content={state.currentemployment}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Previous Occupation :"}
                            content={state.previousoccupation}
                        />
                    </Grid>
                </Grid>
                {/* Other Details */}
                <div style={{ height: 20 }} />
                {/* Renal Profile */}
                <SectionHeader title={"Initial Renal Profile"} />
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Primary Renal Diagnosis :"}
                            content={state.primaryrenaldiagnosis}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Secondary Renal Diagnosis :"}
                            content={state.secondaryrenaldiagnosis}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Patient on dialysis? :"}
                            content={state.patientondialysis ? "YES" : "NO"}
                        />
                    </Grid>

                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Mode of dialysis (if any) :"}
                            content={state.modeofdialysis}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"If HD, unit stated :"}
                            content={hdunit}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Initial access on first HD :"}
                            content={state.hdaccess}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Creatinine (umol/L) :"}
                            content={state.latestcreatinine}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Calculated eGFR (ml/min) :"}
                            content={state.egfr}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Hb (g/dl) :"}
                            content={state.latesthb}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Date performed :"}
                            content={utils.formatSimpleDate(state.dateperformed)}
                        />
                    </Grid>
                </Grid>
                {/* Renal Profile */}
                <div style={{ height: 20 }} />
                {/* Initial Assessment */}
                <SectionHeader title={"Initial Assessment"} />
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={6}
                        md={6}
                        style={{ flexDirection: "column", display: "flex" }}
                    >
                        <Typography variant="h5" style={{ color: "darkblue" }}>
                            Comorbidities
                        </Typography>

                        {state.comorbidities.map((item) => {
                            return (
                                <Typography
                                    variant={"button"}
                                    style={{
                                        fontWeight: "bold",
                                        color: "darkblue",
                                        marginLeft: 5,
                                    }}
                                >
                                    {item.name}
                                </Typography>
                            );
                        })}
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        md={6}
                        style={{ flexDirection: "column", display: "flex" }}
                    >
                        <Typography variant="h5" style={{ color: "darkblue" }}>
                            Disabilities
                        </Typography>
                        {state.disabilities.map((item) => {
                            return (
                                <Typography
                                    variant={"button"}
                                    style={{
                                        fontWeight: "bold",
                                        color: "darkblue",
                                        marginLeft: 5,
                                    }}
                                >
                                    {item.name}
                                </Typography>
                            );
                        })}
                    </Grid>
                </Grid>
                <div
                    style={{
                        height: 2,
                        width: "96%",
                        backgroundColor: "gray",
                        marginTop: 5,
                        marginBottom: 5,
                    }}
                />
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Clinical Frailty Scale :"}
                            content={state.clinicalfrailtyscale}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Smoking status :"}
                            content={state.smokingstatus}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Alcohol use disorder :"}
                            content={state.alcoholusedisorder}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Hepatitis B :"}
                            content={state.hepatitisb}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Hepatitis C :"}
                            content={state.hepatitisc}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel title={"HIV :"} content={state.hiv} />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Created By :"}
                            content={state.createdby}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <SectionLabel
                            title={"Created On :"}
                            content={utils.formatSimpleDate(state.createdon)}
                        />
                    </Grid>
                </Grid>

                {/* Initial Assessment */}
                <div style={{ height: 20 }} />
        </div>
    )
}

export default PatientViewer;