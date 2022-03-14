import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import httpClient from "./httpClient";
import Intro from "./components/Intro.js"
import Dashboard from "./components/Dashboard.js"
import LoginForm from "./components/LoginForm.js"
import OtpVerification from "./components/OtpVerification.js"
import LeaveForm from "./components/LeaveForm.js"
import DisplayLeaves from "./components/DisplayLeaves.js"
import CheckLeaves from "./components/CheckLeaves.js"

import Navbar from './components/Navbar.js'
import './css/App.css';

function App() {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    imageUrl: ""
  });
  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");
        const data = resp.data;
        setUser(prevUser=> ({ ...prevUser, email: data['email'] }));
        setUser(prevUser=> ({ ...prevUser, firstName: data['givenName'] }));
        setUser(prevUser=> ({ ...prevUser, lastName: data['familyName'] }));
        setUser(prevUser=> ({ ...prevUser, imageUrl: data['imageUrl'] }));
        console.log("USER", user);
      } catch (error) {
        console.log("Not authenticated"); 
      }
    })();
  }, []);

  return (
    <div className="App">
      <Navbar user = {user} />
      <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Intro />} />
        <Route path="/login" exact element={<LoginForm />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/otpVerification" exact element={<OtpVerification />} />
        <Route path="/leaveForm" exact element={<LeaveForm />} />
        <Route path="/displayLeaves" exact element={<DisplayLeaves />} />
        <Route path="/checkLeaves" exact element={<CheckLeaves />} />
        {/* <Route component={NotFound} /> */}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
