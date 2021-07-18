import { FieldProps } from "@rjsf/core";
import React, { ReactElement } from "react";
import GooglePlacesAutoComplete from "../common/GooglePlacesAutoComplete";

const RenderGooglePlaces: React.FC<FieldProps> = (
  props: FieldProps
): ReactElement => {
  return (
    <GooglePlacesAutoComplete
      isMarkerShown
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.GOOGLE_PLACES_SECRET_KEY}&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div />}
      mapElement={<div style={{ height: `70%`, display: "none" }} />}
      {...props}
    />
  );
};

export default RenderGooglePlaces;
