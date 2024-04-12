import { useState, useEffect } from "react";

export default function App() {
  const [numberOfTiles, setNumberOfTiles] = useState(3);
  const [boardState, setBoardState] = useState<number[][]>([]);
  //NOTE: x=1, o=0, X go first
  const [whoseTurn, setWhoseTurn] = useState(1);
  const [whoWon, setWhoWon] = useState(-1);

  useEffect(() => {
    const b: number[][] = [];
    for (let j = 0; j < numberOfTiles; j++) {
      b[j] = [];
      for (let i = 0; i < numberOfTiles; i++) {
        b[j][i] = -1;
      }
    }
    setBoardState(b);
  }, [numberOfTiles]);

  function renderBoard() {
    return boardState.map((jArray, y) => {
      return (
        <div>
          {jArray.map((e, x) => (
            <button onClick={(event) => PlayerMove(event, whoseTurn, y, x)}>
              {`${e}, ${x} - ${y}`}
            </button>
          ))}
        </div>
      );
    });
  }

  function ResetBoard(e: React.MouseEvent<HTMLButtonElement>) {
    setWhoWon(-1);
    console.log(whoWon);
    setWhoseTurn(1);
    setNumberOfTiles(3);
  }

  function PlayerMove(
    event: React.MouseEvent<HTMLButtonElement>,
    player: number,
    yCoordinates: number,
    xCoordinates: number,
  ): React.MouseEventHandler<HTMLButtonElement> {
    event.preventDefault();
    const board = [...boardState];
    if (board[yCoordinates][xCoordinates] !== -1) return;
    board[yCoordinates][xCoordinates] = player;
    setBoardState(board);
    if (HasPlayerWon(player, yCoordinates, xCoordinates)) {
      setWhoWon(player);
      console.log("someone won");
      return;
    }
    setWhoseTurn(player === 1 ? 0 : 1);
  }

  function CheckWin(
    player: number,
    checkingYCoordinate: number,
    checkingXCoordinate: number,
    winCondition: number,
  ) {
    // check row
    for (
      let i = checkingXCoordinate - winCondition + 1;
      i <= checkingXCoordinate;
      i++
    ) {
      if (i < 0) continue;
      for (let j = 0; j < winCondition; j++) {
        if (i + j >= numberOfTiles) break;
        if (boardState[checkingYCoordinate][i + j] !== player) break;
        if (j === winCondition - 1) return true;
      }
    }
    // check col
    for (
      let i = checkingYCoordinate - winCondition + 1;
      i <= checkingYCoordinate;
      i++
    ) {
      if (i < 0) continue;
      for (let j = 0; j < winCondition; j++) {
        if (i + j >= numberOfTiles) break;
        if (boardState[i + j][checkingXCoordinate] !== player) break;
        if (j === winCondition - 1) return true;
      }
    }
    // check diag
    for (let i = -winCondition + 1; i <= 0; i++) {
      if (checkingYCoordinate + i < 0 || checkingXCoordinate + i < 0) continue;
      for (let j = 0; j < winCondition; j++) {
        if (
          checkingYCoordinate + i + j >= numberOfTiles ||
          checkingXCoordinate + i + j >= numberOfTiles
        )
          break;
        if (
          boardState[checkingYCoordinate + i + j][
            checkingXCoordinate + i + j
          ] !== player
        )
          break;
        if (j === winCondition - 1) return true;
      }
    }
    // check anti-diag
    for (let i = -winCondition + 1; i <= 0; i++) {
      if (
        checkingYCoordinate - i >= numberOfTiles ||
        checkingXCoordinate + i < 0
      )
        continue;
      for (let j = 0; j < winCondition; j++) {
        if (
          checkingYCoordinate - i - j < 0 ||
          checkingXCoordinate + i + j >= numberOfTiles
        )
          break;
        if (
          boardState[checkingYCoordinate - i - j][
            checkingXCoordinate + i + j
          ] !== player
        )
          break;
        if (j === winCondition - 1) return true;
      }
    }
    //if run through all case
    return false;
  }

  function HasPlayerWon(
    player: number,
    lastMoveYCoordinate: number,
    lastMoveXCoordinate: number,
  ): boolean {
    return CheckWin(player, lastMoveYCoordinate, lastMoveXCoordinate, 3);
  }

  if (whoWon !== -1) {
    console.log(whoWon);
    return (
      <>
        <div>{`Player ${whoWon} has won`}</div>
        <button onClick={(e) => ResetBoard()}>Reset</button>
      </>
    );
  } else return renderBoard();
}
