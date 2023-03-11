import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function LayerConfig({ show, setShow, name }) {
  const [file, setFile] = useState(null);
  const handleClose = () => setShow(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target)
    if (file != null) {
      const data = new FormData();
      data.append("file", file);
      let response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: data,
      });
    }
  };
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
              <Form.Control type="file" onChange={e => setFile(e.target.files[0])} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Label Column Name</Form.Label>
              <Form.Control type="input" placeholder="Enter Label" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Upload Data
            </Button>
          </>
        );
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>{getFormContents(name)}</Form>
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
