import React, { useState } from "react";
import ForgotPassord from "../ForgotPasswordPage/ForgotPassord";
import axios from "axios";
import MultiFormPage from "../MultiForm/MultiFormPage";
import PasswordRegrex from "./PasswordRegrex";
import EmailRegrex from "./EmailRegrex";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [forgot, setForgot] = useState(false);
  const [data, setData] = useState(true);
  const [multi, setMulti] = useState(false);
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const handleLogin = async () => {
    if (PasswordRegrex(password)) {
      setUpdatePassword("");
    } else {
      setUpdatePassword("Password length not matched");
    }
    if (EmailRegrex(email)) {
      setUpdateEmail("");
    } else {
      setUpdateEmail("It is not a valid email");
    }
    try {
      const response = await fetch("https://your-xano-api.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      // console.log(data);
      if (data.success) {
        setLoginMessage("Login successful!");
        // Redirect to Form Page
        setMulti(true);
        setData(false);
      } else {
        setLoginMessage("Invalid email or password");
      }
    } catch (error) {
      setLoginMessage("Error occurred during login");
    }
  };
  function handleForgotMessage() {
    setForgot(true);
    setData(false);
  }
  return (
    <div className="container d-flex justify-content-center">
      {data && (
        <div className="row">
          <div className="col-12">
            <div className="card max-w-md mx-auto mt-20 p-4">
              <div className="card-title">
                <h3 className="fw-bold text-center">Login Page</h3>
              </div>
              <div className="card-body">
                <div>
                  <label className="col-sm-4 col-form-label ">Email</label>

                  <input
                    type="email"
                    placeholder="enter email"
                    className="form form-control"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="text-danger">{updateEmail}</div>
                </div>
                <div>
                  <label className="col-sm-4 col-form-label">Password</label>

                  <input
                    type="password"
                    placeholder="enter password"
                    className="form form-control"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="text-danger">{updatePassword}</div>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-warning mt-3"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  <button
                    className="btn btn-danger ms-3 mt-3"
                    onClick={handleForgotMessage}
                  >
                    Forgot
                  </button>
                </div>
                {loginMessage && <p className="text-red-500">{loginMessage}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
      {forgot && <ForgotPassord setData={setData} setForgot={setForgot} />}
      {multi && <MultiFormPage />}
    </div>
  );
}

export default Login;
