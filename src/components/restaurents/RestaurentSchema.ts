import { JSONSchema7 } from "json-schema";

export const restaurentSchema: JSONSchema7 = {
  title: "Restaurent Details",
  type: "object",
  required: ["name", "lat", "lng", "geo_location_description"],
  properties: {
    name: {
      type: "string",
      title: "Name",
    },
    lat: {
      type: "number",
      title: "Latitude",
    },
    lng: {
      type: "number",
      title: "Longitude",
    },
    geo_location_description: {
      type: "string",
      title: "Ge Location",
    },
    google_auto_place: {
      type: "object",
      title: "Select Place",
    },
  },
};

export const restaurentUISchema = {
  name: {
    "ui:autofocus": true,
  },
  geo_location_description: {
    classNames: "task-title foo-bar",
  },
  google_auto_place: {
    "ui:field": "geo",
  },
};
