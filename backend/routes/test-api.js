var express = require("express");

var router = express.Router();
const {
  createToken,
  encryptUsingPublicKey,
  decryptUsingPrivateKey,
} = require("../services/utils");

const { pool } = require("../dbinterface/connection");

router.post("/test", async (req, res) => {
  let body = req.body;
  let responseBody = {};
  const dtx = "somesupersecretdata";
  const encrypteddt = encryptUsingPublicKey(dtx);
  const decrypteddt = decryptUsingPrivateKey(encrypteddt);

  //let token = createToken("dummytoken");
  pool.query("SELECT * FROM TestTable", (error, results) => {
    if (error) {
      throw error;
    }
    responseBody.data = {
      encrypteddt: encrypteddt,
      encrypteddtlen: encrypteddt.toString().length,
      decrypteddt: decrypteddt,
      token: createToken("dummytoken"),
      rows: results.rows,
    };
    return res.status(200).send(responseBody);
  });
});

module.exports = router;
