
import React from 'react'
import { useState, useEffect } from 'react'
import httpClient from "../httpClient";
import '../css/CheckLeaves.css';
import { Button, Dropdown } from 'react-bootstrap';
import Table from './Table.js';
export default function CheckLeaves({ user }) {

  if (user.level == "faculty") {
    window.location.href = '/Dashboard';
  }

  const [leaves, setLeaves] = useState([]);
  const [headers, setHeaders] = useState(["Leave Id", "Nature", "Name", "Start Date", "Status"]);
  const [data, setData] = useState([-1]);

  const fetchLeaves = async (e) => {
    try {
      const resp = await httpClient.post("//localhost:5000/check_leaves");
      setLeaves(resp["data"]['result'])
      console.log("Dataa", resp["data"]["result"])
      return resp["data"]["result"]

    } catch (error) {
      if (error.response.status === 400) {
        alert("Error occured");
      }
    }
  }

  const updateData = (x) => {
    let temp = [];
    for (let i = 0; i < x.length; i++) {
      temp.push([x[i].id, x[i].nature, x[i].name, x[i].start_date.slice(0, -12), x[i].status]);
    }
    setData(temp);
  }

  useEffect(() => {

    fetchLeaves();
    (async () => {
      const xx = await fetchLeaves();
      updateData(xx);
      // console.log("xx", xx);
    })();

  }, []);

  const approveLeave = async (leave_id) => {
    try {
      console.log("Leave Id: ", leave_id);
      console.log("Leaves", leaves);
      let temp = leaves;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id == leave_id) {
          temp[i].status = "Approved by Hod";
        }
      }
      setLeaves(temp);
      console.log(leaves);

      const resp = await httpClient.post("//localhost:5000/approve_leave", { leave_id, level : user.level });
      window.location.reload();
    } catch (error) {
      alert("Some error occurred");
    }
  }

  const disapproveLeave = async (leave_id) => {
    try {
      console.log("Leave Id: ", leave_id);
      console.log("Leaves", leaves);
      let temp = leaves;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id == leave_id) {
          temp[i].status = "Disapproved by Hod";
        }
      }
      setLeaves(temp);
      console.log(leaves);

      const resp = await httpClient.post("//localhost:5000/disapprove_leave", { leave_id });
      window.location.reload();
    } catch (error) {
      alert("Some error occurred");
    }
  }

  const addComment = async (leave_id) => {
    try {
      const uid = "comment-" + leave_id;
      const comment = document.getElementById(uid).value;
      console.log("Comment:", comment);
      const resp = await httpClient.post("//localhost:5000/add_comment", { comment, leave_id });
      window.location.reload();
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

      {(data[0] != -1) ? (
        <Table headers={headers} initialData={data} />
      ) : (
        <p>loading...</p>
      )}

      {leaves.map((leave) => (
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
                <table className='table table-condensed'>
                  <tbody>
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
                      <td><b>Duration of leave: </b></td>
                      <td>{leave.duration}</td>
                    </tr>
                    <tr>
                      <td><b>Total Leaves of Faculty</b></td>
                      <td>{leave[leave.key1]}</td>
                    </tr>
                    <tr>
                      <td><b>Balance as on Date</b></td>
                      <td>{leave[leave.key1] - leave[leave.key2]}</td>
                    </tr>
                    <tr>
                      <td><b>End Date of leave: </b></td>
                      <td>{leave.end_date.slice(0, -12)}</td>
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
                  </tbody>
                </table>
                <textarea id={"comment-" + leave.id} placeholder="Add Comment" style={{ "width": "250px" }}></textarea>
              </div>
              <div className="modal-footer">
                {(leave.status == "Pending" || (user.level == "dean" && leave.status == "Approved By Hod")) ? (
                  <>
                    <button type="button" className="btn btn-outline-success" onClick={() => { approveLeave(leave.id) }}>Approve</button>
                    <button type="button" className="btn btn-outline-danger" onClick={() => { disapproveLeave(leave.id) }}>Disapprove</button>
                  </>
                ) : (leave.status)
                }
                <button type="button" className="btn btn-outline-primary" onClick={() => { addComment(leave.id) }}>Add Comment</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      ))}

    </div>
  )
}
