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
  const [gameMessage, setGameMessage] = useState(false)

  const titleText = "KENO";
  const stakeButtonContent = [1, 2, 5, 10, 20];

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
            className={className + " min-width-button"}
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
    if (selectedNumbers.length > 4) {
      setSelectedNumbers(selectedNumbers.shift());
    }
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((arrNum) => arrNum !== num));
    } else {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  const stakeButtonClickHandler = (num) => {
    setStake(num);
  };

  const handleStakeInputChange = (event) => {
    setStake(event.target.value);
  };

  const activeButton = (num) => {
    if (num === stake) {
      return "active-button";
    } else {
      return "inactive-button";
    }
  };

  const luckyClickHandler = () => {
    let arr  = []
    for (let i=0; i<5; i++){
        arr.push(Math.floor(Math.random() * Math.floor(80)))
    }
    setSelectedNumbers(arr);
  };

  const clearClickHandler = () => {
      setSelectedNumbers([])
  }

  const submitClickHandler = () => {
    if(numbersConditionsMet && stakeConditionsMet){
        setGameMessage('You win!')
    }else if (stake.toString().split('.')[1].length > 2){
        setGameMessage('too many decimals')
    }
    else if(!numbersConditionsMet){
        setGameMessage('Select some numbers')
    }else if (!stakeConditionsMet){
        setGameMessage('Choose a stake')
    }else{
        setGameMessage(false)
    }
  }

  useEffect(() => {
    if (selectedNumbers.length > 0) {
      setNumbersConditionsMet(true);
    } else {
      setNumbersConditionsMet(false);
    }
    return () => {
      console.log("cleanup");
    };
  }, [selectedNumbers]);

  useEffect(() => {
    if (stake > 0) {
      setStakeConditionsMet(true);
    } else {
      setStakeConditionsMet(false);
    }
    return () => {
      console.log("cleanup");
    };
  }, [stake]);

  return (
    <>
      <Header titleText={titleText} />
      <Grid>{boardBuilder(8, 10)}</Grid>
      {gameMessage && <div>{gameMessage}</div>}
      {stakeButtonContent.map((num) => (
        <Button
          onClick={() => {
            stakeButtonClickHandler(num);
          }}
          className={activeButton(num)}
        >
          {num}
        </Button>
      ))}
      <input
        type="text"
        value={stake}
        onChange={(e) => {
          handleStakeInputChange(e);
        }}
      ></input>

      <div className={"secondaryButtonContainer"}>
        <Button onClick={luckyClickHandler}>Lucky Pick</Button>
        <Button onClick={clearClickHandler}>Clear Picks</Button>
      </div>

      <div className={"submitButtonContainer"}>
        <Button onClick={submitClickHandler}>Place Bet</Button>
      </div>
    </>
  );
}

export default KenoContainer;
