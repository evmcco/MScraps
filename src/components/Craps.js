import React, { Component } from "react";
import Board from "./Board";

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
        switch (diceSum) {
          case 2:
          case 3:
          case 12:
            //pass loses, dont pass wins
            newState.playerCash =
              this.state.playerCash + this.state.bets.dontPass;
            newState.bets.pass = 0;
            break;
          case 7:
          case 11:
            //pass wins, dont pass loses
            newState.playerCash = this.state.playerCash + this.state.bets.pass;
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
            break;
          case this.state.point:
            //pass wins
            newState.playerCash = this.state.playerCash + this.state.bets.pass;
            break;
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
        <h2>Player Funds: {this.state.playerCash}</h2>
        {!!this.state.point ? <p>Point: {this.state.point}</p> : null}
        <Board
          acceptBets={bets => this.acceptBets(bets)}
          bets={this.state.bets}
        />
      </>
    );
  }
}

export default Craps;
