const { pool } = require("../dbinterface/connection");

exports.createUser = (username, password, isadmin, healthinstitutioncode) => {
  return new Promise((resolve, reject) => {
    var currentDt = new Date();
    var responseBody = {};
    const text =
      "INSERT INTO users(username,password,createdon,updatedon,lastlogin,isadmin,healthinstitutioncode) VALUES($1,$2,$3,$4,$5,$6,$7)";
    const values = [
      username,
      password,
      currentDt.toISOString().valueOf(),
      null,
      null,
      isadmin,
      healthinstitutioncode,
    ];

    pool.query(text, values, (error, results) => {
      if (error) {
        console.log(error);
        responseBody.data = {
          message: error.message,
          state: false,
        };
      } else {
        responseBody.data = {
          message: "User created successfully",
          state: true,
        };
      }
      return resolve(responseBody);
    });
  });
};

exports.doesUserExist = (username) => {
  return new Promise((resolve, reject) => {
    const text = "select * from users where username = $1";
    const values = [username];
    pool.query(text, values, (error, results) => {
      var userExists = false;
      console.log(results);
      if (results && results.rows.length > 0) {
        userExists = true;
      }

      return resolve(userExists);
    });
  });
};

exports.findUser = (username) => {
  return new Promise((resolve, reject) => {
    const text = "select * from users where username = $1";
    const values = [username];
    pool.query(text, values, (error, results) => {
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.listUsers = () => {
  return new Promise((resolve, reject) => {
    const text = "select pkuserid,username,isadmin from users";
    pool.query(text, (error, results) => {
      if (results && results.rows) {
        return resolve(results.rows);
      } else {
        return resolve([]);
      }
    });
  });
};

exports.removeUser = (pkuserid) => {
  return new Promise((resolve, reject) => {
    var responseBody = {};
    const text = "delete from users where pkuserid = $1";
    const values = [pkuserid];
    pool.query(text, values, (error, results) => {
      if (error) {
        console.log(error);
        responseBody.data = {
          message: error.message,
          state: false,
        };
      } else {
        responseBody.data = {
          message: "User deleted successfully",
          state: true,
        };
      }
      return resolve(responseBody);
    });
  });
};
