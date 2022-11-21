import React from 'react';
import {FormControl, Grid, Typography} from "@mui/material";
import SectionHeader from "./SectionHeader";
import SectionLabel from "./SectionLabel";

const DialysisViewer = ({state}) =>{
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
                <SectionHeader title={"Dialysis Information"} />
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Mode of dialysis :"
                                content={state.currentmodeofdialysis}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Urea Reduction Ratio (%) :"
                                content={state.ureareductionratio}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Post hemodialysis or dry peritoneal dialysis weight (kg) :"
                                content={state.postdialysisweight}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Dialysis efficiency (kt/V) :"
                                content={state.dialysisefficiency}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="If Hemodialysis, state Hemodialysis Unit :"
                                content={state.hdunit}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Last access used for dialysis :"
                                content={state.lastaccessusedfordialysis}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Sessions per week :"
                                content={state.sessionsperweek}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Hours per session :"
                                content={state.hourspersession}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="If PD, exchanges/day :"
                                content={state.pdexchangesperday}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="If PD, fluid litres/day :"
                                content={state.pdfluidlitresperday}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="BP (mm Hg) :"
                                content={state.bp}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="If NTC, why? :"
                                content={state.whyntc}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <div style={{ height: 10 }} />
                <SectionHeader title={"Laboratory"} />
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Hemoglobin (g/dl) :"
                                content={state.hemoglobin}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Transferrin Saturation (%) :"
                                content={state.transferrinsaturation}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Calcium (mmol/L) :"
                                content={state.calcium}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Bicarbonate (mmol/L) :"
                                content={state.bicarbonate}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Ferritin (ng/ml) :"
                                content={state.ferritin}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="HbA1C (%) :"
                                content={state.glycosylatedhemoglobin}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Albumin (g/L) :"
                                content={state.albumin}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="PTH (pmol/L) :"
                                content={state.parathyroidhormone}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Phosphate (mmol/l) :"
                                content={state.phosphate}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <div style={{ height: 10 }} />
                <SectionHeader title={"Medications"} />
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="(ESA) International Units/week (short acting) :"
                                content={state.esaweekly}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="(ESA) Mcg/2 weekly (darbepoetin) :"
                                content={state.esaeachtwoweeks}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="(ESA) Mcg/4 weekly (mircera) :"
                                content={state.esaeachfourweeks}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Intra-venous Iron Dose (mg/month) :"
                                content={state.irondose}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Insulin :"
                                content={state.insulin}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Sulphonylureas :"
                                content={state.sulphonylureas}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel title="DPP4i :" content={state.dpp4i} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel title="GLP1A :" content={state.glp1a} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Meglitinides :"
                                content={state.meglitinides}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="SGLT2i :"
                                content={state.sglt2i}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Acarbose :"
                                content={state.acarbose}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Metformin :"
                                content={state.metformin}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel title="Other :" content={state.other} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel title="ACEi :" content={state.acei} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel title="ARB :" content={state.arb} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="CC Blocker :"
                                content={state.ccblocker}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Beta Blocker :"
                                content={state.betablocker}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Alpha Blocker :"
                                content={state.alphablocker}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Centrally acting :"
                                content={state.centrallyacting}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Peripheral Vasodilators :"
                                content={state.peripheralvasodilators}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Loop diuretics :"
                                content={state.loopdiuretics}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Mineralocorticoid Receptor Antagonists :"
                                content={
                                    state.mineralocorticosteroidreceptorantagonists
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Thiazides :"
                                content={state.thiazides}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Renin Inhibitor :"
                                content={state.renininhibitors}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <SectionLabel
                                title="Others :"
                                content={state.others}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <div style={{ height: 10 }} />
                {/* Initial Assessment */}
                <SectionHeader title={"Assessment"} />
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
                        width: "100%",
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
                </Grid>

                {/* Initial Assessment */}
                <div style={{ height: 20 }} />
        </div>
    )
}

export default DialysisViewer;