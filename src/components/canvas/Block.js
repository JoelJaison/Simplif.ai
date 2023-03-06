const Block = ({ dragState, x, y }) => {
  
  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: dragState.color,
        position: "absolute",
        left: x, 
        top: y
      }}
    >
      {dragState.name}
    </div>
  );
};

export default Block;
