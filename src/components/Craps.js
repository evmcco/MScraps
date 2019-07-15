import React, { Component } from "react";

class Craps extends Component {
  state = {
    die1: 0,
    die2: 0
  };

  rollDice = () => {
    const die1 = Math.floor(Math.random() * 6 + 1);
    const die2 = Math.floor(Math.random() * 6 + 1);
    this.setState({
      die1: die1,
      die2: die2
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
      </>
    );
  }
}

export default Craps;
