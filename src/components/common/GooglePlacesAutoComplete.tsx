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

    const [placeName, setPlaceName] = useState(
      props.formData.formatted_address
    );

    useEffect(() => {
      if (props.formData.formatted_address)
        setPlaceName(props.formData.formatted_address);
    }, [props.formData.formatted_address]);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.value) {
        props.onChange({
          formatted_address: undefined,
          lat: undefined,
          lng: undefined,
        });
      }
      setPlaceName(event.target.value);
    };

    const onPlacesChanged = () => {
      const places = refs.searchBox?.getPlaces();
      const {
        formatted_address,
        geometry: { location },
      } = places?.[0];
      props.onChange({
        formatted_address,
        lat: location.lat(),
        lng: location.lng(),
      });
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
              {props.formContext.geo_location_required_error && (
                <div>
                  <ul className="error-detail bs-callout bs-callout-info">
                    <li className="text-danger">is a required property</li>
                  </ul>
                </div>
              )}
            </Form.Group>
          </Form>
        </StandaloneSearchBox>
      </>
    );
  })
);

export default GooglePlacesAutoComplete;
