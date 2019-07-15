import React, { Component } from "react";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // bets: {
      //   pass: 0,
      //   dontPass: 0,
      //   come: 0,
      //   dontCome: 0,
      //   place4: 0,
      //   place5: 0,
      //   place6: 0,
      //   place8: 0,
      //   place9: 0,
      //   place10: 0,
      //   field: 0
      // }
      bets: this.props.bets
      // bets: {}
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
        <button onClick={() => this.props.acceptBets(this.state.bets)}>
          Place Bets
        </button>
      </>
    );
  }
}

export default Board;
