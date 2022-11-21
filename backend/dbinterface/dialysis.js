const { pool } = require("../dbinterface/connection");
const {
  createAssessment,
  createComorbidity,
  createDisability,
} = require("./registerpatient");

exports.createmodeofdialysis = (data) => {
  return new Promise(async (resolve, reject) => {
    var pkassessmentid = 0;
    var pkpatientid = data.pkpatientid;
    var currentDt = new Date();

    let results_Assessment = await createAssessment(pkpatientid, data);
    if (results_Assessment && results_Assessment.length > 0) {
      pkassessmentid = parseInt(results_Assessment[0].pkassessmentid);
    }

    const text =
      "INSERT INTO modeofdialysis(pkpatientid,pkassessmentid,hdunit,accessonfirsthemodialysis,hemodialysisstartedinprivate,pdwholedaysbeforefirstexchange,pdcatheterinsertiontechnique,createdon,krtmodality,dtmodechange,firstkrt,visitbeforekrt,seendaysbeforekrt,lastcreatininebeforekrt,lastegfrbeforekrt,lasthbbeforekrt,completedhepb,dialysisdelay,daysofdelay,whynotavgavf,createdby,hdunitcode,hdunitdescription) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)";
    const values = [
      parseInt(data.pkpatientid.toString()),
      pkassessmentid,
      data.hdunit,
      data.accessonfirsthemodialysis,
      data.hemodialysisstartedinprivate,
      parseInt(data.pdwholedaysbeforefirstexchange.toString()) || 0,
      data.pdcatheterinsertiontechnique,
      currentDt.toISOString().valueOf(),
      data.krtmodality,
      data.dtmodechange,
      data.firstkrt,
      data.visitbeforekrt,
      data.seendaysbeforekrt,
      parseFloat(data.lastcreatininebeforekrt.toString()) || 0,
      parseFloat(data.lastegfrbeforekrt.toString()) || 0,
      parseFloat(data.lasthbbeforekrt.toString()) || 0,
      data.completedhepb,
      data.dialysisdelay,
      data.daysofdelay,
      data.whynotavgavf,
      data.createdby,
      data.hdunitcode,
      data.hdunitdescription,
    ];
    pool.query(text, values, (error, results) => {
      console.warn(error);
    });
    //Retrieve pkassessmentid and push to comorbidities
    let comorbidities_array = data.comorbidities;
    if (comorbidities_array && comorbidities_array.length > 0) {
      comorbidities_array.map(async function (element) {
        await createComorbidity(pkassessmentid, element);
      });
    }

    //Retrieve pkassessmentid and push to disabilities
    let disabilities_array = data.disabilities;
    if (disabilities_array && disabilities_array.length > 0) {
      disabilities_array.map(async function (element) {
        await createDisability(pkassessmentid, element);
      });
    }
    return resolve({});
  });
};

