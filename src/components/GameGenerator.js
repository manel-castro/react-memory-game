import React, { useState } from "react";
import PlayGrid from "./PlayGrid";

import utils from "./utils/utils";

/* 
---TODOs---
- Repensar como seleccionar las cells segun tutorial
- Como contrastar las id cogidas con las que deberían ser. 
- SetGameStatus
- Boton Start Game, Play Again
- Puntuación
*/

export default function GameGenerator() {
  const [seed, setSeed] = useState(1);
  const [probability, setProbability] = useState(0.8);
  const [length, setLength] = useState(6);
  const [challengeSeconds, setChallengeSeconds] = useState(3);
  const [playSeconds, setPlaySeconds] = useState(15);
  const cellWidth = 100 / length;

  const { range, seededRandom } = utils;

  //Creates an array of ID's and random 1 and 0's
  let cells = range(1, length * length);
  let binaryOp;
  let blueCells = [0, []];

  cells = cells.map((cell) => {
    if (seededRandom(cell + seed) <= probability) {
      binaryOp = "white";
    } else {
      binaryOp = "blue";
      blueCells[0] = blueCells[0] + 1;
      blueCells[1] = [...blueCells[1], cell];
    }
    return [cell, binaryOp];
  });

  const gameIgnitor = () => {
    setSeed(seed + 1);
    setProbability(probability - 0.05);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <PlayGrid
          cells={cells}
          blueCellsCount={blueCells[0]}
          blueCellsIds={blueCells[1]}
          playSeconds={playSeconds}
          challengeSeconds={challengeSeconds}
          gameIgnitor={gameIgnitor}
          cellWidth={cellWidth}
        />
      </div>
    </>
  );
}
