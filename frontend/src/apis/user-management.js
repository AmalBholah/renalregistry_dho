import axios from "axios";
import { BACKEND_SERVER_URL } from "../constants";

export async function authenticateUser(username, password) {
  let response = await axios({
    method: "POST",
    url: BACKEND_SERVER_URL + "/user-management/authenticateuser",
    data: { username: username, password: password },
  });
  return response.data;
}

export async function createuser(username, password, isadmin,healthinstitutioncode) {
  let response = await axios({
    method: "POST",
    url: BACKEND_SERVER_URL + "/user-management/createuser",
    data: { username: username, password: password, isadmin: isadmin,healthinstitutioncode:healthinstitutioncode },
  });
  return response.data;
}

export async function deleteuser(pkuserid) {
  let response = await axios({
    method: "POST",
    url: BACKEND_SERVER_URL + "/user-management/deleteuser",
    data: { pkuserid: pkuserid },
  });
  return response.data;
}

export async function listusers() {
  let response = await axios({
    method: "POST",
    url: BACKEND_SERVER_URL + "/user-management/listusers",
    data: {},
  });
  return response.data;
}
