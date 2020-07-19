import React, { useState, useEffect } from "react";
import PlayCell from "./PlayCell";

import utils from "./utils/utils";

const { matrixCrosser } = utils;

const PlayGrid = ({
  cells,
  blueCellsIds,
  blueCellsCount,
  playSeconds,
  challengeSeconds,
  gameIgnitor,
  cellWidth,
}) => {
  const [pickedCells, setPickedCells] = useState([]);
  const [gameStatus, setGameStatus] = useState("init");
  const [secondsLeft, setSecondsLeft] = useState(playSeconds);

  //Sets timer for game
  useEffect(() => {
    let timeId;
    if (gameStatus === "starting") {
      timeId = setTimeout(() => {
        setGameStatus("live");
      }, 1000 * challengeSeconds);
      return () => clearTimeout(timeId);
    }
    if (secondsLeft !== 0 && gameStatus === "live") {
      timeId = setInterval(() => {
        setSecondsLeft((secondsLeft) => {
          if (secondsLeft === 1) {
            clearTimeout(timeId);
            setGameStatus("lose");
          }
          return secondsLeft - 1;
        });
      }, 1000);
    }
    return () => clearTimeout(timeId);
  }, [challengeSeconds, gameStatus]);

  // useEffect(() => {
  //   if (gameStatus === "win") {
  //     console.log("you win");
  //   } else if (gameStatus === "lose") {
  //     console.log("you lose");
  //   }
  // }, [gameStatus]);

  React.useEffect(() => {
    const [fMatches, fErrors] = matrixCrosser(blueCellsIds, pickedCells);

    if (fErrors === 2) {
      setGameStatus("lose");
    } else if (fMatches === blueCellsCount) {
      setGameStatus("win");
    }
  }, [pickedCells]);

  //Recovers successful clicks on cells and counts them up.

  const onClick = (id) => {
    if (gameStatus === "live") {
      setPickedCells((pickedCells) => {
        if (pickedCells.includes(id)) {
          return pickedCells;
        } else {
          return [...pickedCells, id];
        }
      });
    }
  };

  // Start game or Play Again
  const playStatus = () => {
    if (gameStatus === "init") {
      setGameStatus("starting");
    } else if (gameStatus === "lose" || gameStatus === "win") {
      setGameStatus("starting");
      setPickedCells([]);
      setSecondsLeft(playSeconds);
      gameIgnitor();
    }
  };

  return (
    <div style={styles.gridStyles}>
      <div style={{ border: "2px solid lightgrey" }}>
        {cells.map((cell) => {
          return (
            <PlayCell
              key={cell[0]}
              id={cell[0]}
              challenge={cell[1]}
              isPicked={pickedCells.includes(cell[0])}
              gameStatus={gameStatus}
              onClick={onClick}
              cellWidth={cellWidth}
            />
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <div>Seconds left: {secondsLeft}</div>
        <>
          {gameStatus === "win" ? (
            <>You win</>
          ) : gameStatus === "lose" ? (
            <>You lose</>
          ) : (
            <></>
          )}
        </>
        <>
          {gameStatus === "init" ? (
            <button onClick={playStatus}>Play</button>
          ) : gameStatus === "lose" || gameStatus === "win" ? (
            ((<div>You {gameStatus}</div>),
            (<button onClick={playStatus}>Play Again</button>))
          ) : (
            <></>
          )}
        </>
      </div>
    </div>
  );
};

const styles = {
  gridStyles: {
    maxWidth: "500",
  },
};

export default PlayGrid;
