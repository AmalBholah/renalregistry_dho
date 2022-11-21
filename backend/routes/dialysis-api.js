var express = require("express");
var router = express.Router();
const {
  createmodeofdialysis,
  viewModeofdialysis,
  updateModeofdialysis,
  createDialysisSession,
  updateDialysisSession,
  deleteDialysisSession,
  viewdialysissession,
  stopdialysis,
  deletestopdialysis,
  viewstopdialysis,
  updatetopdialysis,
  listDialysisSessions,
  listmodesofdialysis,
} = require("../dbinterface/dialysis");

const {
  viewComorbidities,
  viewDisabilities,
  createComorbidity,
  createDisability,
} = require("../dbinterface/registerpatient");

router.post("/createmodeofdialysis", async (req, res) => {
  var responseBody = await createmodeofdialysis(req.body);
  return res.status(200).send(responseBody);
});

router.post("/viewmodeofdialysis", async (req, res) => {
  var pkassessmentid = 0;
  var responseBody = {};
  var viewModeofdialysisResults = await viewModeofdialysis(
    parseInt(req.body.pkmodeofdialysisid.toString())
  );

  if (viewModeofdialysisResults.length > 0) {
    pkassessmentid = parseInt(
      viewModeofdialysisResults[0].pkassessmentid.toString()
    );
  }
  responseBody.modeofdialysis = viewModeofdialysisResults;
  responseBody.comorbidities = await viewComorbidities(pkassessmentid);
  responseBody.disabilities = await viewDisabilities(pkassessmentid);
  //Return Response 200
  return res.status(200).send(responseBody);
});

router.post("/updatemodeofdialysis", async (req, res) => {
  var pkassessmentid = parseInt(req.body.pkassessmentid.toString());
  //updateModeofdialysis clears off matching comorbidities and disabilities
  //updates both modeofdialysis and assessment.
  await updateModeofdialysis(req.body);

  //Retrieve pkassessmentid and push to comorbidities
  let comorbidities_array = req.body.comorbidities;
  if (comorbidities_array && comorbidities_array.length > 0) {
    comorbidities_array.map(async function (element) {
      await createComorbidity(pkassessmentid, element);
    });
  }

  //Retrieve pkassessmentid and push to disabilities
  let disabilities_array = req.body.disabilities;
  if (disabilities_array && disabilities_array.length > 0) {
    disabilities_array.map(async function (element) {
      await createDisability(pkassessmentid, element);
    });
  }
  //Return Response 200
  return res.status(200).send({ message: "Updated successfully", state: true });
});

router.post("/createdialysissession", async (req, res) => {
  let responseBody = await createDialysisSession(req.body);
  return res.status(200).send(responseBody);
});

router.post("/listmodesofdialysis", async (req, res) => {
  let responseBody = await listmodesofdialysis(req.body);
  return res.status(200).send(responseBody);
});

router.post("/updatedialysissession", async (req, res) => {
  var pkassessmentid = parseInt(req.body.pkassessmentid.toString());
  //updateDialysisSession clears off matching comorbidities and disabilities
  //updates both dialysis and assessment.
  await updateDialysisSession(req.body);

  //Retrieve pkassessmentid and push to comorbidities
  let comorbidities_array = req.body.comorbidities;
  if (comorbidities_array && comorbidities_array.length > 0) {
    comorbidities_array.map(async function (element) {
      await createComorbidity(pkassessmentid, element);
    });
  }

  //Retrieve pkassessmentid and push to disabilities
  let disabilities_array = req.body.disabilities;
  if (disabilities_array && disabilities_array.length > 0) {
    disabilities_array.map(async function (element) {
      await createDisability(pkassessmentid, element);
    });
  }
  //Return Response 200
  return res.status(200).send({ message: "Updated successfully", state: true });
});

router.post("/deletedialysissession", async (req, res) => {
  let responseBody = await deleteDialysisSession(req.body);
  return res.status(200).send(responseBody);
});

router.post("/listdialysissessions", async (req, res) => {
  let responseBody = await listDialysisSessions(req.body);
  return res.status(200).send(responseBody);
});

router.post("/viewdialysissession", async (req, res) => {
  var pkassessmentid = 0;
  var responseBody = {};
  var viewModeofdialysisResults = await viewdialysissession(
    parseInt(req.body.pkdialysisid.toString())
  );

  if (viewModeofdialysisResults.length > 0) {
    pkassessmentid = parseInt(
      viewModeofdialysisResults[0].pkassessmentid.toString()
    );
  }
  responseBody.dialysis = viewModeofdialysisResults;
  responseBody.comorbidities = await viewComorbidities(pkassessmentid);
  responseBody.disabilities = await viewDisabilities(pkassessmentid);
  //Return Response 200
  return res.status(200).send(responseBody);
});

router.post("/stopdialysis", async (req, res) => {
  let responseBody = await stopdialysis(req.body);
  return res.status(200).send(responseBody);
});

router.post("/deletestopdialysis", async (req, res) => {
  let responseBody = await deletestopdialysis(req.body);
  return res.status(200).send(responseBody);
});
router.post("/viewstopdialysis", async (req, res) => {
  let responseBody = await viewstopdialysis(req.body);
  return res.status(200).send(responseBody);
});
router.post("/updatetopdialysis", async (req, res) => {
  let responseBody = await updatetopdialysis(req.body);
  return res.status(200).send(responseBody);
});
module.exports = router;
