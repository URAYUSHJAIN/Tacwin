import React, { useState, useRef } from "react";
import "./TicTacToe.css";
import circle_icon from "../assets/circle.png";
import cross_icon from "../assets/cross.png";

export const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const titleRef = useRef(null);

  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  const box4 = useRef(null);
  const box5 = useRef(null);
  const box6 = useRef(null);
  const box7 = useRef(null);
  const box8 = useRef(null);
  const box9 = useRef(null);

  const boxRefs = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const toggle = (e, num) => {
    if (lock || data[num] !== "") return;

    const newData = [...data];
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src="${cross_icon}" alt="X" />`;
      newData[num] = "X";
    } else {
      e.target.innerHTML = `<img src="${circle_icon}" alt="O" />`;
      newData[num] = "O";
    }
    setData(newData);
    setCount(count + 1);
    checkWinner(newData);
  };

  const checkWinner = (newData) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        newData[a] &&
        newData[a] === newData[b] &&
        newData[a] === newData[c]
      ) {
        setLock(true);
        
        won(newData[a]);
        return;
      }
    }

    if (!newData.includes("")) {
      setLock(true);
      alert("It's a draw!");
    }
  };

  const won = (winner) => {
    if (titleRef.current) {
      titleRef.current.innerHTML = `Congratulations: <img src="${
        winner === "X" ? cross_icon : circle_icon
      }" alt="${winner}" />`;
    }
  };

  const reset = () => {
    setLock(false);
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    if (titleRef.current) titleRef.current.innerHTML = "Tic Tac Toe";
    boxRefs.forEach((ref) => {
      if (ref.current) ref.current.innerHTML = "";
    });
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe Game
      </h1>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className={`row${row + 1}`}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <div
                  key={index}
                  className="boxes"
                  ref={boxRefs[index]}
                  onClick={(e) => toggle(e, index)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
      <button className="reset" onClick={reset}>
        RESET
      </button>
    </div>
  );
};

export default TicTacToe;
