import React, { Component } from "react";

class Craps extends Component {
  render() {
    return (
      <>
        <button onClick={this.rollDice}>Roll</button>
      </>
    );
  }
}

export default Craps;
