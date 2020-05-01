const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Strange declaration style...
  // Convert empty fields to empty strings
  functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

  // Check email validity
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field empty";
  } else if (Validator.isEmail(data.email)) {
    errors.email = "Email invalid";
  }

  // Check password
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};