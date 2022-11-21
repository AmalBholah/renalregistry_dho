const { pool } = require("../dbinterface/connection");

exports.createPatientRegistration = (data) => {
  return new Promise((resolve, reject) => {
    var currentDt = new Date();
    const text =
      "INSERT INTO patientregistration(identifierselection,identifiervalue,healthinstitution,unitnumber,surname,name,dateofbirth,gender,address,homenumber,mobilenumber,emailaddress,height,weight,birthweight,ethnicgroup,maritalstatus,occupation,currentemployment,previousoccupation,primaryrenaldiagnosis,secondaryrenaldiagnosis,patientondialysis,latestcreatinine,egfr,latesthb,dateperformed,createdon,primaryrenaldiagnosiscode,primaryrenaldiagnosisdescription,secondaryrenaldiagnosiscode,secondaryrenaldiagnosisdescription,modeofdialysis,hdunitcode,hdunitdescription,hdaccess,createdby,healthinstitutioncode,healthinstitutiondescription) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39) RETURNING pkpatientid";
    const values = [
      data.identifierselection,
      data.identifiervalue,
      data.healthinstitution,
      data.unitnumber,
      data.surname,
      data.name,
      data.dateofbirth,
      data.gender,
      data.address,
      data.homenumber,
      data.mobilenumber,
      data.emailaddress,
      parseFloat(data.height.toString()) || 0,
      parseFloat(data.weight.toString()) || 0,
      parseFloat(data.birthweight.toString()) || 0,
      data.ethnicgroup,
      data.maritalstatus,
      data.occupation,
      data.currentemployment,
      data.previousoccupation,
      data.primaryrenaldiagnosis,
      data.secondaryrenaldiagnosis,
      data.patientondialysis,
      parseFloat(data.latestcreatinine.toString()) || 0,
      parseFloat(data.egfr.toString()) || 0,
      parseFloat(data.latesthb.toString()) || 0,
      data.dateperformed,
      currentDt.toISOString().valueOf(),
      data.primaryrenaldiagnosiscode,
      data.primaryrenaldiagnosisdescription,
      data.secondaryrenaldiagnosiscode,
      data.secondaryrenaldiagnosisdescription,
      data.modeofdialysis,
      data.hdunitcode,
      data.hdunitdescription,
      data.hdaccess,
      data.createdby,
      data.healthinstitutioncode,
      data.healthinstitutiondescription,
    ];

    pool.query(text, values, (error, results) => {
      console.log(error);
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.createAssessment = (pkpatientid, data) => {
  return new Promise((resolve, reject) => {
    var currentDt = new Date();
    const text =
      "INSERT INTO assessment(pkpatientid,clinicalfrailtyscale,smokingstatus,alcoholusedisorder,hepatitisb,hepatitisc,hiv,createdon) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING pkassessmentid";
    const values = [
      pkpatientid,
      parseInt(data.clinicalfrailtyscale.toString()) || 0,
      data.smokingstatus,
      data.alcoholusedisorder,
      data.hepatitisb,
      data.hepatitisc,
      data.hiv,
      currentDt.toISOString().valueOf(),
    ];
    pool.query(text, values, (error, results) => {
      console.log(error);
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.createComorbidity = (pkassessmentid, data) => {
  return new Promise((resolve, reject) => {
    var currentDt = new Date();
    const text =
      "INSERT INTO comorbidities(pkassessmentid,name,createdon) VALUES($1,$2,$3)";
    const values = [
      pkassessmentid,
      data.name,
      currentDt.toISOString().valueOf(),
    ];
    pool.query(text, values, (error, results) => {
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.createDisability = (pkassessmentid, data) => {
  return new Promise((resolve, reject) => {
    var currentDt = new Date();
    const text =
      "INSERT INTO disabilities(pkassessmentid,name,createdon) VALUES($1,$2,$3)";
    const values = [
      pkassessmentid,
      data.name,
      currentDt.toISOString().valueOf(),
    ];
    pool.query(text, values, (error, results) => {
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.viewPatientRegistration = (pkpatientid) => {
  return new Promise((resolve, reject) => {
    const text =
      "SELECT * FROM patientregistration INNER JOIN assessment ON patientregistration.pkpatientid = assessment.pkpatientid WHERE patientregistration.pkpatientid = $1;";
    const values = [pkpatientid];
    pool.query(text, values, (error, results) => {
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.viewComorbidities = (pkassessmentid) => {
  return new Promise((resolve, reject) => {
    const text = "SELECT * FROM comorbidities WHERE pkassessmentid = $1;";
    const values = [pkassessmentid];
    pool.query(text, values, (error, results) => {
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.viewDisabilities = (pkassessmentid) => {
  return new Promise((resolve, reject) => {
    const text = "SELECT * FROM disabilities WHERE pkassessmentid = $1;";
    const values = [pkassessmentid];
    pool.query(text, values, (error, results) => {
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.updatePatientRegistration = (data) => {
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
    const patientregistration_sql =
      "update patientregistration set identifierselection = $1, identifiervalue = $2, healthinstitution = $3, unitnumber = $4, surname = $5, name = $6, dateofbirth = $7, gender = $8, address = $9, homenumber = $10, mobilenumber = $11, emailaddress = $12, height = $13, weight = $14, birthweight = $15, ethnicgroup = $16, maritalstatus = $17, occupation = $18, currentemployment = $19, previousoccupation = $20, primaryrenaldiagnosis = $21, secondaryrenaldiagnosis = $22, patientondialysis = $23, latestcreatinine = $24,egfr = $25, latesthb = $26,dateperformed = $27, primaryrenaldiagnosiscode = $29, primaryrenaldiagnosisdescription = $30, secondaryrenaldiagnosiscode = $31, secondaryrenaldiagnosisdescription = $32, modeofdialysis = $33, hdunitcode = $34, hdunitdescription = $35, hdaccess = $36, healthinstitutioncode = $37,healthinstitutiondescription = $38 where pkpatientid = $28;";
    const values = [
      data.identifierselection,
      data.identifiervalue,
      data.healthinstitution,
      data.unitnumber,
      data.surname,
      data.name,
      data.dateofbirth,
      data.gender,
      data.address,
      data.homenumber,
      data.mobilenumber,
      data.emailaddress,
      parseFloat(data.height.toString()) || 0,
      parseFloat(data.weight.toString()) || 0,
      parseFloat(data.birthweight.toString()) || 0,
      data.ethnicgroup,
      data.maritalstatus,
      data.occupation,
      data.currentemployment,
      data.previousoccupation,
      data.primaryrenaldiagnosis,
      data.secondaryrenaldiagnosis,
      data.patientondialysis,
      parseFloat(data.latestcreatinine.toString()) || 0,
      parseFloat(data.egfr.toString()) || 0,
      parseFloat(data.latesthb.toString()) || 0,
      data.dateperformed,
      parseInt(data.pkpatientid.toString()),
      data.primaryrenaldiagnosiscode,
      data.primaryrenaldiagnosisdescription,
      data.secondaryrenaldiagnosiscode,
      data.secondaryrenaldiagnosisdescription,
      data.modeofdialysis,
      data.hdunitcode,
      data.hdunitdescription,
      data.hdaccess,
      data.healthinstitutioncode,
      data.healthinstitutiondescription,
    ];
    pool.query(patientregistration_sql, values, (error, results) => {});
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
    pool.query(assessment_sql, values2, (error, results) => {});

    return resolve({});
  });
};

exports.deletePatientRegistration = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "delete from patientregistration where pkpatientid = $1",
      [parseInt(data.pkpatientid.toString())],
      (error, results) => {}
    );
    return resolve({ message: "Patient deleted successfully!", state: true });
  });
};

exports.listRegisteredPatients = (data) => {
  return new Promise((resolve, reject) => {
    var queryString =
      "select * from patientregistration order by createdon desc limit 100;";
    if (data.isadmin.toString() !== "true") {
      queryString =
        "select * from patientregistration where healthinstitutioncode = '" +
        data.healthinstitutioncode +
        "' order by createdon desc limit 100;";
      console.log("queryString", queryString);
    }

    pool.query(queryString, (error, results) => {
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.filterRegisteredPatients = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM patientregistration WHERE name ILIKE '%" +
        data.searchabletext +
        "%' OR surname ILIKE '%" +
        data.searchabletext +
        "%' OR identifiervalue ILIKE '%" +
        data.searchabletext +
        "%' OR address ILIKE '%" +
        data.searchabletext +
        "%' OR homenumber ILIKE '%" +
        data.searchabletext +
        "%' OR mobilenumber ILIKE '%" +
        data.searchabletext +
        "%' LIMIT 50; ",
      (error, results) => {
        if (results && results.rows) {
          var dataItems = [];
          results.rows.map((item) => {
            if (data.isadmin.toString() !== "true") {
              if (item.healthinstitutioncode == data.healthinstitutioncode) {
                dataItems.push(item);
              }
            }
          });
          if (data.isadmin.toString() == "true") {
            dataItems = results.rows;
          }

          return resolve(dataItems);
        } else {
          return resolve([]);
        }
      }
    );
  });
};
