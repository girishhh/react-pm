import { JSONSchema7 } from "json-schema";

export const companySchema: JSONSchema7 = {
  title: "Company Details",
  type: "object",
  required: ["city", "subdomain", "timeZone", "paymentCharges"],
  properties: {
    name: {
      type: "string",
      title: "Name",
    },
    city: {
      type: "string",
      title: "City",
    },
    subdomain: {
      type: "string",
      title: "Subdomain",
    },
    timeZone: {
      type: "string",
      title: "Timezone",
    },
    paymentCharges: {
      type: "object",
      required: ["gst"],
      properties: { gst: { type: "number", title: "GST" } },
    },
  },
};

export const companyUISchema = {
  name: {
    "ui:autofocus": true,
  },
  city: {},
  subdomain: {},
  timeZone: {},
};
