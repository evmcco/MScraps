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
    const value = target.value;
    const name = target.name;
    newBets[name] = value;
    this.setState({
      bets: newBets
    });
  };

  updateBet = (bet, interval) => {
    let newBets = { ...this.state.bets };
    newBets[bet] += parseInt(interval);
    this.setState({
      bets: newBets
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.bets !== this.props.bets) {
      this.setState({
        bets: this.props.bets
      });
    }
  };

  render() {
    return (
      <>
        <div className="bets">
          <div>
            <label>
              <button
                disabled={this.props.point !== 0 ? false : true}
                onClick={() => this.updateBet("place4", 5)}
              >
                Place 4
              </button>
              <input
                type="text"
                name="place4"
                onChange={this.handleChange}
                value={this.state.bets.place4}
                readOnly="true:"
              />
            </label>
          </div>
          <div>
            <label>
              <button
                disabled={this.props.point !== 0 ? false : true}
                onClick={() => this.updateBet("place5", 5)}
              >
                Place 5
              </button>
              <input
                type="text"
                name="place5"
                onChange={this.handleChange}
                value={this.state.bets.place5}
                readOnly="true"
              />
            </label>
          </div>
          <div>
            <label>
              <button
                disabled={this.props.point !== 0 ? false : true}
                onClick={() => this.updateBet("place6", 6)}
              >
                Place 6
              </button>
              <input
                type="text"
                name="place6"
                onChange={this.handleChange}
                value={this.state.bets.place6}
                readOnly="true:"
              />
            </label>
          </div>
          <div>
            <label>
              <button
                disabled={this.props.point !== 0 ? false : true}
                onClick={() => this.updateBet("place8", 6)}
              >
                Place 8
              </button>
              <input
                type="text"
                name="place8"
                onChange={this.handleChange}
                value={this.state.bets.place8}
                readOnly="true"
              />
            </label>
          </div>
          <div>
            <label>
              <button
                disabled={this.props.point !== 0 ? false : true}
                onClick={() => this.updateBet("place9", 5)}
              >
                Place 9
              </button>
              <input
                type="text"
                name="place9"
                onChange={this.handleChange}
                value={this.state.bets.place9}
                readOnly="true"
              />
            </label>
          </div>
          <div>
            <label>
              <button
                disabled={this.props.point !== 0 ? false : true}
                onClick={() => this.updateBet("place10", 5)}
              >
                Place 10
              </button>
              <input
                type="text"
                name="place10"
                onChange={this.handleChange}
                value={this.state.bets.place10}
                readOnly="true"
              />
            </label>
          </div>
          <div>
            <label>
              <button
                disabled={
                  this.props.point !== 0 &&
                  this.props.bets.come === 0 &&
                  this.props.comePoint === 0
                    ? false
                    : true
                }
                onClick={() => this.updateBet("come", 5)}
              >
                Come
              </button>
              <input
                type="text"
                name="come"
                onChange={this.handleChange}
                value={this.state.bets.come}
                readOnly="true"
              />
            </label>
          </div>
          <div>
            <label>
              <button
                disabled={this.props.point !== 0 ? false : true}
                onClick={() => this.updateBet("field", 2)}
              >
                Field
              </button>
              <input
                type="text"
                name="field"
                onChange={this.handleChange}
                value={this.state.bets.field}
                readOnly="true"
              />
            </label>
          </div>
          <div>
            <label>
              <button
                disabled={
                  this.props.point === 0 && this.props.bets.pass === 0
                    ? false
                    : true
                }
                onClick={() => this.updateBet("pass", 5)}
              >
                Pass
              </button>
              <input
                type="text"
                name="pass"
                onChange={this.handleChange}
                value={this.state.bets.pass}
                readOnly="true"
              />
            </label>
          </div>
        </div>
        <button onClick={() => this.props.acceptBets(this.state.bets)}>
          Place Bets
        </button>
      </>
    );
  }
}

export default Board;
