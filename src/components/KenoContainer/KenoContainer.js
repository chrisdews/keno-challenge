import React, { useState, useEffect } from "react";
import "./KenoContainer.css";
import Header from "../Header";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

function KenoContainer() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [stake, setStake] = useState(0);
  const [numbersConditionsMet, setNumbersConditionsMet] = useState(false);
  const [stakeConditionsMet, setStakeConditionsMet] = useState(false);
  const [gameMessage, setGameMessage] = useState(false);

  const titleText = "Keno";
  const stakeButtonContent = [
    `${1} 💰`,
    `${2} 💰`,
    `${5} 💰`,
    `${10} 💰`,
    `${20} 💰`,
  ];

  const boardBuilder = (x, y) => {
    let board = [];
    for (let i = 0; i < y; i++) {
      let row = [];
      for (let j = 0; j < x; j++) {
        let num = j + 1 + x * i;

        let className = "";
        if (selectedNumbers.includes(num)) {
          className = "active";
        } else if (num <= x * y * 0.5) {
          className = "blue";
        } else {
          className = "red";
        }
        row.push(
          <button
            key={`key ${num}`}
            onClick={() => {
              clickHandler(num);
            }}
            className={className + " min-width-button" + " number"}
          >
            {num}
          </button>
        );
      }
      board.push(<Grid key={`row ${i + 1}`}>{row}</Grid>);
    }
    return board;
  };

  const clickHandler = (num) => {
    if (selectedNumbers.length > 4 && !selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.shift());
    }
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((arrNum) => arrNum !== num));
    } else {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  const stakeButtonClickHandler = (num) => {
    setStake(num.split(" ")[0]);
  };

  const handleStakeInputChange = (event) => {
    setStake(event.target.value.split(" ")[0]);
  };

  const activeButton = (num) => {
    if (num.split(" ")[0] === stake) {
      return "active-button";
    } else {
      return "inactive-button";
    }
  };

  const luckyClickHandler = () => {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(Math.floor(Math.random() * Math.floor(80)));
    }
    setSelectedNumbers(arr);
  };

  const clearClickHandler = () => {
    setSelectedNumbers([]);
    setGameMessage(false);
    setNumbersConditionsMet(false);
    setStakeConditionsMet(false);
  };

  const submitClickHandler = () => {
    let isDecimal = stake.toString().split(".")[1];

    if (isDecimal && isDecimal.length > 2) {
      setGameMessage("too many decimals");
    } else if (!numbersConditionsMet) {
      setGameMessage("Select some numbers");
    } else if (!stakeConditionsMet) {
      setGameMessage("Choose a stake");
    } else if (numbersConditionsMet && stakeConditionsMet) {
      setGameMessage("You win!");
    } else {
      setGameMessage(false);
    }
  };

  useEffect(() => {
    if (selectedNumbers.length > 0) {
      setNumbersConditionsMet(true);
    } else {
      setNumbersConditionsMet(false);
    }
  }, [selectedNumbers]);

  useEffect(() => {
    if (stake > 0) {
      setStakeConditionsMet(true);
    } else {
      setStakeConditionsMet(false);
    }
  }, [stake]);

  return (
    <>
      <Header titleText={titleText} />
      <Grid>{boardBuilder(8, 10)}</Grid>
      <div className={"message-container"}>
        <div className={"message"}>{gameMessage && gameMessage}</div>
      </div>

      <div className="stake-container">
        {stakeButtonContent.map((num) => (
          <button
            onClick={() => {
              stakeButtonClickHandler(num);
            }}
            className={"action-button " + activeButton(num)}
          >
            {num}
          </button>
        ))}
        <input
          type="text"
          value={stake}
          onChange={(e) => {
            handleStakeInputChange(e);
          }}
        ></input>
      </div>

      <div className={"secondaryButtonContainer"}>
        <button className="action-button large" onClick={luckyClickHandler}>Lucky Pick</button>
        <button className="action-button large" onClick={clearClickHandler}>Clear Picks</button>
      </div>

      <div className={"submitButtonContainer"}>
        <button className="action-button large primary" onClick={submitClickHandler}>Place Bet</button>
      </div>
    </>
  );
}

export default KenoContainer;
