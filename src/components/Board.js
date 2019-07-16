import React, { Component } from "react";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bets: this.props.bets
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    let newBets = { ...this.state.bets };
    const target = e.target;
    const value = parseInt(target.value);
    const name = target.name;
    newBets[name] = value;
    this.setState({
      bets: newBets
    });
  };

  render() {
    return (
      <>
        <label>
          Pass
          <input
            type="text"
            name="pass"
            onChange={this.handleChange}
            value={this.state.bets.pass}
          />
        </label>
        <label>
          Don't Pass
          <input
            type="text"
            name="dontPass"
            onChange={this.handleChange}
            value={this.state.bets.dontPass}
          />
        </label>
        <label>
          Come
          <input
            type="text"
            name="come"
            onChange={this.handleChange}
            value={this.state.bets.come}
          />
        </label>
        <label>
          Field - <strong>2</strong>,3,4,10,11,<strong>12</strong>
          <input
            type="text"
            name="field"
            onChange={this.handleChange}
            value={this.state.bets.field}
          />
        </label>
        <label>
          Place 4
          <input
            type="text"
            name="place4"
            onChange={this.handleChange}
            value={this.state.bets.place4}
          />
        </label>
        <label>
          Place 5
          <input
            type="text"
            name="place5"
            onChange={this.handleChange}
            value={this.state.bets.place5}
          />
        </label>
        <label>
          Place 6
          <input
            type="text"
            name="place6"
            onChange={this.handleChange}
            value={this.state.bets.place6}
          />
        </label>
        <label>
          Place 8
          <input
            type="text"
            name="place8"
            onChange={this.handleChange}
            value={this.state.bets.place8}
          />
        </label>
        <label>
          Place 9
          <input
            type="text"
            name="place9"
            onChange={this.handleChange}
            value={this.state.bets.place9}
          />
        </label>
        <label>
          Place 10
          <input
            type="text"
            name="place10"
            onChange={this.handleChange}
            value={this.state.bets.place10}
          />
        </label>
        <button onClick={() => this.props.acceptBets(this.state.bets)}>
          Place Bets
        </button>
      </>
    );
  }
}

export default Board;
