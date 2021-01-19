import { JSONSchema7 } from "json-schema";

export const userSchema: JSONSchema7 = {
  title: "Create User",
  type: "object",
  required: ["email", "city", "firstName"],
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
    city: {
      type: "string",
      title: "City",
    },
  },
};

export const selectExistingOwnerSchema: JSONSchema7 = {
  title: "Enter email ",
  required: ["existingOwner"],
  properties: {
    existingOwner: {
      type: "string",
      title: "Select Existing Owner",
    },
  },
};

export const selectExistingOwnerUISchema = {
  existingOwner: {
    "ui:autofocus": true,
    "ui:field": "userAutoComplete",
  },
};

export const userUISchema = {
  firstName: {
    "ui:autofocus": true,
  },
};
