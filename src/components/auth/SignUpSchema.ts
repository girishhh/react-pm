import { JSONSchema7 } from "json-schema";

export const signUpSchema: JSONSchema7 = {
  title: "SignUp",
  type: "object",
  required: ["email", "password", "city", "firstName"],
  properties: {
    firstName: {
      type: "string",
      title: "First Name",
    },
    lastName: {
      type: "string",
      title: "Last Name",
    },
    email: {
      type: "string",
      title: "Email",
    },
    password: {
      type: "string",
      title: "Password",
    },
    city: {
      type: "string",
      title: "City",
    },
  },
};

export const signUpUISchema = {
  firstName: {
    "ui:autofocus": true,
  },
};

export const signUpFormData = {};
