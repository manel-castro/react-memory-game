import React from "react";

const PlayCell = ({
  id,
  challenge,
  isPicked,
  gameStatus,
  onClick,
  cellWidth,
}) => {
  const click = () => {
    onClick(id);
  };
  const color =
    gameStatus === "starting"
      ? challenge
      : isPicked
      ? challenge === "blue"
        ? challenge
        : "pink"
      : gameStatus === "lose"
      ? challenge
      : "white";

  const dynamicStyles = {
    CellDiv: {
      width: `${cellWidth}%`,
      height: "50px",
      display: "inline-block",
      border: "2px solid lightgrey",
      backgroundColor: `${color}`,
    },
  };

  return <button style={dynamicStyles.CellDiv} onClick={click}></button>;
};

export default PlayCell;