exports.viewModeofdialysis = (pkmodeofdialysisid) => {
  return new Promise((resolve, reject) => {
    const text =
      "SELECT * FROM modeofdialysis INNER JOIN assessment ON modeofdialysis.pkassessmentid = assessment.pkassessmentid WHERE modeofdialysis.pkmodeofdialysisid = $1;";
    const values = [pkmodeofdialysisid];
    pool.query(text, values, (error, results) => {
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.viewdialysissession = (pkdialysisid) => {
  return new Promise((resolve, reject) => {
    const text =
      "SELECT * FROM dialysis INNER JOIN assessment ON dialysis.pkassessmentid = assessment.pkassessmentid WHERE dialysis.pkdialysisid = $1;";
    const values = [pkdialysisid];
    pool.query(text, values, (error, results) => {
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.updateModeofdialysis = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "delete from comorbidities where pkassessmentid = $1",
      [parseInt(data.pkassessmentid.toString())],
      (error, results) => {}
    );
    pool.query(
      "delete from disabilities where pkassessmentid = $1",
      [parseInt(data.pkassessmentid.toString())],
      (error, results) => {}
    );
    const modeofdialysis_sql =
      "update modeofdialysis set hdunit = $1, accessonfirsthemodialysis = $2, hemodialysisstartedinprivate = $3, pdwholedaysbeforefirstexchange = $4, pdcatheterinsertiontechnique = $5,krtmodality = $7,dtmodechange = $8,firstkrt = $9,visitbeforekrt = $10,seendaysbeforekrt = $11,lastcreatininebeforekrt = $12,lastegfrbeforekrt = $13,lasthbbeforekrt = $14,completedhepb = $15,dialysisdelay = $16,daysofdelay = $17,whynotavgavf = $18,hdunitcode = $19,hdunitdescription = $20 where pkmodeofdialysisid = $6;";
    const values = [
      data.hdunit,
      data.accessonfirsthemodialysis,
      data.hemodialysisstartedinprivate,
      data.pdwholedaysbeforefirstexchange || 0,
      data.pdcatheterinsertiontechnique,
      parseInt(data.pkmodeofdialysisid.toString()),
      data.krtmodality,
      data.dtmodechange,
      data.firstkrt,
      data.visitbeforekrt,
      data.seendaysbeforekrt,
      parseFloat(data.lastcreatininebeforekrt.toString()) || 0,
      parseFloat(data.lastegfrbeforekrt.toString()) || 0,
      parseFloat(data.lasthbbeforekrt.toString()) || 0,
      data.completedhepb,
      data.dialysisdelay,
      data.daysofdelay,
      data.whynotavgavf,
      data.hdunitcode,
      data.hdunitdescription,
    ];
    pool.query(modeofdialysis_sql, values, (error, results) => {});
    const assessment_sql =
      "update assessment set clinicalfrailtyscale = $1, smokingstatus = $2, alcoholusedisorder = $3, hepatitisb = $4, hepatitisc = $5, hiv = $6 where pkassessmentid = $7;";
    const values2 = [
      parseInt(data.clinicalfrailtyscale.toString()),
      data.smokingstatus,
      data.alcoholusedisorder,
      data.hepatitisb,
      data.hepatitisc,
      data.hiv,
      parseInt(data.pkassessmentid.toString()),
    ];
    pool.query(assessment_sql, values2, (error, results) => {});

    return resolve({});
  });
};

exports.createDialysisSession = (data) => {
  return new Promise(async (resolve, reject) => {
    var pkassessmentid = 0;
    var pkpatientid = parseInt(data.pkpatientid);
    var currentDt = new Date();

    let results_Assessment = await createAssessment(pkpatientid, data);
    console.log("results_Assessment", results_Assessment);
    if (results_Assessment && results_Assessment.length > 0) {
      pkassessmentid = parseInt(results_Assessment[0].pkassessmentid);
      console.log("pkassessmentid", pkassessmentid);
    }

    const text =
      "INSERT INTO dialysis(pkpatientid,pkassessmentid,currentmodeofdialysis,ureareductionratio,postdialysisweight,dialysisefficiency,hdunit,lastaccessusedfordialysis,sessionsperweek,hourspersession,hemoglobin,transferrinsaturation,calcium,bicarbonate,ferritin,glycosylatedhemoglobin,albumin,parathyroidhormone,phosphate,esaweekly,esaeachtwoweeks,esaeachfourweeks,irondose,insulin,sulphonylureas,dpp4i,glp1a,meglitinides,sglt2i,acarbose,metformin,other,acei,arb,ccblocker,betablocker,alphablocker,centrallyacting,peripheralvasodilators,loopdiuretics,mineralocorticosteroidreceptorantagonists,thiazides,renininhibitors,others,createdon,pdexchangesperday,pdfluidlitresperday,pdadequacy,bp,whyntc,createdby,hdunitcode,hdunitdescription) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53)";
    const values = [
      parseInt(data.pkpatientid.toString()),
      pkassessmentid,
      data.currentmodeofdialysis,
      parseFloat(data.ureareductionratio.toString()) || 0,
      parseFloat(data.postdialysisweight.toString()) || 0,
      parseFloat(data.dialysisefficiency.toString()) || 0,
      data.hdunit,
      data.lastaccessusedfordialysis,
      parseInt(data.sessionsperweek.toString()) || 0,
      parseInt(data.hourspersession.toString()) || 0,
      parseFloat(data.hemoglobin.toString()) || 0,
      parseFloat(data.transferrinsaturation.toString()) || 0,
      parseFloat(data.calcium.toString()) || 0,
      parseFloat(data.bicarbonate.toString()) || 0,
      parseFloat(data.ferritin.toString()) || 0,
      parseFloat(data.glycosylatedhemoglobin.toString()) || 0,
      parseFloat(data.albumin.toString()) || 0,
      parseFloat(data.parathyroidhormone.toString()) || 0,
      parseFloat(data.phosphate.toString()) || 0,
      parseFloat(data.esaweekly.toString()) || 0,
      parseFloat(data.esaeachtwoweeks.toString()) || 0,
      parseFloat(data.esaeachfourweeks.toString()) || 0,
      parseFloat(data.irondose.toString()) || 0,
      data.insulin,
      data.sulphonylureas,
      data.dpp4i,
      data.glp1a,
      data.meglitinides,
      data.sglt2i,
      data.acarbose,
      data.metformin,
      data.other,
      data.acei,
      data.arb,
      data.ccblocker,
      data.betablocker,
      data.alphablocker,
      data.centrallyacting,
      data.peripheralvasodilators,
      data.loopdiuretics,
      data.mineralocorticosteroidreceptorantagonists,
      data.thiazides,
      data.renininhibitors,
      data.others,
      currentDt.toISOString().valueOf(),
      data.pdexchangesperday,
      data.pdfluidlitresperday,
      data.pdadequacy,
      data.bp,
      data.whyntc,
      data.createdby,
      data.hdunitcode,
      data.hdunitdescription,
    ];
    pool.query(text, values, (error, results) => {
      console.log(error);
    });
    //Retrieve pkassessmentid and push to comorbidities
    let comorbidities_array = data.comorbidities;
    if (comorbidities_array && comorbidities_array.length > 0) {
      comorbidities_array.map(async function (element) {
        await createComorbidity(pkassessmentid, element);
      });
    }

    //Retrieve pkassessmentid and push to disabilities
    let disabilities_array = data.disabilities;
    if (disabilities_array && disabilities_array.length > 0) {
      disabilities_array.map(async function (element) {
        await createDisability(pkassessmentid, element);
      });
    }
    return resolve({});
  });
};

exports.updateDialysisSession = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "delete from comorbidities where pkassessmentid = $1",
      [parseInt(data.pkassessmentid.toString())],
      (error, results) => {
        console.log(error);
      }
    );
    pool.query(
      "delete from disabilities where pkassessmentid = $1",
      [parseInt(data.pkassessmentid.toString())],
      (error, results) => {
        console.log(error);
      }
    );

    const text =
      "update dialysis set currentmodeofdialysis = $1,ureareductionratio = $2,postdialysisweight = $3,dialysisefficiency =$4,hdunit = $5,lastaccessusedfordialysis = $6,sessionsperweek = $7,hourspersession = $8,hemoglobin = $9,transferrinsaturation = $10,calcium = $11,bicarbonate = $12,ferritin = $13,glycosylatedhemoglobin = $14,albumin = $15,parathyroidhormone = $16,phosphate = $17,esaweekly = $18,esaeachtwoweeks = $19,esaeachfourweeks = $20,irondose = $21,insulin = $22,sulphonylureas = $23,dpp4i = $24,glp1a = $25,meglitinides = $26,sglt2i = $27,acarbose = $28,metformin = $29,other = $30,acei = $31,arb = $32,ccblocker = $33,betablocker = $34,alphablocker = $35,centrallyacting = $36,peripheralvasodilators = $37,loopdiuretics = $38,mineralocorticosteroidreceptorantagonists = $39,thiazides = $40,renininhibitors = $41,others = $42, pdexchangesperday = $44, pdfluidlitresperday = $45,pdadequacy = $46, bp = $47, whyntc = $48, createdby = $49, hdunitcode = $50, hdunitdescription = $51 where pkdialysisid = $43";
    const values = [
      data.currentmodeofdialysis,
      parseFloat(data.ureareductionratio.toString()) || 0,
      parseFloat(data.postdialysisweight.toString()) || 0,
      parseFloat(data.dialysisefficiency.toString()) || 0,
      data.hdunit,
      data.lastaccessusedfordialysis,
      parseInt(data.sessionsperweek.toString()) || 0,
      parseInt(data.hourspersession.toString()) || 0,
      parseFloat(data.hemoglobin.toString()) || 0,
      parseFloat(data.transferrinsaturation.toString()) || 0,
      parseFloat(data.calcium.toString()) || 0,
      parseFloat(data.bicarbonate.toString()) || 0,
      parseFloat(data.ferritin.toString()) || 0,
      parseFloat(data.glycosylatedhemoglobin.toString()) || 0,
      parseFloat(data.albumin.toString()) || 0,
      parseFloat(data.parathyroidhormone.toString()) || 0,
      parseFloat(data.phosphate.toString()) || 0,
      parseFloat(data.esaweekly.toString()) || 0,
      parseFloat(data.esaeachtwoweeks.toString()) || 0,
      parseFloat(data.esaeachfourweeks.toString()) || 0,
      parseFloat(data.irondose.toString()) || 0,
      data.insulin,
      data.sulphonylureas,
      data.dpp4i,
      data.glp1a,
      data.meglitinides,
      data.sglt2i,
      data.acarbose,
      data.metformin,
      data.other,
      data.acei,
      data.arb,
      data.ccblocker,
      data.betablocker,
      data.alphablocker,
      data.centrallyacting,
      data.peripheralvasodilators,
      data.loopdiuretics,
      data.mineralocorticosteroidreceptorantagonists,
      data.thiazides,
      data.renininhibitors,
      data.others,
      parseInt(data.pkdialysisid.toString()),
      data.pdexchangesperday,
      data.pdfluidlitresperday,
      data.pdadequacy,
      data.bp,
      data.whyntc,
      data.createdby,
      data.hdunitcode,
      data.hdunitdescription,
    ];
    pool.query(text, values, (error, results) => {
      console.log(error);
    });
    const assessment_sql =
      "update assessment set clinicalfrailtyscale = $1, smokingstatus = $2, alcoholusedisorder = $3, hepatitisb = $4, hepatitisc = $5, hiv = $6 where pkassessmentid = $7;";
    const values2 = [
      parseInt(data.clinicalfrailtyscale.toString()) || 0,
      data.smokingstatus,
      data.alcoholusedisorder,
      data.hepatitisb,
      data.hepatitisc,
      data.hiv,
      parseInt(data.pkassessmentid.toString()),
    ];
    pool.query(assessment_sql, values2, (error, results) => {
      console.log(error);
    });

    return resolve({});
  });
};

exports.deleteDialysisSession = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "delete from dialysis where pkdialysisid = $1",
      [parseInt(data.pkdialysisid.toString())],
      (error, results) => {}
    );
    return resolve({
      message: "Dialysis session deleted successfully!",
      state: true,
    });
  });
};

