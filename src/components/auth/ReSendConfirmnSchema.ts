import { JSONSchema7 } from "json-schema";

export const reSendConfirmnSchema: JSONSchema7 = {
  title: "Re Send Confirmation Instructions",
  type: "object",
  required: ["email"],
  properties: {
    email: {
      type: "string",
      title: "Email",
    },
  },
};

export const reSendConfirmnUISchema = {
  email: {
    "ui:autofocus": true,
  },
};

export const reSendConfirmnFormData = {};
