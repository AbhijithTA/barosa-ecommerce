import {
  validateEmail,
  validateMobile,
  validateName,
  validatePassword,
} from "./validate.js";

const validators = {
  name: validateName,
  email: validateEmail,
  password: validatePassword,
  phone: validateMobile,
};

export async function validateInputs(inputs) {
  const errors = {};

  for (const [value, type, field] of inputs) {
    if (validators[type]) {
      const result = await validators[type](value);
      if (result.error) {
        errors[field] = result.error;
      }
    }
  }
  return errors;
}
