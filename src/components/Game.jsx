import { useState } from "react";
import "../App.css";
import circle_icon from "../../public/images/o.png";
import cross_icon from "../../public/images/x.png";
import confetti from "canvas-confetti";

function Game() {
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("Player 1");

  const resetGame = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setGameEnd(false);
    setLock(false);
    setWinnerMessage("");
    setCurrentPlayer("Player 1");
    document.querySelectorAll(".box").forEach((box) => {
      box.innerHTML = "";
    });
  };

  const toggle = (e, num) => {
    if (lock || gameEnd || data[num] !== "") {
      return;
    }

    const newData = [...data];
    newData[num] = count % 2 === 0 ? "x" : "o";
    setData(newData);
    e.target.innerHTML =
      count % 2 === 0
        ? `<img src='${cross_icon}'>`
        : `<img src='${circle_icon}'>`;
    setCount(count + 1);
    setCurrentPlayer(count % 2 === 0 ? "Player 2" : "Player 1");
    checkWin(newData);
  };

  function checkWin(currentData) {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (
        currentData[a] &&
        currentData[a] === currentData[b] &&
        currentData[a] === currentData[c]
      ) {
        won(currentData[a]);
        return;
      }
    }

    if (count === 8) {
      setGameEnd(true);
      setWinnerMessage("It's a draw!");
    }
  }

  const won = (winner) => {
    setLock(true);
    setGameEnd(true);
    const winningPlayer = winner === "x" ? "Player 1" : "Player 2";
    setWinnerMessage(` ${winningPlayer} wins!`);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 300,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic <span>Tac </span>Toe
      </h1>
      {!gameEnd && <div className="turn-message" > {currentPlayer}'s turn</div>}
       <div className="board">
        <div className="row1">
          <div
            className="box"
            onClick={(e) => {
              toggle(e, 0);
            }}
          ></div>
          <div
            className="box"
            onClick={(e) => {
              toggle(e, 1);
            }}
          ></div>
          <div
            className="box"
            onClick={(e) => {
              toggle(e, 2);
            }}
          ></div>
        </div>

        <div className="row2">
          <div
            className="box"
            onClick={(e) => {
              toggle(e, 3);
            }}
          ></div>
          <div
            className="box"
            onClick={(e) => {
              toggle(e, 4);
            }}
          ></div>
          <div
            className="box"
            onClick={(e) => {
              toggle(e, 5);
            }}
          ></div>
        </div>

        <div className="row3">
          <div
            className="box"
            onClick={(e) => {
              toggle(e, 6);
            }}
          ></div>
          <div
            className="box"
            onClick={(e) => {
              toggle(e, 7);
            }}
          ></div>
          <div
            className="box"
            onClick={(e) => {
              toggle(e, 8);
            }}
          ></div>
        </div>
      </div>
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
      {gameEnd && <div className="winner-message">{winnerMessage}</div>}
    </div>
  );
}

export default Game;
