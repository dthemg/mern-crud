const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // This declaration style seems very strange to me???
  // Convert any empty fields to empty strings
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : "";

  // Check name validity
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field empty";
  }

  // Check email validity
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is empty";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email invalid";
  }

  // Check password
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is empty";
  }

  // Check password confirmation
  if (Validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = "Password confirmation empty";
  }

  console.log(data.password);
  console.log(data.passwordConfirm);

  // Check password length
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 charaters";
  }

  if (!Validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = "Confirmation password must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
