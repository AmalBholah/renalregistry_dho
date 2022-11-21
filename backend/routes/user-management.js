var express = require("express");
var router = express.Router();
const {
  createUser,
  doesUserExist,
  findUser,
  removeUser,
  listUsers,
} = require("../dbinterface/users");
const {
  createToken,
  encryptUsingPublicKey,
  decryptUsingPrivateKey,
} = require("../services/utils");

/**
 * REQUIRED FIELDS
 * username
 * password
 * isadmin
 */
router.post("/createuser", async (req, res) => {
  let { username, password, isadmin, healthinstitutioncode } = req.body;
  var responseBody = {};
  let userExists = await doesUserExist(username);

  if (!userExists) {
    responseBody = await createUser(
      username,
      encryptUsingPublicKey(password),
      isadmin,
      healthinstitutioncode
    );
  } else {
    responseBody.data = {
      message: "User already exists!",
      state: false,
    };
  }

  return res.status(200).send(responseBody);
});

/**
 * REQUIRED FIELDS
 * username
 * password
 */
router.post("/authenticateuser", async (req, res) => {
  let { username, password } = req.body;
  var responseBody = {};
  var authenticationState = false;
  let getUser = await findUser(username);
  let isadmin = false;
  if (getUser && getUser.length > 0) {
    let retrieved_password = decryptUsingPrivateKey(getUser[0].password);
    isadmin = getUser[0].isadmin;
    if (retrieved_password == password) {
      authenticationState = true;
    }
  }
  if (!authenticationState) {
    responseBody.data = {
      message: "Username / Password combination incorrect",
      token: null,
      state: false,
      isadmin: isadmin,
      healthinstitutioncode: getUser[0].healthinstitutioncode,
    };
  } else {
    responseBody.data = {
      message: "Authentication successful",
      token: createToken(username),
      state: true,
      isadmin: isadmin,
      healthinstitutioncode: getUser[0].healthinstitutioncode,
    };
  }

  return res.status(200).send(responseBody);
});

/**
 * REQUIRED FIELDS
 * pkuserid
 */
router.post("/deleteuser", async (req, res) => {
  let { pkuserid } = req.body;
  let responseBody = await removeUser(pkuserid);
  return res.status(200).send(responseBody);
});

/**
 * NO REQUIRED FIELDS
 */
router.post("/listusers", async (req, res) => {
  let responseBody = await listUsers();
  return res.status(200).send(responseBody);
});
module.exports = router;
