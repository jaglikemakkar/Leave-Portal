import { Button, Dropdown } from 'react-bootstrap';
import React from 'react'
import { useState, useEffect } from 'react'
import httpClient from "../httpClient";
import '../css/DisplayLeaves.css';
import Table from './Table.js';

export default function DisplayLeaves() {

  const [leaves, setLeaves] = useState([]);
  const [showLeaves, setShowLeaves] = useState([])
  const [headers, setHeaders] = useState(["Leave Id", "Nature", "Start Date", "Duration", "Status"]);
  const [data, setData] = useState([-1]);

  const fetchLeaves = async (e) => {
    try {
      const resp = await httpClient.post("//localhost:5000/fetchLeaves");
      setLeaves(resp["data"]['result'])
      setShowLeaves(resp["data"]['result'])
      return resp["data"]["result"]
      //   window.location.href = '/otpVerification';
    } catch (error) {
      if (error.response.status === 400) {
        alert("Error occured");
      }
    }
  }

  const updateData = (x)=>{
    let temp = [];
    for (let i=0; i<x.length; i++){
      temp.push([x[i].id, x[i].nature, x[i].start_date.slice(0,-12), x[i].duration, x[i].status]);
    }
    setData(temp);
  }

  useEffect(() => {
    (async () => {
      const xx = await fetchLeaves();
      updateData(xx);
      // console.log("xx", xx);
    } )();
  }, []);  
  

  return (
    <div>
      <h2>Applied Leaves</h2>

      {(data[0] != -1) ? (
        <Table headers = {headers} initialData = {data} />
      ) : (
        <p>loading...</p>
      )}

      {/* <div className='leaves_container'>
        <table className="table" id="tableID">
          <thead>
            <tr>
              <th>Leave Id</th>
              <th>Nature</th>
              <th>Request Date</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {showLeaves.map((leave) => (
              <tr className="cell-1" data-toggle="modal" data-target={"#modal-" + leave.id}>
                <td>{leave.id}</td>
                <td>{leave.nature}</td>
                <td>{leave.request_date}</td>
                <td>{leave.duration}</td>
                <td>{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
        {showLeaves.map((leave) => (
          <div className="modal fade" id={"modal-" + leave.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Leave Details</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p><b>Leave Id: </b>{leave.id}</p>
                  <p><b>Nature of leave: </b> {leave.nature}</p>
                  <p><b>Start Date of leave: </b> {leave.start_date.slice(0, -12)}</p>
                  <p><b>End Date of leave: </b> {leave.end_date.slice(0, -12)}</p>
                  <p><b>Duration of leave: </b> {leave.duration}</p>
                  <p><b>Request Date of leave: </b> {leave.request_date.slice(0, -12)}</p>
                  <p><b>Purpose of leave: </b> {leave.purpose}</p>
                  <p><b>Status: </b> {leave.status}</p>
                  <p><b>Authority Comment: </b> {leave.authority_comment}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    // </div >
  )
}
