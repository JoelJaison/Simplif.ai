import interact from "interactjs";
import menu from "../../assets/menu.png";
import "./Canvas.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import Block from "./Block.js";
import { Draggable } from "drag-react";
import React, { useState } from "react";

const Canvas = (props) => {
  const [show, setShow] = useState(false);
  const [components, setComponents] = useState([]);
  const [dragState, setDragState] = useState({});
  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drop(ev) {
    ev.preventDefault();
    if (dragState !== {}) {
      let newBlock = <Block dragState={dragState} y={ev.pageY} x={ev.pageX} />;
      setDragState({});
      setComponents((prev) => {
        return [...prev, newBlock];
      });
    }
  }
  return (
    <>
      <ComponentBar show={show} setShow={setShow} setDragState={setDragState} />
      <div className="canvas-wrapper">
        <div className="canvas-header">
          <img src={menu} className="menu" onClick={() => setShow(true)} />
          <h1>Main canvas</h1>
        </div>
        <div onDragOver={allowDrop} onDrop={drop} className="components">
          {components.map((component) => {
            return <Draggable style={{zIndex: 0}}>{component}</Draggable>;
          })}
        </div>
      </div>
    </>
  );
};

const ComponentBar = ({ show, setShow, setDragState }) => {
  const components = [
    {
      name: "Fully Connected Layer",
      color: "orange",
    },
    {
      name: "Convolutional Layer",
      color: "yellow",
    },
    {
      name: "Input Layer",
      color: "lightblue",
    },
    {
      name: "Output Layer",
      color: "green",
    },
  ];

  return (
    <Offcanvas show={show} onHide={() => setShow(false)} placement="top">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>ML Components</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body onDragLeave={() => setShow(false)}>
        <div className="component-list">
          {components.map((component, idx) => {
            return (
              <div
                className="color-box"
                style={{ backgroundColor: component.color }}
                id={`component${idx}`}
                onDragStart={(e) => setDragState(component)}
                draggable={true}
              >
                {component.name}
              </div>
            );
          })}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Canvas;
