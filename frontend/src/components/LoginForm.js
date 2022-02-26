import React from 'react';
import httpClient from "../httpClient";
import GoogleLogin from 'react-google-login';

export default function LoginForm() {
  const responseGoogle = async (res) => {
    try {
      console.log(res);
      console.log(res.profileObj);
      const user_info = res.profileObj
      const resp = await httpClient.post("//localhost:5000/login_oauth", { user_info });
      console.log("HHHH", resp);
    } catch (error) {
      if (error.response.status === 400) {
        alert("Invalid credentials");
      }
    }
  }
  const otpLogin = async (e) => {
    try {
      e.preventDefault()
      const email = document.getElementById("Username").value;
      const resp = await httpClient.post("//localhost:5000/login_otp", {email});
      console.log("HHHHHHHHH", resp);
      window.location.href = '/otpVerification';
    } catch (error) {
      if (error.response.status === 400) {
        alert("Invalid credentials");
      }
    }
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card my-4">
            <form className="card-body cardbody-color px-5 " method="POST">
              <h2 className="text-center text-dark mt-5">Login</h2>
              <div className="text-center">
                <img src={require("../imgs/loginIcon.png")}
                  className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3" width="200px"
                  alt="profile" />
              </div>

              <div className="mb-3">
                <input type="text" className="form-control" name="email" id="Username" aria-describedby="emailHelp"
                  placeholder="Email Id" />
              </div>
              <div className="text-center"><button onClick={otpLogin}
                className="btn btn-primary px-5 mb-5 w-100">Login</button></div>
              <div id="emailHelp" className="form-text text-center mb-5 text-dark">Not
                Registered? <a href="register" className="text-dark fw-bold"> Create an
                  Account</a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <GoogleLogin clientId="1055217702575-fejsv10ueq0tt48aatj1ln1p35nogder.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}
