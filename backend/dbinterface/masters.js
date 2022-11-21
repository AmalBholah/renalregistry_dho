const { pool } = require("../dbinterface/connection");

exports.create_eraedta = (code, description) => {
  return new Promise((resolve, reject) => {
    const text = "INSERT INTO eraedta(code,description) VALUES($1,$2)";
    const values = [code, description];
    pool.query(text, values, (error, results) => {
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.clear_eraedta = () => {
  return new Promise((resolve, reject) => {
    const text = "delete from eraedta";
    pool.query(text, (error, results) => {
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.read_eraedta = () => {
  return new Promise((resolve, reject) => {
    const text = "select * from eraedta";
    pool.query(text, (error, results) => {
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.seek_eraedta = (description) => {
  console.log(description);
  return new Promise((resolve, reject) => {
    const text =
      "SELECT description,code FROM eraedta WHERE description LIKE '%" +
      description +
      "%' LIMIT 50; ";
    pool.query(text, (error, results) => {
      console.log(error);
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.delete_eraedta = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "delete from eraedta where pkeraedtaid = $1",
      [parseInt(data.pkicd10id.toString())],
      (error, results) => {}
    );
    return resolve({
      message: "ICD10 Code deleted successfully!",
      state: true,
    });
  });
};

//healthinstitutions create & list & delete
exports.createhealthinstitution = (data) => {
  return new Promise((resolve, reject) => {
    var currentDt = new Date();
    pool.query(
      "INSERT INTO healthinstitutions(code,description,createdon) VALUES($1,$2,$3)",
      [data.code, data.description, currentDt.toISOString().valueOf()],
      (error, results) => {}
    );
    return resolve({
      message: "healthinstitution created successfully!",
      state: true,
    });
  });
};

exports.listhealthinstitutions = () => {
  return new Promise((resolve, reject) => {
    var currentDt = new Date();
    pool.query("select * from healthinstitutions", (error, results) => {
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.deletehealthinstitution = (data) => {
  return new Promise((resolve, reject) => {
    var currentDt = new Date();
    pool.query(
      "delete from healthinstitutions where pkhealthinstitutionid = $1",
      [parseInt(data.pkhealthinstitutionid.toString())],
      (error, results) => {}
    );
    return resolve({
      message: "healthinstitution deleted successfully!",
      state: true,
    });
  });
};

//hemodialysisunit create & list & delete
exports.createhemodialysisunit = (data) => {
  return new Promise((resolve, reject) => {
    var currentDt = new Date();
    pool.query(
      "INSERT INTO hemodialysisunit(code,description,createdon) VALUES($1,$2,$3)",
      [data.code, data.description, currentDt.toISOString().valueOf()],
      (error, results) => {}
    );
    return resolve({
      message: "hemodialysisunit created successfully!",
      state: true,
    });
  });
};

exports.listhemodialysisunits = () => {
  return new Promise((resolve, reject) => {
    var currentDt = new Date();
    pool.query("select * from hemodialysisunit", (error, results) => {
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.deletehemodialysisunit = (data) => {
  return new Promise((resolve, reject) => {
    var currentDt = new Date();
    pool.query(
      "delete from hemodialysisunit where pkhemodialysisunitid = $1",
      [parseInt(data.pkhemodialysisunitid.toString())],
      (error, results) => {}
    );
    return resolve({
      message: "hemodialysisunit deleted successfully!",
      state: true,
    });
  });
};

//comorbiditiesmaster create & list & delete
exports.createcomorbiditiesmaster = (data) => {
  return new Promise((resolve, reject) => {
    var currentDt = new Date();
    pool.query(
      "INSERT INTO comorbiditiesmaster(name,createdon) VALUES($1,$2)",
      [data.name, currentDt.toISOString().valueOf()],
      (error, results) => {}
    );
    return resolve({
      message: "comorbiditiesmaster created successfully!",
      state: true,
    });
  });
};

exports.listcomorbiditiesmaster = () => {
  return new Promise((resolve, reject) => {
    pool.query("select * from comorbiditiesmaster", (error, results) => {
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.deletecomorbiditiesmaster = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "delete from comorbiditiesmaster where pkcomorbidityid = $1",
      [parseInt(data.pkcomorbidityid.toString())],
      (error, results) => {}
    );
    return resolve({
      message: "comorbiditiesmaster deleted successfully!",
      state: true,
    });
  });
};

//disabilitiesmaster create & list & delete
exports.createdisabilitiesmaster = (data) => {
  return new Promise((resolve, reject) => {
    var currentDt = new Date();
    pool.query(
      "INSERT INTO disabilitiesmaster(name,createdon) VALUES($1,$2)",
      [data.name, currentDt.toISOString().valueOf()],
      (error, results) => {}
    );
    return resolve({
      message: "disabilitiesmaster created successfully!",
      state: true,
    });
  });
};

exports.listdisabilitiesmaster = () => {
  return new Promise((resolve, reject) => {
    pool.query("select * from disabilitiesmaster", (error, results) => {
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.deletedisabilitiesmaster = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "delete from disabilitiesmaster where pkdisabilityid = $1",
      [parseInt(data.pkdisabilityid.toString())],
      (error, results) => {}
    );
    return resolve({
      message: "disabilitiesmaster deleted successfully!",
      state: true,
    });
  });
};
