import React from "react";
import GooglePlacesAutoComplete from "../common/GooglePlacesAutoComplete";

const RenderGooglePlaces: React.FC = (props: any) => {
  console.log("PROPSSSSSSSSSSSS", props);
  return (
    <GooglePlacesAutoComplete
      //@ts-ignore
      isMarkerShown
      //@ts-ignore
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyC0P3If-HPI1CyqDwrjqqQMJypGLRjfwlY&libraries=geometry,drawing,places"
      //@ts-ignore
      loadingElement={<div style={{ height: `100%` }} />}
      //@ts-ignore
      containerElement={<div style={{ height: `600px` }} />}
      //@ts-ignore
      mapElement={<div style={{ height: `70%`, display: "none" }} />}
      //@ts-ignore
      onChange={props.onChange}
    />
  );
};

export default RenderGooglePlaces;
