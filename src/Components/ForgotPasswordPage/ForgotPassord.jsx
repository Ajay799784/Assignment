import React from "react";

function ForgotPassord() {
  const handleReset = ({ setData, setForgot }) => {
    window.alert("password has been successfully sent");
    // setData(true);
    // setForgot(false);
  };
  return (
    <div className="container d-flex justify-content-center">
      <div className="row">
        <div className="col-12">
          <div className="card max-w-md mx-auto mt-20 p-4">
            <div className="card-title">
              <h3 className="fw-bold text-center">Forgot Password</h3>
            </div>
            <div className="card-body">
              <p>Enter your email to reset your password</p>
              <input type="email" id="email" className="w-full p-2 mb-4" />
              <button className="w-full p-2 mb-4" onClick={handleReset}>
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassord;
