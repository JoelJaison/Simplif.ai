import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function LayerConfig({ show, setShow, name, setLayerInfo, id}) {
  const [file, setFile] = useState(null);
  const [dimIn, setDimIn] = useState(0);
  const [dimOut, setDimOut] = useState(0);
  const [label, setLabel] = useState("");
  const setFCInfo = (e) => {
    setLayerInfo(prev => {
      let tmp = {...prev}
      tmp[id] = {
        name: name,
        dimIn: dimIn,
        dimOut: dimOut,
      }
      return tmp;
    })
  }
  const setInputInfo = e => {
    setLayerInfo(prev => {
      let tmp = {...prev}
      tmp[id] = {
        name: name,
        label: label
      }
      return tmp;
    })
  } 
  const handleClose = () => setShow(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputInfo();
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
              <Form.Control type="input" placeholder="Enter Size" onChange={e => setDimIn(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Output Size</Form.Label>
              <Form.Control type="input" placeholder="Enter Size" onChange={e => setDimOut(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={setFCInfo}>
              Save Changes
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
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
              <Form.Control type="input" placeholder="Enter Label" onChange={e => setLabel(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleClose}>
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
        </Modal.Footer>
      </Modal>
    </>
  );
}
