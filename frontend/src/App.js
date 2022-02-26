import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import httpClient from "./httpClient";
import Intro from "./components/Intro.js"
import Dashboard from "./components/Dashboard.js"
import LoginForm from "./components/LoginForm.js"
import OtpVerification from "./components/OtpVerification.js"

import Navbar from './components/Navbar.js'
import './css/App.css';

function App() {
  const [user, setUser] = useState(new Map());
  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");
        setUser(resp.data);
        console.log("USERRRRRRR", user)
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
        {/* <Route component={NotFound} /> */}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
