// import ReactTable from "react-table";  
// import "react-table/react-table.css";  
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
      const obj = [{
        id: 1,
        nature: "CL",
        start_date: "12 jan",
        end_date: "13 Jan",
        duration: "12",
        request_date: "12",
        purpose: "haoliday",
        status: "1"
      }]
      setShowLeaves(obj)
      setShowLeaves(obj)
      console.log("fsdfffffffffffff")
      return obj;
      // setLeaves(resp["data"]['result'])
      // setShowLeaves(resp["data"]['result'])

      return resp["data"]["result"]
      //   window.location.href = '/otpVerification';
    } catch (error) {
      if (error.response.status === 400) {
        alert("Error occured");
      }
    }
  }

  const updateData = (x) => {
    let temp = [];
    for (let i = 0; i < x.length; i++) {
      temp.push([x[i].id, x[i].nature, x[i].start_date.slice(0, -12), x[i].duration, x[i].status]);
    }
    setData(temp);
  }

  useEffect(() => {
    (async () => {
      const xx = await fetchLeaves();
      updateData(xx);
      // console.log("xx", xx);
    })();
  }, []);


  return (
    <div>
      <h2>Applied Leaves</h2>

      {(data[0] != -1) ? (
        <Table headers={headers} initialData={data} />
      ) : (
        <p>loading...</p>
      )}
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
              <div className="modaldata">
                <table className='tabledata'>
                  <tr>
                    <td><b>Leave Id:</b></td>
                    <td>{leave.id}</td>
                  </tr>
                  <tr>
                    <td><b>Nature of leave: </b></td>
                    <td>{leave.nature}</td>

                  </tr>
                  <tr>
                    <td><b>Start Date of leave: </b></td>
                    <td>{leave.start_date.slice(0, -12)}</td>
                  </tr>
                  <tr>
                    <td><b>End Date of leave: </b></td>
                    <td>{leave.end_date.slice(0, -12)}</td>
                  </tr>
                  <tr>
                    <td><b>Duration of leave: </b></td>
                    <td>{leave.duration}</td>
                  </tr>
                  <tr>
                    <td><b>Request Date of leave: </b></td>
                    <td>{leave.request_date.slice(0, -12)}</td>
                  </tr>
                  <tr>
                    <td><b>Purpose of leave: </b></td>
                    <td>{leave.purpose}</td>
                  </tr>
                  <tr>
                    <td><b>Status: </b> </td>
                    <td>{leave.status}</td>
                  </tr>
                  <tr>
                    <td><b>Authority Comment: </b></td>
                    <td>{leave.authority_comment}</td>
                  </tr>
                </table>
                {/*                  
                  <p><b>Status: </b> {leave.status}</p>
                  <hr />
                  <p><b>Authority Comment: </b> {leave.authority_comment}</p>
                  <hr /> */}

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
