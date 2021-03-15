import { JSONSchema7 } from "json-schema";

export const menuSchema: JSONSchema7 = {
  title: "Create Menu",
  type: "object",
  required: ["name", "menuItems"],
  properties: {
    name: {
      type: "string",
      title: "Name",
    },
    menuItems: {
      type: "array",
      title: "Menu Items",
    },
  },
};

export const menuUISchema = {
  name: {
    "ui:autofocus": true,
  },
  menuItems: {
    "ui:field": "menuItemAuto",
  },
};
