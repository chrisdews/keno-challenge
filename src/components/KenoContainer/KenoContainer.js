import React, { useState, useEffect } from "react";
import "./KenoContainer.css";
import Header from "../Header";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { green, purple } from "@material-ui/core/colors";

function KenoContainer() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [stake, setStake] = useState(2.3);
  const [numbersConditionsMet, setNumbersConditionsMet] = useState(false);
  const [stakeConditionsMet, setStakeConditionsMet] = useState(false);

  const titleText = "KENO";

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

      {/* {board.map(num => <Grid>{num}</Grid>)} */}
    </>
  );
}

export default KenoContainer;
