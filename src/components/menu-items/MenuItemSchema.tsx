import { JSONSchema7 } from "json-schema";

export const menuItemSchema: JSONSchema7 = {
  title: "Create Menu Item",
  type: "object",
  required: ["name", "categories"],
  properties: {
    name: {
      type: "string",
      title: "Name",
    },
    categories: {
      type: "array",
      title: "Food Categories",
    },
  },
};

export const menuItemUISchema = {
  name: {
    "ui:autofocus": true,
  },
  type: { "ui:widget": "radio" },
  categories: {
    "ui:field": "foodCatAuto",
  },
};
