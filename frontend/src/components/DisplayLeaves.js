import { Button, Dropdown } from 'react-bootstrap';
import React from 'react'
import { useState, useEffect } from 'react'
import httpClient from "../httpClient";
import '../css/DisplayLeaves.css';

export default function DisplayLeaves() {

    const [leaves, setLeaves] = useState([]);
    const [showLeaves, setShowLeaves] = useState([])
    const [sortedByNature,setSortedByNature] = useState(0);
    const [sortedByDate,setSortedByDate] = useState(0);
    const [sortedByStatus,setSortedByStatus] = useState(0);
    const fetchLeaves = async (e) => {
        try {
            const user_id = "1";
            const resp = await httpClient.post("//localhost:5000/fetchLeaves", { user_id });
            setLeaves(resp["data"]['result'])
            setShowLeaves(resp["data"]['result'])
            //   window.location.href = '/otpVerification';
        } catch (error) {
            if (error.response.status === 400) {
                alert("Error occured");
            }
        }
    }
    useEffect(() => {

        fetchLeaves();
    }, []);
    const styles = {
        border: '1px solid black',
        color: 'white',
        backgroundColor: 'black'
    };

    function compareNature( a, b ) {
        if (sortedByNature==1){
            setSortedByNature(0)
            if ( a.nature > b.nature ){
              return -1;
            }
            if ( a.nature < b.nature ){
              return 1;
            }
            return 0;
        }
        else{
            setSortedByNature(1)
            if ( a.nature < b.nature ){
                return -1;
              }
              if ( a.nature > b.nature ){
                return 1;
              }
              return 0;
          }
      }

    const SortByType = () => {
        const obj = {'id': 1, 'department': 'cse', 'user_id': 1, 'nature': 'ML', 'purpose': 'This is the purpose', 'is_station': 'Yes', 'request_date': "Sun, 27 Feb 2022 00:00:00 GMT", 'start_date': "Sun, 27 Feb 2022 00:00:00 GMT", 'end_date': "Sun, 27 Feb 2022 00:00:00 GMT", 'duration': "None", 'status': 2, 'level': 'Pending'}
        const leavesArr = [...leaves,obj]
        leavesArr.sort( compareNature )
        setShowLeaves(leavesArr)
        setLeaves(leavesArr)
    }







    function compareDate( a, b ) {
        if (sortedByDate==1){
            setSortedByDate(0)
            if ( a.request_date > b.request_date ){
              return -1;
            }
            if ( a.request_date < b.request_date ){
              return 1;
            }
            return 0;
        }
        else{
            setSortedByDate(1)
            if ( a.request_date < b.request_date ){
                return -1;
              }
              if ( a.request_date > b.request_date ){
                return 1;
              }
              return 0;
          }
      }

    const SortByDate = () => {
        const obj = {'id': 1, 'department': 'cse', 'user_id': 1, 'nature': 'ML', 'purpose': 'This is the purpose', 'is_station': 'Yes', 'request_date': "Mon, 28 Feb 2026 00:00:00 GMT", 'start_date': "Sun, 27 Feb 2022 00:00:00 GMT", 'end_date': "Sun, 27 Feb 2022 00:00:00 GMT", 'duration': "None", 'status': 2, 'level': 'Pending'}
        const leavesArr = [...leaves,obj]
        leavesArr.sort( compareDate )
        setShowLeaves(leavesArr)
        setLeaves(leavesArr)
    }
    





    function compareStatus( a, b ) {
        if (sortedByStatus==1){
            setSortedByStatus(0)
            if ( a.status > b.status ){
              return -1;
            }
            if ( a.status < b.status ){
              return 1;
            }
            return 0;
        }
        else{
            setSortedByStatus(1)
            if ( a.status < b.status ){
                return -1;
              }
              if ( a.status > b.status ){
                return 1;
              }
              return 0;
          }
      }

    const SortByStatus = () => {
        const obj = {'id': 1, 'department': 'cse', 'user_id': 1, 'nature': 'ML', 'purpose': 'This is the purpose', 'is_station': 'Yes', 'request_date': "Mon, 28 Feb 2026 00:00:00 GMT", 'start_date': "Sun, 27 Feb 2022 00:00:00 GMT", 'end_date': "Sun, 27 Feb 2022 00:00:00 GMT", 'duration': "None", 'status': 0, 'level': 'Pending'}
        const leavesArr = [...leaves,obj]
        leavesArr.sort( compareStatus )
        setShowLeaves(leavesArr)
        setLeaves(leavesArr)
    }
    








    return (
        <div>
            <h2>Applied Leaves</h2>
            {/* <div className="cnt_status">
                <div class="row ">
                    <div class="col-sm">Type of leave</div>
                    <div class="col-sm ">Date of Request</div>
                    <div class="col-sm ">Status</div>
                </div>
            </div> */}

            {/* <Button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                Sort
            </Button>
            <ul className='dropdown-menu'>
                fsd
                <li className="sort" data-sort="status"> <a className='dropdown-item' href='#'>sort by status</a> </li>
            </ul> */}

            <div className='leaves_container'>
{/*                 
                <Dropdown>
                    <Dropdown.Toggle variant="danger" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1" data-sort="status">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
                {/* <Button type="submit">Sort</Button> */}
                <ul className="list-group">
                    <div class="row " style={styles} >
                        <div class="col-sm" style={{ margin: "0px", padding: "0px", padding: "10px" }}> <Button className="btn btn-dark" onClick={SortByType}>Type of leave</Button> </div>
                        <div class="col-sm " style={{ margin: "0px", padding: "0px", padding: "10px" }}> <Button className="btn btn-dark" onClick={SortByDate}>Date of Request</Button></div>
                        <div class="col-sm " style={{ margin: "0px", padding: "0px", padding: "10px" }}><Button className="btn btn-dark" onClick={SortByStatus}>Status</Button></div>
                    </div>
                    {showLeaves.map((leave) => (
                        <li className="list-group-item list-group-item-primary" style={{ margin: "0px", padding: "0px", borderColor: "black", width: "100%" }}>
                            <div className="accordion" id="accordionExample" style={{ margin: "0px", width: "100%" }}>
                                <div className="card" style={{ width: "parent", backgroundColor: "inherit" }}>

                                    <div className="card-header" id="headingOne" style={{ borderColor: "black" }}>
                                        <div data-toggle="collapse" aria-expanded="true" data-target={"#collapseOne" + leave.id} aria-controls={"#collapseOne" + leave.id} >
                                            <div className="row">
                                                <div class="col-sm" style={{ borderColor: "black" }}>
                                                    {leave.nature}
                                                </div>
                                                <div class="col-sm" style={{ borderColor: "black" }}>
                                                    {leave.request_date.slice(0, -12)}
                                                </div>
                                                <div class="col-sm" style={{ borderColor: "black" }}>
                                                    {leave.status}
                                                </div>
                                                {/* <div id="leftbox">
                                                {leave.nature}
                                            </div>
                                            <div id="middlebox" >
                                                {leave.request_date}
                                            </div>
                                            <div id="rightbox">
                                                {leave.status}
                                            </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div id={"collapseOne" + leave.id} className="collapse" aria-labelledby="headingOne">
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
