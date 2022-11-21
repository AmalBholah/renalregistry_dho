import React, { Component } from "react";
import "./App.css";
import "@fontsource/roboto/500.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./userinterface/Login";
import NewPatient from "./userinterface/NewPatient";
import ListofPatients from "./userinterface/ListofPatients";
import EditPatient from "./userinterface/EditPatient";
import NewDialysis from "./userinterface/NewDialysis";
import UpdateDialysis from "./userinterface/UpdateDialysis";
import NewModeofdialysis from "./userinterface/NewModeofdialysis";
import Editmodeofdialysis from "./userinterface/Editmodeofdialysis";
import Stopdialysis from "./userinterface/Stopdialysis";
import Usermanagement from "./userinterface/adminpanel/Usermanagement";
import Hemodialysisunits from "./userinterface/adminpanel/Hemodialysisunits";
import Healthinstitutions from "./userinterface/adminpanel/Healthinstitutions";
import Comorbidities from "./userinterface/adminpanel/Comorbidities";
import Disabilities from "./userinterface/adminpanel/Disabilities";
import Changepassword from "./userinterface/Changepassword";
import ViewPatient from "./userinterface/ViewPatient";
export default class App extends Component {
  render() {
    return (
      // <Router basename="/renalregistry">
        // "homepage": "http://13.244.117.75/renalregistry/",
        <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/stopdialysis" element={<Stopdialysis />} />
          <Route path="/editmodeofdialysis" element={<Editmodeofdialysis />} />
          <Route path="/newmodeofdialysis" element={<NewModeofdialysis />} />
          <Route path="/editpatient" element={<EditPatient />} />
          <Route path="/registerpatient" element={<NewPatient />} />
          <Route path="/Viewpatient" element={<ViewPatient />} />
          <Route path="/newdialysis" element={<NewDialysis />} />
          <Route path="/listpatients" element={<ListofPatients />} />
          <Route path="/updatedialysis" element={<UpdateDialysis />} />
          <Route path="/changepassword" element={<Changepassword />} />
          {/* ADMIN PANEL */}
          <Route path="/usermanagement" element={<Usermanagement />} />
          <Route path="/hemodialysisunits" element={<Hemodialysisunits />} />
          <Route path="/healthinstitutions" element={<Healthinstitutions />} />
          <Route path="/comorbidities" element={<Comorbidities />} />
          <Route path="/disabilities" element={<Disabilities />} />
          {/* ADMIN PANEL */}
        </Routes>
      </Router>
    );
  }
}
