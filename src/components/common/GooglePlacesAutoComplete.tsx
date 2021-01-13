//@ts-nocheck
import React, { useState } from "react";
import { withGoogleMap, withScriptjs } from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";

const GooglePlacesAutoComplete = withScriptjs(
  withGoogleMap((props) => {
    const [places, setPlaces] = useState([]);
    const refs = {};

    const onSearchBoxMounted = (ref) => {
      refs.searchBox = ref;
    };

    const onPlacesChanged = () => {
      const places = refs.searchBox.getPlaces();
      const {
        formatted_address,
        geometry: { location },
      } = places[0];
      props.onChange({
        formatted_address,
        lat: location.lat(),
        lng: location.lng(),
      });
      setPlaces(places);
    };

    return (
      <>
        <StandaloneSearchBox
          ref={onSearchBoxMounted}
          bounds={props.bounds}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Customized your placeholder"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
        </StandaloneSearchBox>
        <ol>
          {places.map(
            ({ place_id, formatted_address, geometry: { location } }) => (
              <li key={place_id}>
                {formatted_address}
                {" at "}({location.lat()}, {location.lng()})
              </li>
            )
          )}
        </ol>
      </>
    );
  })
);

export default GooglePlacesAutoComplete;
