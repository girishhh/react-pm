import { JSONSchema7 } from "json-schema";

export const foodCategorySchema: JSONSchema7 = {
  title: "FoodCategory Details",
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string",
      title: "Name",
    },
  },
};

export const foodCategoryUISchema = {
  name: {
    "ui:autofocus": true,
  },
};
