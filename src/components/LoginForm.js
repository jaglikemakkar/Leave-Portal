import React from 'react'
import httpClient from "../httpClient";

export default function LoginForm() {
  const logInUser = async () => {
    try {
      // const resp = await httpClient.post("//localhost:5000/login", {
      //   email,
      //   password,
      // });
      // const resp = await httpClient.post("")
      const resp = await httpClient.post("//localhost:5000/login");
      console.log("HHHHHHHHHHHHH", resp)
      // window.location.href = "http://localhost:5000/login";
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }
    }
  }
  return (
    <div className="jumbotron text-center">
      <h1>Login Form</h1>
      <button type="button" onClick={() => logInUser()}>
        Submit
      </button>
    </div>
  )
}
