import { JSONSchema7 } from "json-schema";

export const foodItemSchema: JSONSchema7 = {
  title: "Create Food Item",
  type: "object",
  required: ["name", "type", "categories"],
  properties: {
    name: {
      type: "string",
      title: "Name",
    },
    type: {
      type: "boolean",
      title: "Type",
      oneOf: [
        {
          title: "Veg",
          const: true,
        },
        {
          title: "NonVeg",
          const: false,
        },
      ],
    },
    categories: {
      type: "array",
      title: "Food Categories",
    },
  },
};

export const foodItemUISchema = {
  name: {
    "ui:autofocus": true,
  },
  type: { "ui:widget": "radio" },
  categories: {
    "ui:field": "foodCatAuto",
  },
};
