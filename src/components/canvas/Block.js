import { useRef } from "react";


const Block = ({ dragState, x, y }) => {
  const [getPos, setPos] = useRefSet({ xPos: x + "px", yPos: y + "px" });
  const handleDrag = (e) => {
	console.log(getPos());
    setPos({
      xPos: e.clientX + "px",
      yPos: e.clientY + "px",
    });
  };
  return (
    <div
      draggable={true}
      onDragEnd={handleDrag}
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: dragState.color,
        position: "absolute",
        left: getPos().xPos,
        top: getPos().yPos,
      }}
    >
      {dragState.name}
    </div>
  );
};

function useRefSet(initialState) {
  const ref = useRef(initialState);
  const setRef = (newValue) => (ref.current = newValue);
  const getRef = () => ref.current;
  return [getRef, setRef];
}

export default Block;
