
import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import { Card, CardGroup } from 'react-bootstrap';
import httpClient from "../httpClient";
import background from "../imgs/background2.webp";
import '../css/Dashboard.css';
// import Container from 'react-bootstrap/Container';
// import 'bootstrap/dist/css/bootstrap.min.css'

export default function Dashboard( {user} ) {

  const [user_data, set_user_data] = useState({
    imageURL: user.imageURL,
    name: user.firstName,
    email: user.email,
    level: "faculty",
    department: "cse",
    total_leaves: 0,
    av_leaves: 0,
  });


  useEffect(() => {
    (async () => {
      try{
      const resp = await httpClient.get("//localhost:5000/dashboard");
      set_user_data(resp.data);}
      catch{
        window.location.href="/login"
      }
    })()
  }, []);

  return (
    <div className="dashboard" style={{ height: "100vh", backgroundImage: `url(${background})`, backgroundPosition: "fixed", backgroundRepeat: "None", backgroundSize: "cover" }}>
    {/* <div className="Dashboard"> */}
      {/* <header className="jumbotron text-center"> */}
      <h2 className="heading">Dashboard</h2>
      <div className="heading-line"></div>
      {/* <p>The current time is {user_data.av_leaves} </p>  */}
      {/* </header> */}
      {/* <div className="container row" style={{ margin: "auto" }}>
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
          </div>


        </div>
      </div> */}


      <div className="container">
    <div className="main-body">
    
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card" style={{"border": "2px solid grey"}}>
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                  {(user.imageURL == "" || user.imageURL==undefined) ? (<img src={require("../imgs/loginIcon.png")} alt="Admin" className="rounded-circle" width="150" />)
                  : (<img src={user.imageURL} alt="Admin" className="rounded-circle" width="150" />)}
                    
                    {/* <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" /> */}
                    <div className="mt-3">
                      <h4>{user_data.name.toUpperCase()}</h4>
                      <p className="text-secondary mb-1">{user_data.level.toUpperCase()}</p>
                      <p className="text-secondary mb-1">{user_data.department.toUpperCase()}</p>
                      <p className="text-muted font-size-sm">{user_data.email}</p>
                      {/* <button className="btn btn-primary">Follow</button> */}
                      <a href="leaveForm" style={{margin: "10px"}}>
                      <button className="btn btn-outline-primary">Apply Leave</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="card mt-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                    <span className="text-secondary">https://bootdey.com</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                    <span className="text-secondary">bootdey</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                    <span className="text-secondary">@bootdey</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                    <span className="text-secondary">bootdey</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                    <span className="text-secondary">bootdey</span>
                  </li>
                </ul>
              </div> */}
            </div>
            <div className="col-md-8">
              <div className="card mb-3" style={{"border": "2px solid grey"}}>
                <div className="card-body" >
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Total Leaves</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user_data.total_leaves}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Leaves Taken</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user_data.total_leaves - user_data.av_leaves}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Available Leaves</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user_data.av_leaves}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Borrowed Leaves</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      0
                    </div>
                  </div>
                  <hr />
                  {/* <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      Bay Area, San Francisco, CA
                    </div>
                  </div> */}
                  {/* <hr /> */}
                  <div className="row">
                    <div className="col-sm-12" >
                    {(user_data.level == "faculty" || user_data.level==undefined || user_data.level == "") ? (
                      <a className="btn btn-info " style={{"margin": "2px"}} href="displayLeaves">Applied Leaves</a>
                      ):(
                        <div>
                        <a className="btn btn-info " style={{"margin": "2px"}} href="displayLeaves">Applied Leaves</a>
                      <a className="btn btn-info " style={{"margin": "2px"}} href="checkLeaves">Check Leaves</a>
                      </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="row gutters-sm">
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>
                      <small>Web Design</small>
                      <div className="progress mb-3" style={{"height": "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{"width": "80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Website Markup</small>
                      <div className="progress mb-3" style={{"height": "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{"width": "72%"}} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>One Page</small>
                      <div className="progress mb-3" style={{"height": "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{"width": "89%"}} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Mobile Template</small>
                      <div className="progress mb-3" style={{"height": "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{"width": "55%"}} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Backend API</small>
                      <div className="progress mb-3" style={{"height": "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{"width": "66%"}} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>
                      <small>Web Design</small>
                      <div className="progress mb-3" style={{"height": "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{"width": "80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Website Markup</small>
                      <div className="progress mb-3" style={{"height": "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{"width": "72%"}} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>One Page</small>
                      <div className="progress mb-3" style={{"height": "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{"width": "89%"}} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Mobile Template</small>
                      <div className="progress mb-3" style={{"height": "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{"width": "55%"}} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Backend API</small>
                      <div className="progress mb-3" style={{"height": "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{"width": "66%"}} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}



            </div>
          </div>

        </div>
    </div>

    </div>
  );
}

