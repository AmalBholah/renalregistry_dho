import React from 'react';
import {Grid, Typography} from "@mui/material";
import utils from "../utils";
import SectionHeader from "./SectionHeader";
import SectionLabel from "./SectionLabel";

const ModeofdialysisViewer = ({state}) =>{
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

            {/* Basic Information */}
            <SectionHeader title={"Mode of Dialysis"} />
            <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                    <SectionLabel
                        title={"New mode of dialysis :"}
                        content={state.krtmodality}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <SectionLabel title={"Date of modality change :"} content={utils.formatSimpleDate(state.dtmodechange)} />
                </Grid>
                <Grid item xs={6} md={6}>
                    <SectionLabel
                        title={"Is this the first KRT modality? :"}
                        content={state.firstkrt? "YES" : "NO"}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <SectionLabel
                        title={"Access on first hemodialysis :"}
                        content={state.accessonfirsthemodialysis}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <SectionLabel
                        title={"Why AVF/AVG not used to initiate HD? :"}
                        content={state.whynotavgavf}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <SectionLabel
                        title={"If HD, state HD :"}
                        content={state.hdunit}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <SectionLabel
                        title={"HD started in private? :"}
                        content={state.hemodialysisstartedinprivate? "YES" : "NO"}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <SectionLabel
                        title={"Which of the following has the patient seen in the year before starting KRT? :"}
                        content={state.visitbeforekrt}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <SectionLabel
                        title={"Time first seen by ROPD or private nephrologist :"}
                        content={state.seendaysbeforekrt}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <SectionLabel
                        title={"Last creatinine before KRT :"}
                        content={state.lastcreatininebeforekrt}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <SectionLabel
                        title={"Last eGFR before KRT :"}
                        content={state.lastegfrbeforekrt}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <SectionLabel
                        title={"Last Hb before KRT :"}
                        content={state.lasthbbeforekrt}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <SectionLabel
                        title={"Has the patient completed Hepatitis B vaccination? :"}
                        content={state.completedhepb}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <SectionLabel
                        title={"Did the patient delay the start of dialysis despite nephrology advice?:"}
                        content={state.dialysisdelay? "YES" : "NO"}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <SectionLabel
                        title={"Delay in full days in start of dialysis :"}
                        content={state.daysofdelay}
                    />
                </Grid>
            </Grid>
            {/* Basic Information */}

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

export default ModeofdialysisViewer;