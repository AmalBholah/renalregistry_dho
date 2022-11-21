var express = require("express");
const {
  clear_eraedta,
  create_eraedta,
  read_eraedta,
  seek_eraedta,
  delete_eraedta,
  createhealthinstitution,
  listhealthinstitutions,
  deletehealthinstitution,
  createhemodialysisunit,
  listhemodialysisunits,
  deletehemodialysisunit,
  createcomorbiditiesmaster,
  listcomorbiditiesmaster,
  deletecomorbiditiesmaster,
  createdisabilitiesmaster,
  listdisabilitiesmaster,
  deletedisabilitiesmaster,
} = require("../dbinterface/masters");
var router = express.Router();
const eraedta = require("../files/eraedta.json");

//eraedta - create & list & delete
router.post("/loaderaedtacodes", async (req, res) => {
  var responseBody = { message: "eraedta loaded successfully", state: true };
  //Clear eraedta table to avoid duplicates.
  await clear_eraedta();
  eraedta.map(async function (element) {
    await create_eraedta(element.CODE, element.DESCRIPTION);
  });
  return res.status(200).send(responseBody);
});

router.post("/readeraedtatable", async (req, res) => {
  var responseBody = await read_eraedta();
  return res.status(200).send(responseBody);
});

router.post("/seekeraedta", async (req, res) => {
  var responseBody = await seek_eraedta(req.body.description);
  return res.status(200).send(responseBody);
});

router.post("/deleteeraedta", async (req, res) => {
  var responseBody = await delete_eraedta(req.body);
  return res.status(200).send(responseBody);
});

//healthinstitutions create & list & delete
router.post("/createhealthinstitution", async (req, res) => {
  var responseBody = await createhealthinstitution(req.body);
  return res.status(200).send(responseBody);
});

router.post("/listhealthinstitutions", async (req, res) => {
  var responseBody = await listhealthinstitutions(req.body);
  return res.status(200).send(responseBody);
});

router.post("/deletehealthinstitution", async (req, res) => {
  var responseBody = await deletehealthinstitution(req.body);
  return res.status(200).send(responseBody);
});

//hemodialysisunit create & list & delete
router.post("/createhemodialysisunit", async (req, res) => {
  var responseBody = await createhemodialysisunit(req.body);
  return res.status(200).send(responseBody);
});

router.post("/listhemodialysisunits", async (req, res) => {
  var responseBody = await listhemodialysisunits(req.body);
  return res.status(200).send(responseBody);
});

router.post("/deletehemodialysisunit", async (req, res) => {
  var responseBody = await deletehemodialysisunit(req.body);
  return res.status(200).send(responseBody);
});

//comorbiditiesmaster create & list & delete
router.post("/createcomorbiditiesmaster", async (req, res) => {
  var responseBody = await createcomorbiditiesmaster(req.body);
  return res.status(200).send(responseBody);
});

router.post("/listcomorbiditiesmaster", async (req, res) => {
  var responseBody = await listcomorbiditiesmaster(req.body);
  return res.status(200).send(responseBody);
});

router.post("/deletecomorbiditiesmaster", async (req, res) => {
  var responseBody = await deletecomorbiditiesmaster(req.body);
  return res.status(200).send(responseBody);
});

//disabilitiesmaster create & list & delete
router.post("/createdisabilitiesmaster", async (req, res) => {
  var responseBody = await createdisabilitiesmaster(req.body);
  return res.status(200).send(responseBody);
});

router.post("/listdisabilitiesmaster", async (req, res) => {
  var responseBody = await listdisabilitiesmaster(req.body);
  return res.status(200).send(responseBody);
});

router.post("/deletedisabilitiesmaster", async (req, res) => {
  var responseBody = await deletedisabilitiesmaster(req.body);
  return res.status(200).send(responseBody);
});

module.exports = router;
