import React, { Component } from "react";
import Board from "./Board";
import RollHistory from "./RollHistory";

class Craps extends Component {
  state = {
    playerCash: 100,
    die1: 0,
    die2: 0,
    point: 0,
    allRolls: [],
    bets: {
      pass: 0,
      dontPass: 0,
      come: 0,
      place4: 0,
      place5: 0,
      place6: 0,
      place8: 0,
      place9: 0,
      place10: 0,
      field: 0
    },
    comePoint: 0
  };

  rollDice = () => {
    const die1 = Math.floor(Math.random() * 6 + 1);
    const die2 = Math.floor(Math.random() * 6 + 1);
    let newAllRolls = this.state.allRolls.slice();
    newAllRolls.unshift([die1, die2]);
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

  sumBets = bets => {
    let sum = 0;
    for (let el in bets) {
      if (bets.hasOwnProperty(el)) {
        sum += parseInt(bets[el]);
      }
    }
    return sum;
  };

  acceptBets = bets => {
    let betSum = this.sumBets(bets);
    if (betSum > this.state.playerCash) {
      window.alert("Insufficient funds to complete bets, try again");
    } else {
      this.setState({
        bets,
        playerCash: this.state.playerCash - betSum
      });
    }
  };

  getResults = () => {
    let newState = { ...this.state };
    const diceSum = this.state.die1 + this.state.die2;
    switch (this.state.point) {
      case 0:
        //if the point is not set
        switch (diceSum) {
          case 2:
          case 3:
          case 12:
            //pass loses, dont pass wins
            newState.playerCash += newState.bets.dontPass;
            newState.bets.pass = 0;
            break;
          case 7:
          case 11:
            //pass wins, dont pass loses
            newState.playerCash += newState.bets.pass;
            newState.bets.dontPass = 0;
            break;
          case 4:
          case 5:
          case 6:
          case 8:
          case 9:
          case 10:
            //set the point
            newState.point = diceSum;
            break;
        }
      default:
        //if the point is set
        switch (diceSum) {
          case this.state.point:
            //pass wins
            newState.playerCash += newState.bets.pass;
          case 2:
            //come bet loses
            newState.bets.come = 0;
            //field wins 2:1
            newState.playerCash += newState.bets.field * 2;
            break;
          case 3:
            //come bet loses
            newState.bets.come = 0;
            //field wins 1:1
            newState.playerCash += newState.bets.field;
            break;
          case 4:
            //if theres a come bet, set the comePoint
            if (newState.bets.come != 0) {
              newState.comePoint = diceSum;
            }
            //field wins 1:1
            newState.playerCash += newState.bets.field;
            //place wins 9:5
            newState.playerCash += newState.bets.place4 * 1.8;
            break;
          case 5:
            //if theres a come bet, set the comePoint
            if (newState.bets.come != 0) {
              newState.comePoint = diceSum;
            }
            //place wins 7:5
            newState.playerCash += newState.bets.place5 * 1.4;
            break;
          case 6:
            //if theres a come bet, set the comePoint
            if (newState.bets.come != 0) {
              newState.comePoint = diceSum;
            }
            break;
          case 7:
            //come wins, clear bets and reset point
            newState.playerCash += newState.bets.come * 2;
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
            break;
          case 8:
            //if theres a come bet, set the comePoint
            if (newState.bets.come != 0) {
              newState.comePoint = diceSum;
            }
            break;
          case 9:
            //if theres a come bet, set the comePoint
            if (newState.bets.come != 0) {
              newState.comePoint = diceSum;
            }
            break;
          case 10:
            //if theres a come bet, set the comePoint
            if (newState.bets.come != 0) {
              newState.comePoint = diceSum;
            }
            //field wins 1:1
            newState.playerCash += newState.bets.field;
            break;
          case 11:
            //come wins
            newState.playerCash += newState.bets.come * 2;
            //field wins 1:1
            newState.playerCash += newState.bets.field;
            break;
          case 12:
            //come bet loses
            newState.bets.come = 0;
            //field wins 2:1
            newState.playerCash += newState.bets.field * 2;
            break;
        }
    }
    this.setState(newState);
  };

  componentDidUpdate = (prevProps, prevState) => {
    // console.log("prevState", prevState, "current State", this.state);
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
        <h2>Player Funds: {this.state.playerCash}</h2>
        {!!this.state.point ? <p>Point: {this.state.point}</p> : null}
        <Board
          acceptBets={bets => this.acceptBets(bets)}
          bets={this.state.bets}
          point={this.state.point}
        />
        <RollHistory prevRolls={this.state.allRolls} />
      </>
    );
  }
}

export default Craps;
