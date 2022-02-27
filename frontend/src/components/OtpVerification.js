import React from 'react';
import httpClient from "../httpClient";

export default function LoginForm() {
  const otpVerify = async (e) => {
    try {
      e.preventDefault()
      const otp = document.getElementById("Password").value
      const resp = await httpClient.post("//localhost:5000/validate_otp", {otp});
      // console.log("HHHHHHH", resp);
      window.location.href="dashboard";
    } catch (error) {
      if (error.response.status === 400) {
        alert("Invalid OTP!");
      }
    }
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card my-4">
            <form className="card-body cardbody-color px-5 " method="POST">
              <h2 className="text-center text-dark mt-5">OTP Verification</h2>
              <div className="text-center">
                <img src={require("../imgs/loginIcon.png")}
                  className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3" width="200px"
                  alt="profile" />
              </div>

              <div className="mb-3">
                <input type="password" className="form-control" name="email" id="Password" aria-describedby="emailHelp"
                  placeholder="Enter OTP" />
              </div>
              <div className="text-center"><button onClick={otpVerify}
                className="btn btn-primary px-5 mb-5 w-100">OTP Verification</button></div>
              <div id="emailHelp" className="form-text text-center mb-5 text-dark">Not
                Registered? <a href="register" className="text-dark fw-bold"> Create an
                  Account</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
