import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function LayerConfig({ show, setShow, name }) {
  const handleClose = () => setShow(false);
  const getFormContents = (name) => {
    switch (name) {
      case "Fully Connected Layer":
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Input Size</Form.Label>
              <Form.Control type="input" placeholder="Enter Size" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Output Size</Form.Label>
              <Form.Control type="input" placeholder="Enter Size" />
            </Form.Group>
          </>
        );
      case "Input Layer":
        return (
          <>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Dataset</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Label Column Name</Form.Label>
              <Form.Control type="input" placeholder="Enter Size" />
            </Form.Group>
          </>
        );
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form>{getFormContents(name)}</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
