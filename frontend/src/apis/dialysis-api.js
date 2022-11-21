import axios from "axios";
import { BACKEND_SERVER_URL } from "../constants";

export async function createdialysissession(dataSet) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/dialysis-api/createdialysissession",
    data: dataSet,
  });
  return response.data;
}

export async function listdialysissessions(pkpatientid) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/dialysis-api/listdialysissessions",
    data: { pkpatientid: pkpatientid },
  });
  return response.data;
}

export async function viewdialysissession(pkdialysisid) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/dialysis-api/viewdialysissession",
    data: { pkdialysisid: pkdialysisid },
  });
  return response.data;
}

export async function updatedialysissession(dataSet) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/dialysis-api/updatedialysissession",
    data: dataSet,
  });
  return response.data;
}

export async function createmodeofdialysis(dataSet) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/dialysis-api/createmodeofdialysis",
    data: dataSet,
  });
  return response.data;
}

export async function viewmodeofdialysis(pkmodeofdialysisid) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/dialysis-api/viewmodeofdialysis",
    data: { pkmodeofdialysisid: pkmodeofdialysisid },
  });
  return response.data;
}

export async function updatemodeofdialysis(dataSet) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/dialysis-api/updatemodeofdialysis",
    data: dataSet,
  });
  return response.data;
}

export async function listmodesofdialysis(pkpatientid) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/dialysis-api/listmodesofdialysis",
    data: { pkpatientid: pkpatientid },
  });
  return response.data;
}

export async function createstopdialysis(dataSet) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/dialysis-api/stopdialysis",
    data: dataSet,
  });
  return response.data;
}

export async function viewstopdialysis(dataSet) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/dialysis-api/viewstopdialysis",
    data: dataSet,
  });
  return response.data;
}
