import menu from "../../assets/menu.png";
import "./Canvas.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import React, { useState, useRef } from "react";
import "../index.css";
import { ArcherContainer, ArcherElement } from "react-archer";
import Draggable from "react-draggable";
import LayerConfig from "./LayerConfig";

const Canvas = (props) => {
  const [show, setShow] = useState(false);
  const [blockCount, setBlockCount] = useState(0);
  const [components, setComponents] = useState([]);
  const [dragState, setDragState] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [selected, setSelected] = useState(false);
  const [relations, setRelations] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currName, setCurrName] = useState("");
  const archerContainer = useRef(null);
  function allowDrop(ev) {
    ev.preventDefault();
  }

  const handleDragEnd = () => {
    archerContainer.current.refreshScreen();
  };

  const clickHandler = (id) => {
    return (e) => {
      if (disabled) {
        if (!selected) {
          setSelected(id);
        } else {
          let newRelations = { ...relations };
          newRelations[selected] = {
            targetId: id,
            targetAnchor: "left",
            sourceAnchor: "right",
          };
          setRelations(newRelations);
          setDisabled(false)
          setSelected(false);
        }
      }
    };
  };
  function drop(ev) {
    ev.preventDefault();
    if (dragState !== {}) {
      setCurrName(dragState.name)
      setShowModal(true);
      let newState = {
        dragState: { ...dragState },
        y: ev.pageY,
        x: ev.pageX,
        id: String(blockCount),
      };
      let newRelations = {...relations};
      newRelations[blockCount] = {};
      setRelations(newRelations);
      setDragState({});
      setBlockCount((blockCount) => blockCount + 1);
      setComponents((prev) => {
        return [...prev, newState];
      });
    }
  }

  return (
    <>
      <ComponentBar show={show} setShow={setShow} setDragState={setDragState} />
      <LayerConfig show={showModal} setShow={setShowModal} name={currName} />
      <div className="canvas-wrapper">
        <div className="canvas-header">
          <img src={menu} className="menu" onClick={() => setShow(true)} />
          <h1>Main canvas</h1>
          <Button variant="primary" onClick={() => setDisabled((val) => !val)}>
            Connect
          </Button>
        </div>
        <div onDragOver={allowDrop} onDrop={drop} className="app">
          <ArcherContainer
            ref={archerContainer}
            className="container"
            strokeColor="#4cd895"
            offset={4}
            // svgContainerStyle={{ zIndex: -1 }}
          >
            {components.map((component) => {
              return (
                <Draggable handle=".element" onStop={handleDragEnd} disabled={disabled}>
                  <div className="drag-wrapper">
                    <ArcherElement
                      id={component.id}
                      relations={[relations[component.id]]}
                    >
                      <div
                        className="element"
                        style={{
                          backgroundColor: component.dragState.color,
                          position: "absolute",
                          left: component.x,
                          top: component.y,
                        }}
                        onClick={clickHandler(component.id)}
                      >
                        {component.dragState.name}
                      </div>
                    </ArcherElement>
                  </div>
                </Draggable>
              );
            })}
          </ArcherContainer>
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
