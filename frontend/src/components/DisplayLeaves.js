
import React from 'react'
import { useState, useEffect  } from 'react'
import httpClient from "../httpClient";
import '../css/DisplayLeaves.css';

export default function DisplayLeaves() {
    
    const [leaves, setLeaves] = useState([]);
    const fetchLeaves = async (e) => {
        try {
          const user_id = "1";
          const resp = await httpClient.post("//localhost:5000/fetchLeaves", {user_id});
          console.log("HHHHHHHHH", resp["data"]['result']);
          setLeaves(resp["data"]['result'])
          
        //   window.location.href = '/otpVerification';
        } catch (error) {
          if (error.response.status === 400) {
            alert("Error occured");
          }
        }
    }
    useEffect(() => {
        
        fetchLeaves();
    },[]);
    
    return (
        <div>
            <h2>Applied Leaves</h2>
            <div className='leaves_container'>
                <ul className="list-group">
                    {leaves.map((leave) => (
                        <li className="list-group-item list-group-item-primary" style={{margin:"0px",padding:"0px",borderColor:"blue"}}>

                            <div className="accordion" id="accordionExample" >
                                <div className="card">

                                    <div className="card-header" id="headingOne" style={{borderColor:"blue"}}>
                                            <div data-toggle="collapse" aria-expanded="true" data-target={"#collapseOne"+leave.id}  aria-controls={"#collapseOne"+leave.id} >
                                                <div id="leftbox">
                                                    {leave.nature}
                                                </div>
                                                <div id="middlebox" >
                                                    {leave.request_date}
                                                </div>
                                                <div id="rightbox">
                                                    {leave.status}
                                                </div>
                                            </div>
                                    </div>
                                    <div id={"collapseOne"+leave.id} className="collapse" aria-labelledby="headingOne">
                                        <div className="card-body">
                                            <p>Nature of leave : {leave.nature}</p>
                                            <p>Purpose of leave : {leave.purpose}</p>
                                            <p>Start Date of leave : {leave.start_date}</p>
                                            <p>End Date of leave : {leave.end_date}</p>
                                            <p>Duration of leave : {leave.duration}</p>
                                            <p>Request Date of leave : {leave.request_date}</p>
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
