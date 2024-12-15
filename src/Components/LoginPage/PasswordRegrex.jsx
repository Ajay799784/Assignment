import React from "react";

function PasswordRegrex(password) {
  var validatePassword = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20})+$/;
  return validatePassword.test(password);
}

export default PasswordRegrex;
