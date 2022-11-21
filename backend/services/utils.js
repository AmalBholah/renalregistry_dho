const fs = require("fs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const axios = require("axios");
var qs = require("qs");
const moment = require("moment");
const config = require("../config");
var CryptoJS = require("crypto-js");

const PUBLIC_KEY = fs.readFileSync(`./${config.RSA_KEY.PUBLIC}`, "utf-8");
const PRIVATE_KEY = fs.readFileSync(`./${config.RSA_KEY.PRIVATE}`, "utf-8");
const DRIVE_PRIVATE_KEY = fs.readFileSync(
  `./${config.SWAN_DRIVE_RSA_PRIVATE_KEY}`,
  "utf-8"
);
const JWT_MESSAGE = config.JWT_MESSAGE;
const JWT_HONEY_MESSAGE = config.JWT_HONEY_MESSAGE;

exports.axiosRequestEncrypted = (url, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(
        "axiosRequestEncrypted begin to process request to url=",
        url
      );

      // let encryptedBody = { ...body, ...this.encryptRSAPKCS1(body) };
      let encryptedBody = { ...this.encryptRSAPKCS1(body) };
      let response = await axios({
        method: "post",
        url: url,
        baseURL: config.SWAN_URL_API_ENCRYPTED,
        data: encryptedBody,
      });
      let resJson = response.data;
      // console.log("Show encrypted response from SWAN REST API - ", resJson);
      if (resJson.encrypted_data && resJson.encryption_key) {
        let r = {};
        r.data = {
          ...this.decryptRSAPKCS1(
            resJson.encrypted_data,
            resJson.encryption_key
          ),
        };
        // console.log("decryptRSAPKCS1 OK url - ", url);

        // now turning on for all requests, just to collect data a little
        try {
          let obj = {
            datetime: moment().format(),
            base_url: config.SWAN_URL_API_ENCRYPTED,
            url: url,
            body: body,
            status: response && response.status ? response.status : "",
            headers:
              response && response.headers
                ? JSON.stringify(response.headers)
                : "",
            data: response && response.data ? JSON.stringify(r.data) : "",
          };
          console.log(
            "axiosRequestEncrypted logging ...",
            obj.base_url + obj.url
          );
        } catch (saveToDynamoErr) {
          console.log("axiosRequestEncrypted saveToDynamoErr - ");
        }

        resolve(r);
      } else {
        resolve(response);
      }
    } catch (err) {
      /*
            // TODO save body to dynamoDb.failed_requests
            // datetime, baseURL, url, body, if(error.response) error.response.data,
                       if(error.response)error.response.status, if(error.response) error.response.headers
             */
      try {
        let obj = {
          datetime: moment().format(),
          base_url: config.SWAN_URL_API_ENCRYPTED,
          url: url,
          body: body,
          status:
            err.response && err.response.status ? err.response.status : "",
          headers:
            err.response && err.response.headers
              ? JSON.stringify(err.response.headers)
              : "",
          data:
            err.response && err.response.data
              ? JSON.stringify(err.response.data)
              : "",
        };
        console.log(
          "axiosRequestEncrypted Exception logging ...",
          obj.base_url + obj.url
        );
      } catch (saveToDynamoErr) {
        // nothing
      }

      console.log("axiosRequestEncrypted exception, url=", url);
      try {
        let responseUnencrypted = await axios({
          method: "post",
          url: url,
          baseURL: config.SWAN_URL_API,
          data: body,
        });
        console.log("axiosRequestUNencrypted success, url=", url);
        try {
          let obj = {
            datetime: moment().format(),
            base_url: config.SWAN_URL_API,
            url: url,
            body: body,
            status:
              responseUnencrypted && responseUnencrypted.status
                ? responseUnencrypted.status
                : "",
            headers:
              responseUnencrypted && responseUnencrypted.headers
                ? JSON.stringify(responseUnencrypted.headers)
                : "",
            data:
              responseUnencrypted && responseUnencrypted.data
                ? JSON.stringify(responseUnencrypted.data)
                : "",
          };
          console.log(
            "axiosRequestUnEncrypted logging ...",
            obj.base_url + obj.url
          );
        } catch (saveToDynamoErr) {
          // nothing
        }

        resolve(responseUnencrypted);
      } catch (error) {
        /*
                // TODO save body to dynamoDb.failed_requests
                // datetime, baseURL, url, body, if(error.response) error.response.data,
                           if(error.response)error.response.status, if(error.response) error.response.headers
                 */
        try {
          let obj = {
            datetime: moment().format(),
            base_url: config.SWAN_URL_API,
            url: url,
            body: body,
            status:
              error.response && error.response.status
                ? error.response.status
                : "",
            headers:
              error.response && error.response.headers
                ? JSON.stringify(error.response.headers)
                : "",
            data:
              error.response && error.response.data
                ? JSON.stringify(error.response.data)
                : "",
          };
          console.log(
            "axiosRequestUnEncrypted Exception logging ...",
            obj.base_url + obj.url
          );
        } catch (saveToDynamoErr) {
          // nothing
        }
        console.log("axiosRequestUNencrypted exception, url=", url);
        reject(error);
      }
    }
  });
};