exports.listDialysisSessions = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "select * from dialysis where pkpatientid = $1 order by createdon desc",
      [parseInt(data.pkpatientid.toString())],
      (error, results) => {
        if (results && results.rows) {
          return resolve(results.rows);
        } else {
          return resolve([]);
        }
      }
    );
  });
};

//STOP DIALYSIS
exports.stopdialysis = (data) => {
  return new Promise((resolve, reject) => {
    var currentDt = new Date();
    const text =
      "INSERT INTO stopdialysis(pkpatientid,dateoflastdialysis,reason,dateofdeath,causeofdeath,createdon,createdby) VALUES($1,$2,$3,$4,$5,$6,$7)";
    const values = [
      parseInt(data.pkpatientid.toString()),
      data.dateoflastdialysis,
      data.reason,
      data.dateofdeath,
      data.causeofdeath,
      currentDt.toISOString().valueOf(),
      data.createdby,
    ];
    pool.query(text, values, (error, results) => {
      return resolve({
        message: "Dialysis stopped successfully!",
        state: true,
      });
    });
  });
};

exports.deletestopdialysis = (data) => {
  return new Promise((resolve, reject) => {
    const text = "delete from stopdialysis where pkstopdialysisid = $1";
    const values = [parseInt(data.pkstopdialysisid.toString())];
    pool.query(text, values, (error, results) => {
      return resolve({
        message: "Stop dialysis deleted successfully!",
        state: true,
      });
    });
  });
};

exports.viewstopdialysis = (data) => {
  return new Promise((resolve, reject) => {
    const text = "select * from stopdialysis where pkpatientid = $1";
    const values = [parseInt(data.pkpatientid.toString())];
    pool.query(text, values, (error, results) => {
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.updatetopdialysis = (data) => {
  return new Promise((resolve, reject) => {
    const text =
      "update stopdialysis set dateoflastdialysis = $1, reason = $2, dateofdeath = $3, causeofdeath = $4 where pkstopdialysisid = $5";
    const values = [
      data.dateoflastdialysis,
      data.reason,
      data.dateofdeath,
      data.causeofdeath,
      parseInt(data.pkstopdialysisid.toString()),
    ];
    pool.query(text, values, (error, results) => {
      return resolve({
        message: "Stop dialysis updated successfully!",
        state: true,
      });
    });
  });
};

exports.listmodesofdialysis = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "select * from modeofdialysis where pkpatientid = $1 order by dtmodechange desc",
      [parseInt(data.pkpatientid.toString())],
      (error, results) => {
        if (results && results.rows) {
          return resolve(results.rows);
        } else {
          return resolve([]);
        }
      }
    );
  });
};
