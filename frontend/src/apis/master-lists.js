import axios from "axios";
import { BACKEND_SERVER_URL } from "../constants";

export async function readeraedtatable() {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/master-lists/readeraedtatable",
    data: {},
  });
  return response.data;
}

export async function seekeraedta(searchParam) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/master-lists/seekeraedta",
    data: { description: searchParam },
  });
  return response.data;
}

//HEMODIALYSIS UNITS

export async function listhemodialysisunits() {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/master-lists/listhemodialysisunits",
    data: {},
  });
  return response.data;
}

export async function deletehemodialysisunit(pkhemodialysisunitid) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/master-lists/deletehemodialysisunit",
    data: { pkhemodialysisunitid: pkhemodialysisunitid },
  });
  return response.data;
}

export async function createhemodialysisunit(dataItem) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/master-lists/createhemodialysisunit",
    data: dataItem,
  });
  return response.data;
}

//HEALTH INSTITUTIONS

export async function listhealthinstitutions() {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/master-lists/listhealthinstitutions",
    data: {},
  });
  return response.data;
}

export async function createhealthinstitution(dataItem) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/master-lists/createhealthinstitution",
    data: dataItem,
  });
  return response.data;
}

export async function deletehealthinstitution(pkhealthinstitutionid) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/master-lists/deletehealthinstitution",
    data: { pkhealthinstitutionid: pkhealthinstitutionid },
  });
  return response.data;
}

//COMORBIDITIES
export async function listcomorbiditiesmaster() {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/master-lists/listcomorbiditiesmaster",
    data: {},
  });
  return response.data;
}

export async function createcomorbiditiesmaster(dataItem) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/master-lists/createcomorbiditiesmaster",
    data: dataItem,
  });
  return response.data;
}

export async function deletecomorbiditiesmaster(pkcomorbidityid) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/master-lists/deletecomorbiditiesmaster",
    data: { pkcomorbidityid: pkcomorbidityid },
  });
  return response.data;
}

//DISABILITIES
export async function listdisabilitiesmaster() {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/master-lists/listdisabilitiesmaster",
    data: {},
  });
  return response.data;
}

export async function createdisabilitiesmaster(dataItem) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/master-lists/createdisabilitiesmaster",
    data: dataItem,
  });
  return response.data;
}

export async function deletedisabilitiesmaster(pkdisabilityid) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/master-lists/deletedisabilitiesmaster",
    data: { pkdisabilityid: pkdisabilityid },
  });
  return response.data;
}