exports.responseHandlerRsaAes = (
  reqBody,
  res,
  isResponseError,
  responseBody
) => {
  let statusCode = isResponseError ? 400 : 200;
  if (reqBody.encrypted_data && reqBody.encryption_key) {
    let encrypted = this.encryptRSAPKCS1(responseBody);
    res.status(statusCode).send({ ...encrypted });
  } else {
    // let encrypted = this.encryptRSAPKCS1(responseBody);
    res.status(statusCode).send(responseBody);
    // response.status(statusCode).send(responseBody);
  }
};

exports.getPublicKey = () => {
  return PUBLIC_KEY;
};

function reverse(s) {
  return [...s].reverse().join("");
}

exports.createToken = (nic) => {
  const payloadObj = {
    nic: nic,
    msg: reverse(JWT_MESSAGE),
  };
  const signOptions = {
    expiresIn: "7d", // 60 = 60s || "60" = "60ms" || "10h" || "10d"
    algorithm: "RS256",
  };
  const signedJWT = jwt.sign(payloadObj, PRIVATE_KEY, signOptions);
  return signedJWT;
};

exports.createHoneyToken = (nic) => {
  const payloadObj = {
    nic: nic,
    msg: reverse(JWT_HONEY_MESSAGE),
  };
  const signOptions = {
    expiresIn: "7d", // 60 = 60s || "60" = "60ms" || "10h" || "10d"
    algorithm: "RS256",
  };
  const signedJWT = jwt.sign(payloadObj, PRIVATE_KEY, signOptions);
  return signedJWT;
};

exports.signTokenToDrive = (nic) => {
  const payloadObj = {
    nic: nic,
  };
  const signOptions = {
    expiresIn: "7d", // 60 = 60s || "60" = "60ms" || "10h" || "10d"
    algorithm: "RS256",
  };
  const signedJWT = jwt.sign(payloadObj, DRIVE_PRIVATE_KEY, signOptions);
  return signedJWT;
};

exports.getOpenIdToken = (nic) => {
  return new Promise((resolve, reject) => {
    let data = qs.stringify({
      grant_type: "password",
      username: nic,
      scope: "openid",
      client_id: "swan-rnapp",
    });
    axios({
      baseURL: config.OPENID_URL_API,
      url: "/token",
      headers: {
        Authorization: config.OPENID_AUTHORIZATION,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      data: data,
    })
      .then((response) => {
        console.log("getOpenIdToken Response -", response.data);
        resolve(response.data);
      })
      .catch((err) => {
        console.log("getOpenIdToken Error -", err.toJSON());
        reject(err);
      });
  });
};

exports.decodedToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      PUBLIC_KEY,
      { ignoreExpiration: true },
      (err, decoded) => {
        if (err) {
          console.log("decodeToken ERROR - ", err);
          return reject(err);
        }
        console.log("decodeToken - ", decoded);
        resolve(decoded);
      }
    );
  });
};

