import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import ApiError from "./ApiErrors";
import "./CommonModal.scss";

interface Props {
  title: string;
  body: string;
  confirmText: string;
  onConfirm(): void;
  hideDialog(): void;
  show: boolean;
  loading: boolean;
  errors: string[];
}

class CommonModal extends React.Component<Props> {
  render() {
    const {
      title,
      body,
      confirmText,
      onConfirm,
      hideDialog,
      show,
      loading,
      errors,
    } = this.props;
    return (
      <>
        <Modal show={show} onHide={hideDialog}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {Array.isArray(errors) && errors.length > 0 && (
              <ApiError errors={errors} />
            )}
            {loading && (
              <div className="w-100 d-flex justify-content-center">
                <Spinner animation="border" />
              </div>
            )}
            <div className="w-100">{body}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={onConfirm}>
              {confirmText}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default CommonModal;
