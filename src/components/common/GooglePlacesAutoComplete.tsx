import { FieldProps } from "@rjsf/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { withGoogleMap, withScriptjs } from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";

interface ReferenceType {
  searchBox?: StandaloneSearchBox;
}

interface Props extends FieldProps {
  isMarkerShown: boolean;
  googleMapURL: string;
  loadingElement: JSX.Element;
  containerElement: JSX.Element;
  mapElement: JSX.Element;
}

const GooglePlacesAutoComplete = withScriptjs(
  withGoogleMap((props: Props) => {
    const refs: ReferenceType = {};
    const onSearchBoxMounted = (ref: StandaloneSearchBox) => {
      refs.searchBox = ref;
    };
    const formData = props.formData ? JSON.parse(props.formData) : {};
    const [placeName, setPlaceName] = useState(formData.formatted_address);

    useEffect(() => {
      if (formData.formatted_address) setPlaceName(formData.formatted_address);
    }, [formData.formatted_address]);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.value) {
        props.onChange(undefined);
      }
      setPlaceName(event.target.value);
    };

    const onPlacesChanged = () => {
      const places = refs.searchBox?.getPlaces();
      const {
        formatted_address,
        geometry: { location },
      } = places?.[0];
      props.onChange(
        JSON.stringify({
          formatted_address,
          lat: location.lat(),
          lng: location.lng(),
        })
      );
    };

    return (
      <>
        <StandaloneSearchBox
          ref={onSearchBoxMounted}
          bounds={props.bounds}
          onPlacesChanged={onPlacesChanged}
        >
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Search Nearby Place*</Form.Label>
              <Form.Control onChange={onChange} type="text" value={placeName} />
            </Form.Group>
          </Form>
        </StandaloneSearchBox>
      </>
    );
  })
);

export default GooglePlacesAutoComplete;
