import { FormValidation } from "@rjsf/core";
import { JSONSchema7 } from "json-schema";
import { CreatePasswordForm } from "../../interfaces/ActivateAccountInterface";

export function validatePassword(
  formData: CreatePasswordForm,
  errors: FormValidation
) {
  if (formData.password !== formData.confirmPassword)
    errors.confirmPassword.addError("Passwords don't match");
  return errors;
}

export const passwordSchema: JSONSchema7 = {
  title: "Create Password",
  type: "object",
  required: ["password", "confirmPassword"],
  properties: {
    password: {
      type: "string",
      title: "Password",
    },
    confirmPassword: {
      type: "string",
      title: "Confirm Password",
    },
  },
};

export const passwordUISchema = {
  password: {
    "ui:autofocus": true,
    "ui:widget": "password",
  },
  confirmPassword: {
    "ui:widget": "password",
  },
};

export const passwordFormData = {};
