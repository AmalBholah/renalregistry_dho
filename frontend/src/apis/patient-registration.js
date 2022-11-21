import axios from "axios";
import { BACKEND_SERVER_URL } from "../constants";

export async function registerpatient(dataItem) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/patient-registration/registerpatient",
    data: dataItem,
  });
  return response.data;
}

export async function updatepatientregistration(dataItem) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/patient-registration/updatepatientregistration",
    data: dataItem,
  });
  return response.data;
}

export async function listregisteredpatients(isadmin,healthinstitutioncode) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/patient-registration/listregisteredpatients",
    data: {isadmin:isadmin,healthinstitutioncode:healthinstitutioncode},
  });
  return response.data;
}

export async function filterregisteredpatients(txt,isadmin,healthinstitutioncode) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/patient-registration/filterregisteredpatients",
    data: { searchabletext: txt,isadmin:isadmin,healthinstitutioncode:healthinstitutioncode },
  });
  return response.data;
}

export async function viewpatient(pkpatientid) {
  let response = await axios({
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    method: "POST",
    url: BACKEND_SERVER_URL + "/patient-registration/viewpatient",
    data: { pkpatientid: pkpatientid },
  });
  return response.data;
}