exports.middlewareVerifyToken = (req, res, next) => {
  let tokenUnsliced = req.headers["authorization"];
  const verifyOptions = {
    // expiresIn: "120",  // 60 = 60s || "60" = "60ms" || "10h" || "10d"
    // algorithms: ['RS256']
  };

  console.log("tokenUnsliced - ", tokenUnsliced);
  if (tokenUnsliced) {
    // verifies secret and checks exp
    jwt.verify(tokenUnsliced, PUBLIC_KEY, verifyOptions, (err, decoded) => {
      if (err) {
        // console.log("ERROR - ", err);
        if (err.name === "TokenExpiredError") {
          console.log("Whoops, your token has expired!");
          return res.status(401).send({
            responseMsg: "TOKEN_EXPIRED",
            error: { message: "Your token has expired!" },
          });
        } else if (err.name === "JsonWebTokenError") {
          console.log("That JWT is malformed!");
          return res.status(401).send({
            responseMsg: "TOKEN_FAILED",
            error: { message: "Failed to authenticate token." },
          });
        } else {
          return res.status(401).send({
            responseMsg: "TOKEN_FAILED",
            error: { message: "Failed to authenticate token." },
          });
        }
      } else {
        console.log("Your JWT was successfully validated!");
        // console.log("Decoded data - ", decoded);
        req.body.decoded_body = { ...decoded };
        next();
      }
    });
  } else {
    return res.status(401).json({
      responseMsg: "Renal Registry",
      error: { message: "Access unauthorized" },
    });
  }
};

exports.middlewareVerifyHoneyToken = async (req, res, next) => {
  let tokenUnsliced = req.headers["authorization"];
  const verifyOptions = {
    // expiresIn: "120",  // 60 = 60s || "60" = "60ms" || "10h" || "10d"
    // algorithms: ['RS256']
  };

  console.log("tokenUnsliced - ", tokenUnsliced);
  if (tokenUnsliced) {
    // verifies secret and checks exp
    jwt.verify(
      tokenUnsliced,
      PUBLIC_KEY,
      verifyOptions,
      async (err, decoded) => {
        if (decoded && decoded.msg === reverse(JWT_HONEY_MESSAGE)) {
          console.log("Honeytoken detected! Request is logged. ");
        }

        if (err) {
          // console.log("ERROR - ", err);
          if (err.name === "TokenExpiredError") {
            console.log("Whoops, your token has expired!");
            return res.status(401).send({
              responseMsg: "TOKEN_EXPIRED",
              error: { message: "Your token has expired!" },
            });
          } else if (err.name === "JsonWebTokenError") {
            console.log("That JWT is malformed!");
            return res.status(401).send({
              responseMsg: "TOKEN_FAILED",
              error: { message: "Failed to authenticate token." },
            });
          } else {
            return res.status(401).send({
              responseMsg: "TOKEN_FAILED",
              error: { message: "Failed to authenticate token." },
            });
          }
        } else {
          next();
        }
      }
    );
  } else {
    return res.status(401).json({
      responseMsg: "TOKEN_FAILED",
      error: { message: "Token not found." },
    });
  }
};

exports.decryptRsaAesIfEncrypted = (req, res, next) => {
  if (req.body.encrypted_data && req.body.encryption_key) {
    req.body = {
      ...req.body,
      ...this.decryptRSAPKCS1(req.body.encrypted_data, req.body.encryption_key),
    };
  }
  console.log(req.body);
  next();
};

exports.createDataHash = (data) => {
  const hash = crypto.createHash("sha1");
  hash.update(JSON.stringify(data));
  const hashStr = hash.digest("hex");
  console.log("HASH - ", hashStr);
  return hashStr;
};

exports.transformDateInClaimDetail = (data) => {
  let claim_sheets;
  if (data.HealthClaimSheet) {
    claim_sheets = data.HealthClaimSheet;
    delete data["HealthClaimSheet"];
    data["HealthClaimSheets"] = [];
  } else {
    claim_sheets = data.HealthClaimSheets;
  }
  if (claim_sheets) {
    claim_sheets.forEach((it) => {
      it.DTVISIT = moment(it.DTVISIT, "YYYY-MM-DD").format("DD MMMM YYYY");
      it.DTSUBMIT = moment(it.DTSUBMIT, "YYYY-MM-DD").format("DD MMMM YYYY");
    });
    data.HealthClaimSheets = claim_sheets.sort((obj1, obj2) => {
      return new Date(obj2.date) > new Date(obj1.date) ? 1 : -1;
    });
  }

  if (data.HealthClaimPics) {
    // remove the PIC without UUID, delete not needed properties
    for (let i = 0; i < data.HealthClaimPics.length; i++) {
      if (
        !data.HealthClaimPics[i].UUID ||
        data.HealthClaimPics[i].UUID === ""
      ) {
        data.HealthClaimPics.splice(i, 1);
        i--;
      } else {
        delete data.HealthClaimPics[i].CLAIMREQNO;
      }
    }
  }

  return data;
};

