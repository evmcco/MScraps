import React, { Component } from "react";
import Board from "./Board";

class Craps extends Component {
  state = {
    playerCash: 10,
    die1: 0,
    die2: 0,
    point: 0,
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
    },
    comePoint: 0,
    dontComePoint: 0
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
    let newState = { ...this.state };
    const diceSum = this.state.die1 + this.state.die2;
    switch (this.state.point) {
      case 0:
        switch (diceSum) {
          case 2:
          case 3:
          case 12:
            //pass loses, dont pass wins
            let winnings = this.state.bets.dontPass;
            newState.playerCash = this.state.playerCash + winnings;
            newState.bets.pass = 0;
            break;
          case 7:
          case 11:
            //pass wins, dont pass loses
            let winnings = this.state.bets.pass;
            newState.playerCash = this.state.playerCash + winnings;
            newState.bets.dontPass = 0;
            break;
          case 4:
          case 5:
          case 6:
          case 8:
          case 9:
          case 10:
            //set the point, move pass/dont pass bets to come/dont come
            newState.point = diceSum;
            break;
        }
      default:
        switch (diceSum) {
          case 7:
            //dont come wins, clear bets and reset point
            newState.bets = {
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
            };
            newState.point = 0;
          case this.state.point:
            //pass wins
            let winnings = this.state.bets.pass;
            newState.playerCash = this.state.playerCash + winnings;
          default:
          //keep rolling
        }
    }
    this.setState(newState);
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log("prevState", prevState, "current State", this.state);
    if (this.state.allRolls !== prevState.allRolls) {
      this.getResults();
    }
  };

  render() {
    // console.log(this.state);
    return (
      <>
        <button type="button" onClick={() => this.rollDice()}>
          Roll
        </button>
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
