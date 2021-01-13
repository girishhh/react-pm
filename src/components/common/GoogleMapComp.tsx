//@ts-nocheck
import React from "react";
import { GoogleMap, Marker } from "react-google-maps";

class GooglaMapComp extends React.Component {
  render() {
    const { onMapMounted, latLong } = this.props;
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: latLong.lat, lng: latLong.lng }}
        ref={onMapMounted}
      >
        <Marker position={{ lat: latLong.lat, lng: latLong.lng }} />
      </GoogleMap>
    );
  }
}

export default GooglaMapComp;