exports.hasJsonObject = (str) => {
  if (typeof str !== "string") return false;
  try {
    const result = JSON.parse(str);
    const type = Object.prototype.toString.call(result);
    return type === "[object Object]";
  } catch (err) {
    return false;
  }
};

exports.createSecretKey = () => {
  let key = crypto.randomBytes(16).toString("hex"); //(32 characters)
  // console.log("createSecretKey - ", key);
  return key;
};

exports.encryptData = (data, key) => {
  const ENCRYPTION_KEY = key; // Must be 256 bits (32 characters)
  const IV_LENGTH = 16; // For AES, this is always 16

  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(data);

  encrypted = Buffer.concat([encrypted, cipher.final()]);
  let encryptedData = iv.toString("hex") + ":" + encrypted.toString("hex");
  // console.log("encryptedData - ", encryptedData);
  return encryptedData;
};

exports.decryptData = (text, key) => {
  let textParts = text.split(":");
  let iv = Buffer.from(textParts.shift(), "hex");
  let encryptedText = Buffer.from(textParts.join(":"), "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  let decryptedData = decrypted.toString();
  // console.log("decryptedData - ", decryptedData);

  return decryptedData;
};

exports.encryptSecretKeyPKCS1 = (key) => {
  const buffer = Buffer.from(key, "utf8");
  let encrypted = crypto.publicEncrypt(
    { key: PUBLIC_KEY, padding: crypto.constants.RSA_PKCS1_PADDING },
    buffer
  );
  encrypted = encrypted.toString("base64");
  // console.log("encryptSecretKeyPKCS1 - ", encrypted);
  return encrypted;
};

exports.decryptSecretKeyPKCS1 = (toDecrypt) => {
  const buffer = Buffer.from(toDecrypt, "base64");
  let decrypted = crypto.publicDecrypt(
    { key: PUBLIC_KEY, padding: crypto.constants.RSA_PKCS1_PADDING },
    buffer
  );
  decrypted = decrypted.toString("utf8");
  // console.log("decryptSecretKeyPKCS1 - ", decrypted);
  return decrypted;
};

exports.encryptRSAPKCS1 = (data) => {
  let secret = this.createSecretKey();
  let encryptedKey = this.encryptSecretKeyPKCS1(secret);
  let encryptedData = this.encryptData(JSON.stringify(data), secret);
  return {
    encryption_key: encryptedKey,
    encrypted_data: encryptedData,
  };
};

exports.decryptRSAPKCS1 = (data, key) => {
  let secret = this.decryptSecretKeyPKCS1(key);
  let decryptedData = this.decryptData(data, secret);
  return JSON.parse(decryptedData);
};

exports.encryptAESData = (data) => {
  let secret = this.generateAESSecret();
  const salt = CryptoJS.lib.WordArray.random(16);
  const iv = CryptoJS.lib.WordArray.random(16);

  const key = CryptoJS.PBKDF2(secret, salt, {
    keySize: 256 / 32,
    iterations: 10000,
    hasher: CryptoJS.algo.SHA256,
  });
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).ciphertext;
  const salt_iv_concat = CryptoJS.lib.WordArray.create()
    .concat(salt)
    .concat(iv);
  const encrypted_concat = CryptoJS.lib.WordArray.create().concat(encrypted);
  return {
    aesdata: `${salt_iv_concat.toString(
      CryptoJS.enc.Base64
    )}:${encrypted_concat.toString(CryptoJS.enc.Base64)}`,
  };
};

exports.decryptAESData = (data) => {
  return new Promise((resolve, reject) => {
    try {
      let secret = this.generateAESSecret();
      const salt_len = (iv_len = 16);
      let split_data = data.split(":");

      let salt_iv = CryptoJS.enc.Base64.parse(split_data[0]);
      let encrypted = CryptoJS.enc.Base64.parse(split_data[1]);

      let salt = CryptoJS.lib.WordArray.create(
        salt_iv.words.slice(0, salt_len / 4)
      );
      let iv = CryptoJS.lib.WordArray.create(
        salt_iv.words.slice(0 + salt_len / 4, (salt_len + iv_len) / 4)
      );

      const key = CryptoJS.PBKDF2(secret, salt, {
        keySize: 256 / 32,
        iterations: 10000,
        hasher: CryptoJS.algo.SHA256,
      });
      const decrypted = CryptoJS.AES.decrypt(
        {
          ciphertext: CryptoJS.lib.WordArray.create(encrypted.words),
        },
        key,
        {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }
      );
      let decrypted_str = decrypted.toString(CryptoJS.enc.Utf8);
      console.log("decrypted_str - ", decrypted_str);
      if (decrypted_str) {
        let decryptedData = JSON.parse(decrypted_str);
        return resolve(decryptedData);
      } else {
        return reject({ msg: "Can't decrypt data!" });
      }
    } catch (err) {
      console.log("decryptAESData: Error - ", err);
      return reject({ msg: "Can't decrypt data!" });
    }
  });
};

