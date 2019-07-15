import React, { Component } from "react";

class Craps extends Component {
  rollDice = () => {
    const die1 = Math.floor(Math.random() * 6 + 1);
    const die2 = Math.floor(Math.random() * 6 + 1);
    console.log("Die 1:", die1, "Die 2", die2);
    return [die1, die2];
  };

  render() {
    return (
      <>
        <button onClick={this.rollDice}>Roll</button>
      </>
    );
  }
}

export default Craps;
