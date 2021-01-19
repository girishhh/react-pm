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
      type: "object",
      title: "Ge Location",
      required: ["formatted_address"],
    },
  },
};

export const restaurentUISchema = {
  name: {
    "ui:autofocus": true,
  },
  geo_location_description: {
    "ui:field": "geo",
  },
  lat: {
    "ui:field": "kar",
  },
  lng: {
    "ui:readonly": true,
  },
};
