
import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import { Card, CardGroup } from 'react-bootstrap';
import httpClient from "../httpClient";
import background from "../imgs/background.jpg";
import '../css/Dashboard.css';
// import Container from 'react-bootstrap/Container';
// import 'bootstrap/dist/css/bootstrap.min.css'

export default function Dashboard() {
  const [user_data, setCurrentTime] = useState({
    email: "",
    name: "jaglike",
    level: "faculty",
    department: "cse",
    total_leaves: 0,
    av_leaves: 0,
  });

  useEffect(() => {
    (async () => {
      try{
      const resp = await httpClient.get("//localhost:5000/dashboard");
      console.log("Dashboard", resp);
      setCurrentTime(resp.data);}
      catch{
        window.location.href="/login"
      }
    })()
  }, []);

  return (
    <div className="Dashboard" style={{ height: "100vh", backgroundImage: `url(${background})`, backgroundPosition: "fixed", backgroundRepeat: "None", backgroundSize: "cover" }}>
      {/* <header className="jumbotron text-center"> */}
      <h2>Dashboard</h2>
      {/* <p>The current time is {user_data.av_leaves} </p>  */}
      {/* </header> */}
      <div className="container row" style={{ margin: "auto" }}>
        <div className="col-md-6" style={{ padding: '40px' }}>
          <div className="card" style={{border: "2px solid black"}}>
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img src={user_data.imageURL} alt="Admin" className="rounded-circle" width="150" />
                <div className="mt-3">
                  <h4>{user_data.name.toUpperCase()}</h4>
                  <p className="mb-1">{user_data.level.toUpperCase()}</p>
                  <p className="mb-1">{user_data.department.toUpperCase()}</p>
                  <p className="mb-1">{user_data.email}</p>
                  <a href="leaveForm" style={{margin: "10px"}}>
                    <button type="button" className="btn btn-primary btn-block">Apply Leave</button>
                  </a>
                  <a href="displayLeaves">
                    <button type="button" className="btn btn-primary btn-block">See Leaves</button>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="col-md-6">
          <div className="row" style={{ padding: '40px' }}>

            {/* style={{ width: '10rem',margin:'2rem' } */}
            <div className="wrapper col-md-6 " style={{ padding: "20px" }}>
              <div className="card text-white bg-primary mb-3 "   >
                <div className="card-header">Total Leaves</div>
                <div className="card-body text-dark bg-light">
                  <h5 className="card-title">{user_data.total_leaves}</h5>

                </div>
              </div>
            </div>

            <div className="wrapper col-md-6 " style={{ padding: "20px" }}>
              <div className="card text-white bg-primary mb-3 "  >
                <div className="card-header">Leaves Taken</div>
                <div className="card-body text-dark bg-light">
                  <h5 className="card-title">{user_data.total_leaves - user_data.av_leaves}</h5>
                </div>
              </div>
            </div>

            <div className="wrapper col-md-6 " style={{ padding: "20px" }}>
              <div className="card text-white bg-primary mb-3 "   >
                <div className="card-header">Available Leaves</div>
                <div className="card-body text-dark bg-light">
                  <h5 className="card-title">{user_data.av_leaves}</h5>
                </div>
              </div>
            </div>

            <div className="wrapper col-md-6 " style={{ padding: "20px" }}>
              <div className="card text-white bg-primary mb-3 "   >
                <div className="card-header">Borrowed Leaves</div>
                <div className="card-body text-dark bg-light">
                  <h5 className="card-title">2</h5>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>


        </div>
      </div>
    </div>
  );
}

