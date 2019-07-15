import React, { Component } from "react";
import Board from "./Board";
import { throwStatement } from "@babel/types";

class Craps extends Component {
  state = {
    die1: 0,
    die2: 0,
    point: 0,
    pointSet: false,
    allRolls: [],
    bets: {
      pass: 0,
      dontPass: 0,
      come: 0,
      dontCome: 0,
      place4: 0,
      place5: 0,
      place6: 0,
      place8: 0,
      place9: 0,
      place10: 0,
      field: 0
    }
  };

  rollDice = () => {
    const die1 = Math.floor(Math.random() * 6 + 1);
    const die2 = Math.floor(Math.random() * 6 + 1);
    let newAllRolls = this.state.allRolls.slice();
    newAllRolls.push([die1, die2]);
    this.setState({
      die1: die1,
      die2: die2,
      allRolls: newAllRolls
    });
  };

  dieNumberToIcon = num => {
    return num === 1 ? (
      <i className="fas fa-dice-one" />
    ) : num === 2 ? (
      <i className="fas fa-dice-two" />
    ) : num === 3 ? (
      <i className="fas fa-dice-three" />
    ) : num === 4 ? (
      <i className="fas fa-dice-four" />
    ) : num === 5 ? (
      <i className="fas fa-dice-five" />
    ) : num === 6 ? (
      <i className="fas fa-dice-six" />
    ) : null;
  };

  acceptBets = bets => {
    this.setState({
      bets
    });
  };

  getResults = () => {
    const diceSum = this.state.die1 + this.state.die2;
    if (!this.state.pointSet) {
      if (diceSum === 2 || diceSum === 3 || diceSum === 12) {
        //pass loses, dont pass wins
      } else if (diceSum === 7 || diceSum === 11) {
        //pass wins, dont pass loses
      } else if (
        diceSum === 4 ||
        diceSum === 5 ||
        diceSum === 6 ||
        diceSum === 8 ||
        diceSum === 9 ||
        diceSum === 10
      ) {
        this.setState({
          point: diceSum,
          pointSet: true
        });
      }
    } else if (!!this.state.pointSet) {
      if (diceSum === 7) {
        //dont pass wins, clear bets and reset point
        this.setState({
          pointSet: false
        });
      } else if (diceSum === this.state.point) {
        //pass wins
      } else {
        //keep rolling
      }
    }
  };

  render() {
    console.log(this.state);
    return (
      <>
        <button onClick={this.rollDice}>Roll</button>
        <h1>
          {!!this.state.die1 ? (
            <span>{this.dieNumberToIcon(this.state.die1)} </span>
          ) : null}
          {!!this.state.die2 ? (
            <span>{this.dieNumberToIcon(this.state.die2)}</span>
          ) : null}
        </h1>
        <Board
          acceptBets={bets => this.acceptBets(bets)}
          bets={this.state.bets}
        />
      </>
    );
  }
}

export default Craps;
