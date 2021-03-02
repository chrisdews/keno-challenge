import React, { useState } from "react";
import './KenoContainer.css'
import Header from "../Header";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { green, purple } from '@material-ui/core/colors'

function KenoContainer() {
  const [selectedNumbers, setSelectedNumbers] = useState([0, 5, 7, 19, 26]);

  const titleText = "KENO";

  const boardBuilder = (x, y) => {
    let board = [];
    for (let i = 0; i < x; i++) {
      let row = [];
      for (let j = 0; j < y; j++) {
        let num = j + 1 + y * i;

        let className = "";
        if (selectedNumbers.includes(num)) {
          className = "selected";
        } else {
          className = "default";
        }
        row.push(
          <Button
            key={`key ${num}`}
            onClick={() => {
              clickHandler(num);
            }}
            className={className + ' min-width-button'}
          >
            {num}
          </Button>
        );
      }
      board.push(
        <Grid key={`row ${i + 1}`}>
          <ButtonGroup>{row}</ButtonGroup>
        </Grid>
      );
    }
    return board;
  };

  const clickHandler = (num) => {
    console.log(num);
  };

  return (
    <>
      <Header titleText={titleText} />

      <Grid>{boardBuilder(8, 8)}</Grid>

      {/* {board.map(num => <Grid>{num}</Grid>)} */}
    </>
  );
}

export default KenoContainer;