exports.numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

exports.respWithMsg = (msg, data) => {
  return { msg, data };
};
exports.middlewareDecryptReceivedRequest = async (req, res, next) => {
  try {
    if (req.body.aesdata) {
      console.log("Decrypt AES data");
      let decrypt = await this.decryptAESData(req.body.aesdata);
      req.body = { ...req.body, ...decrypt };
    }
    next();
  } catch (err) {
    res.status(400).send({ msg: "Can't decrypt data!" });
  }
};

exports.middlewareVerifyEqualNics = async (req, res, next) => {
  let nic = req.body && req.body.nic ? req.body.nic : "";
  let decoded_body =
    req.body && req.body.decoded_body ? req.body.decoded_body : "";
  let log = createSecurityLog(req);
  log.securityAlarm = false;
  if (nic && decoded_body) {
    if (
      nic.replace("-TEST", "").trim().valueOf() !== decoded_body.nic.valueOf()
    ) {
      console.log("LOG OBJ - ", log);
      // TODO: save log to dynamoDB
      log.securityAlarm = true;
      await createSecurityAlarmRecord(log);
      console.log(
        `Detect security. The denied to access the content! NIC value not equal ${nic} !== ${decoded_body.nic}`
      );
      return res
        .status(403)
        .send({ msg: "You do not have permission to access the content" });
    } else {
      createSecurityAlarmRecord(log);
    }
  } else {
    createSecurityAlarmRecord(log);
  }
  next();
};

exports.sortClaimsByDateDesc = (item1, item2) => {
  let maxItem1 = getMaxDate(item1.CREATEDAT, item1.UPDATEDAT);
  let maxItem2 = getMaxDate(item2.CREATEDAT, item2.UPDATEDAT);
  return maxItem2 - maxItem1;
};

const getMaxDate = (date1, date2) => {
  let max;
  if (date1 && date2) {
    max = moment.max(moment(date1), moment(date2));
  } else {
    if (!date1) {
      max = moment.max(moment(date2));
    } else {
      max = moment.max(moment(date1));
    }
  }
  return max.unix();
};

exports.generateAESSecret = () => {
  let str = "Connecting to your favorite app has never been that easy.";
  str = str + str;
  const hash = CryptoJS.SHA1(str);
  let hashStr = hash.toString(CryptoJS.enc.Hex);
  hashStr = hashStr.substring(0, 16);
  // console.log("hashStr - ", hashStr);
  return hashStr;
};

exports.checkPolicyUpdatedExpired = (policy) => {
  let expired = false;
  if (policy) {
    if (!policy.updatedAt) {
      expired = true;
    } else {
      let nowDate = Date.now();
      let updatedAt = policy.updatedAt || nowDate;
      console.log("checkPolicyUpdatedExpired updatedAt - ", updatedAt);
      console.log("checkPolicyUpdatedExpired nowDate - ", moment(nowDate));
      let timeDiff = moment(nowDate).diff(moment(updatedAt), "hours");
      console.log("checkPolicyUpdatedExpired timeDiff - ", timeDiff);

      if (timeDiff >= 4) {
        console.log(
          "checkPolicyUpdatedExpired: last update(hours ago) - ",
          timeDiff
        );
        return true;
      }
    }
  }

  return expired;
};

//RSA ENCRYPTION PUBLIC/PRIVATE KEY
exports.encryptUsingPublicKey = (data) => {
  const encryptedData = crypto.publicEncrypt(
    {
      key: PUBLIC_KEY,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(data)
  );
  return encryptedData.toString("base64");
};

exports.decryptUsingPrivateKey = (encryptedData) => {
  const decryptedData = crypto.privateDecrypt(
    {
      key: PRIVATE_KEY,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(encryptedData, "base64")
  );
  return decryptedData.toString();
};
