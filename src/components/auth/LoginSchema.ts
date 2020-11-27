import { JSONSchema7 } from "json-schema";

export const loginSchema: JSONSchema7 = {
  title: "Login",
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      title: "Email",
    },
    password: {
      type: "string",
      title: "password",
    },
  },
};

export const loginUISchema = {
  email: {
    "ui:autofocus": true,
  },
  password: {
    "ui:widget": "password",
  },
};

export const loginFormData = {};
