import React, { useState } from 'react'
import httpClient from "../httpClient";
import '../css/LeaveForm.css';
import { isDate, isEmail, isName } from "./helpers/validators";

export default function LeaveForm() {
  const [state, setState] = useState({
    name: "Jaglike",
    email: "2019csb1092@iitrpr.ac.in",
    phone: "7814245626",
    duration: "2",
    rdate: (new Date()).toISOString().substr(0, 10),
    sdate: (new Date()).toISOString().substr(0, 10),
    edate: (new Date()).toISOString().substr(0, 10),
    nature: "CL",
    isStation: "Yes",
    purpose: "This is the purpose",
    altArrangements: "These are the alternative arrangements.",
    errorMsg: "",
  });

  const validate = () => {
    let flag = 1;
    if (!isName(state.name)) {
      setState({ ...state, errorMsg: "Please enter valid name" });
      flag = 0;
    } else if (!isEmail(state.email)) {
      setState({ ...state, errorMsg: "Please enter valid email address" });
      flag = 0;
    } else if (!isDate(state.startDate)) {
      setState({ ...state, errorMsg: "Please check the start Date" });
      flag = 0;
    } else if (!isDate(state.endDate)) {
      setState({ ...state, errorMsg: "Please check the end Date" });
      flag = 0;
    } else if (!isName(state.purpose)) {
      setState({ ...state, errorMsg: "Please enter valid reason" });
      flag = 0;
    }else if (!isName(state.nature)) {
      setState({ ...state, errorMsg: "Please enter valid nature" });
      flag = 0;
    }else if (!isName(state.duration)) {
      setState({ ...state, errorMsg: "Please enter valid duration" });
      flag = 0;
    }else if (!isName(state.purpose)) {
      setState({ ...state, errorMsg: "Please enter valid reason" });
      flag = 0;
    }else if (!isName(state.phone)) {
      setState({ ...state, errorMsg: "Please enter valid Phone Number" });
      flag = 0;
    }   else {
      setState({ ...state, errorMsg: "" });
    }
    if (flag) return true;
    return false;
  };

  const sendApplication = ()=>{
    // console.log("H", state);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const name = document.getElementById('form_name').value;
    const email = document.getElementById('form_email').value;
    const phone = document.getElementById('form_phone').value;
    const nature = document.getElementById('form_nature').value;
    const duration = document.getElementById('form_duration').value;
    const isStation = document.getElementById('form_isStation').value;
    const sdate = document.getElementById('form_sdate').value;
    const edate = document.getElementById('form_edate').value;
    const purpose = document.getElementById('form_purpose').value;
    const altArrangements = document.getElementById('form_altArrangements').value;
    setState(prevState=> ({ ...prevState, name: name }));
    setState(prevState=> ({ ...prevState, email: email }));
    setState(prevState=> ({ ...prevState, phone: phone }));
    setState(prevState=> ({ ...prevState, nature: nature }));
    setState(prevState=> ({ ...prevState, duration: duration }));
    setState(prevState=> ({ ...prevState, isStation: isStation }));
    setState(prevState=> ({ ...prevState, sdate: sdate }));
    setState(prevState=> ({ ...prevState, edate: edate }));
    setState(prevState=> ({ ...prevState, purpose: purpose }));
    setState(prevState=>({ ...prevState, altArrangements: altArrangements }));
    console.log("State: ", state);

    document.querySelector('.leaveform button').classList.add('disabled');
    
    try {
      const resp = await httpClient.post("//localhost:5000/leave_application", { state });
      console.log("Response:", resp);
    } catch (error) {
      if (error.response.status === 400) {
        alert("Leave Application Unsuccessful");
      }
    }
  }

  return (
    <div className="formWrapper">
      <div className="leaveform cardbody-color">
        <h1>Leave Form</h1>
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <legend htmlFor="form_name">Name</legend>
              <input type="text" className="form-control" id="form_name" placeholder="Name" defaultValue={state.name} />
            </div>
            <div className="form-group col-md-6">
              <legend htmlFor="form_email">Email</legend>
              <input type="email" className="form-control" id="form_email" placeholder="Email" defaultValue={state.email} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <legend htmlFor="form_phone">Phone Number</legend>
              <input type="tel" className="form-control" id="form_phone" placeholder="Phone Number" defaultValue={state.phone} />
            </div>
            <div className="form-group col-md-6">
              <legend htmlFor="form_nature">Nature of leave</legend>
              <select className="form-control" id="form_nature">
                <option>CL</option>
                <option>RH</option>
                <option>SCL</option>
                <option>On Duty</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">

              <legend htmlFor="form_isStation">Is satation leave?</legend>
              <select className="form-control" id="form_isStation">
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <legend htmlFor="form_duration">Duration of leave</legend>
              <input type="number" className="form-control" id="form_duration" placeholder="Duration" defaultValue={state.duration} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <legend htmlFor="form_sdate">Start Date</legend>
              <input type="date" id="form_sdate" placeholder="Pick start date" className="form-control" defaultValue={state.sdate} required></input>
            </div>
            <div className="form-group col-md-6">
              <legend htmlFor="form_edate">End Date</legend>
              <input type="date" id="form_edate" placeholder="Pick end date" className="form-control" defaultValue={state.edate} required></input>
            </div>
          </div>

          <div className="form-group">
            <legend htmlFor="form_purpose">Purpose of leave</legend>
            <textarea id="form_purpose" className="form-control" defaultValue={state.purpose}>
            </textarea>
          </div>

          <div className="form-group">
            <legend htmlFor="form_altArrangements">Alternative Arrangements</legend>
            <textarea id="form_altArrangements" className="form-control" defaultValue={state.altArrangements}>
            </textarea>
          </div>
          <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">Apply for leave</button>
        </form>
      </div>
    </div >
    //     </div >
    // </div >
  )
}
