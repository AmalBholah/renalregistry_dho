var express = require("express");
const {
  createPatientRegistration,
  createAssessment,
  createComorbidity,
  createDisability,
  viewPatientRegistration,
  viewComorbidities,
  viewDisabilities,
  updatePatientRegistration,
  deletePatientRegistration,
  listRegisteredPatients,
  filterRegisteredPatients,
} = require("../dbinterface/registerpatient");
var router = express.Router();

router.post("/registerpatient", async (req, res) => {
  let responseBody = {};
  var pkpatientid = 0;
  var pkassessmentid = 0;
  //Create row into patientregistration table
  let results_PatientRegistration = await createPatientRegistration(req.body);
  if (results_PatientRegistration && results_PatientRegistration.length > 0) {
    pkpatientid = parseInt(results_PatientRegistration[0].pkpatientid);
  }

  //Store pkpatientid in assessment table
  let results_Assessment = await createAssessment(pkpatientid, req.body);
  if (results_Assessment && results_Assessment.length > 0) {
    pkassessmentid = parseInt(results_Assessment[0].pkassessmentid);
  }

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
  return res.status(200).send(responseBody);
});

router.post("/viewpatient", async (req, res) => {
  let responseBody = {};
  var pkpatientid = parseInt(req.body.pkpatientid.toString());
  var pkassessmentid = 0;

  let patientregistrationResults = await viewPatientRegistration(pkpatientid);
  if (patientregistrationResults.length > 0) {
    pkassessmentid = parseInt(
      patientregistrationResults[0].pkassessmentid.toString()
    );
  }
  responseBody.patientregistration = patientregistrationResults;
  responseBody.comorbidities = await viewComorbidities(pkassessmentid);
  responseBody.disabilities = await viewDisabilities(pkassessmentid);
  //Return Response 200
  return res.status(200).send(responseBody);
});

router.post("/updatepatientregistration", async (req, res) => {
  var pkassessmentid = parseInt(req.body.pkassessmentid.toString());
  //updatePatientRegistration clears off matching comorbidities and disabilities
  //updates both patientregistration and assessment.
  await updatePatientRegistration(req.body);

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

router.post("/deletepatientregistration", async (req, res) => {
  let responseBody = await deletePatientRegistration(req.body);
  return res.status(200).send(responseBody);
});

router.post("/listregisteredpatients", async (req, res) => {
  let responseBody = await listRegisteredPatients(req.body);
  return res.status(200).send(responseBody);
});

router.post("/filterregisteredpatients", async (req, res) => {
  let responseBody = await filterRegisteredPatients(req.body);
  return res.status(200).send(responseBody);
});

module.exports = router;
