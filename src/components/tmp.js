// import { ArcherContainer, ArcherElement } from "react-archer";
// import { useRef } from "react";
// export default function Tmp() {
//   const archerContainer = useRef(null);
//   return (
//     <div style={{ height: '1000px', margin: '50px' }}>
//       <ArcherContainer strokeColor="red">
//         <div>
//           <ArcherElement
//             id="element1"
//             relations={[
//               {
//                 targetId: "output",
//                 targetAnchor: "left",
//                 sourceAnchor: "right",
//               },
//             ]}
//           >
//             <div
//               style={{
//                 width: "100px",
//                 height: "100px",
//                 backgroundColor: "orange",
//                 position: "absolute",
//                 left: "300px",
//                 top: "300px",
//               }}
//             >
//               testing
//             </div>
//           </ArcherElement>
//         </div>
//         <div>
//           <ArcherElement id="output">
//             <div
//               style={{
//                 width: "100px",
//                 height: "100px",
//                 backgroundColor: "blue",
//                 position: "absolute",
//                 left: "500px",
//                 top: "500px",
//               }}
//             >
//               testing2
//             </div>
//           </ArcherElement>
//         </div>
//       </ArcherContainer>
//     </div>
//   );
// }
import React from "react";
import "./index.css";

import { ArcherContainer, ArcherElement } from "react-archer";
import Draggable from "react-draggable";

function App() {
  const archerContainer = React.useRef(null);

  const handleDragEnd = () => {
    archerContainer.current.refreshScreen();
  };

  const components = [
    {
      dragState: {
        color: "orange",
        name: "fully connected layer",
      },
      x: "300px",
      y: "300px",
      id: "0",
    },
    {
      dragState: {
        color: "blue",
        name: "output",
      },
      x: "500px",
      y: "500px",
      id: "1",
    },
  ];

  const relations = {
    0: {
      targetId: "1",
      targetAnchor: "left",
      sourceAnchor: "right",
    },
    1: {},
  };

  return (
    <div className="app">
      <ArcherContainer
        ref={archerContainer}
        className="container"
        strokeColor="#4cd895"
        offset={4}
        // svgContainerStyle={{ zIndex: -1 }}
      >
        {components.map((component) => {
          console.log(component.id);
          return (
            <Draggable handle=".element" onStop={handleDragEnd}>
              <div className="drag-wrapper">
                <ArcherElement
                  id={component.id}
                  relations={
                    relations[component.id] == {}
                      ? {}
                      : [relations[component.id]]
                  }
                >
                  <div
                    className="element"
                    style={{
                      backgroundColor: component.dragState.color,
                      position: "absolute",
                      left: component.x,
                      top: component.y,
                    }}
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
  );
}

export default App;
