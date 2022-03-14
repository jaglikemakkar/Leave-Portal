
import React from 'react'
import { useState, useEffect } from 'react'
import httpClient from "../httpClient";
import '../css/CheckLeaves.css';
import { Button, Dropdown } from 'react-bootstrap';

export default function CheckLeaves() {


  
  const [leaves, setLeaves] = useState([]);
  const fetchLeaves = async (e) => {
    try {
      const user_id = "1";
      const resp = await httpClient.post("//localhost:5000/check_leaves", { user_id });
      setLeaves(resp["data"]['result'])

    } catch (error) {
      if (error.response.status === 400) {
        alert("Error occured");
      }
    }
  }
  useEffect(() => {

    fetchLeaves();
  }, []);

  const approveLeave = async (leave_id) => {
    try {
      console.log("Leave Id: ", leave_id);
      const resp = await httpClient.post("//localhost:5000/approve_leave", { leave_id });

    } catch (error) {
      alert("Some error occurred");
    }
  }

  const styles = {
    border: '1px solid black',
    color: 'white',
    backgroundColor: 'black'
  };

  return (
    <div>
      <h2>Check Leaves</h2>
      <div className='leaves_container'>
        <ul className="list-group">
          <div class="row " style={styles} >
            <div class="col-sm-2" style={{ margin: "0px", padding: "0px", padding: "10px" }}> <Button className="btn btn-dark" >Type of leave</Button> </div>
            <div class="col-sm-3 " style={{ margin: "0px", padding: "0px", padding: "10px" }}> <Button className="btn btn-dark" >Date of Request</Button></div>
            <div class="col-sm-4" style={{ margin: "0px", padding: "0px", padding: "10px" }}><Button className="btn btn-dark" >Email-id</Button></div>
            <div class="col-sm-3" style={{ margin: "0px", padding: "0px", padding: "10px" }}><Button className="btn btn-dark" >Status</Button></div>
          </div>
          {leaves.map((leave) => (
            <li className="list-group-item list-group-item-primary" style={{ margin: "0px", padding: "0px", borderColor: "blue" }}>

              <div className="accordion" id="accordionExample" >
                <div className="card" style={{backgroundColor: "inherit"}}>

                  <div className="card-header" id="headingOne" style={{ borderColor: "blue" }}>
                    <div data-toggle="collapse" aria-expanded="true" data-target={"#collapseOne" + leave.id} aria-controls={"#collapseOne" + leave.id} >
                      <div id="leftbox">
                        {leave.nature}
                      </div>
                      <div id="middlebox" >
                        <div class="row">
                          <div class="col-md-6">
                            {leave.request_date.slice(0, -12)}
                          </div>
                          <div class="col-md-6">
                            {leave.email}
                          </div>
                        </div>
                      </div>
                      <div id="rightbox" >
                        <button style={{ margin: "0 4px" }} className="btn btn-outline-success" onClick={() => { approveLeave(leave.id) }}>Approve</button>
                        <button style={{ margin: "0 4px" }} className="btn btn-outline-danger" onClick={() => { approveLeave(leave.id) }}>Disapprove</button>
                      </div>
                    </div>
                  </div>
                  <div id={"collapseOne" + leave.id} className="collapse" aria-labelledby="headingOne">
                    <div className="card-body">
                      <p>Nature of leave : {leave.nature}</p>
                      <p>Purpose of leave : {leave.purpose}</p>
                      <p>Start Date of leave : {leave.start_date.slice(0, -12)}</p>
                      <p>End Date of leave : {leave.end_date.slice(0, -12)}</p>
                      <p>Duration of leave : {leave.duration}</p>
                      <p>Request Date of leave : {leave.request_date.slice(0, -12)}</p>
                      <p>Authority Comment : {leave.authority_comment}</p>
                    </div>
                  </div>
                </div>

              </div>
            </li>


            // <div className= "boxes">

            // <div id = "leftbox" style={{backgroundColor:"rgb(161, 216, 252)"}}>
            //     {leave.request_date}
            // </div> 

            // <div id = "middlebox">
            //     {leave.nature}
            // </div>

            // <div id = "rightbox">
            // {leave.authority_comment}
            // </div>
            // </div>  
          ))}
        </ul>
      </div>
    </div>
  )
}
