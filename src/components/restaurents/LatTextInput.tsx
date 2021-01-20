import { FieldProps } from "@rjsf/core";
import React, { ReactElement } from "react";
import { Form } from "react-bootstrap";

const LatTextInput: React.FC<FieldProps> = (
  props: FieldProps
): ReactElement => {
  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Latitude*</Form.Label>
          <Form.Control type="text" value={props.formData} disabled />
        </Form.Group>
      </Form>
    </>
  );
};

export default LatTextInput;
