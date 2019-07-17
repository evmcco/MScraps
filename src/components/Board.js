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
              Place 4
              <input
                type="text"
                name="place4"
                onChange={this.handleChange}
                value={this.state.bets.place4}
                readOnly={this.props.point !== 0 ? false : true}
              />
            </label>
          </div>
          <div>
            <label>
              Place 5
              <input
                type="text"
                name="place5"
                onChange={this.handleChange}
                value={this.state.bets.place5}
                readOnly={this.props.point !== 0 ? false : true}
              />
            </label>
          </div>
          <div>
            <label>
              Place 6
              <input
                type="text"
                name="place6"
                onChange={this.handleChange}
                value={this.state.bets.place6}
                readOnly={this.props.point !== 0 ? false : true}
              />
            </label>
          </div>
          <div>
            <label>
              Place 8
              <input
                type="text"
                name="place8"
                onChange={this.handleChange}
                value={this.state.bets.place8}
                readOnly={this.props.point !== 0 ? false : true}
              />
            </label>
          </div>
          <div>
            <label>
              Place 9
              <input
                type="text"
                name="place9"
                onChange={this.handleChange}
                value={this.state.bets.place9}
                readOnly={this.props.point !== 0 ? false : true}
              />
            </label>
          </div>
          <div>
            <label>
              Place 10
              <input
                type="text"
                name="place10"
                onChange={this.handleChange}
                value={this.state.bets.place10}
                readOnly={this.props.point !== 0 ? false : true}
              />
            </label>
          </div>
          <div>
            <label>
              Come
              <input
                type="text"
                name="come"
                onChange={this.handleChange}
                value={this.state.bets.come}
                readOnly={
                  this.props.point !== 0 &&
                  this.props.bets.come === 0 &&
                  this.props.comePoint === 0
                    ? false
                    : true
                }
              />
            </label>
          </div>
          <div>
            <label>
              Field
              <input
                type="text"
                name="field"
                onChange={this.handleChange}
                value={this.state.bets.field}
                readOnly={this.props.point !== 0 ? false : true}
              />
            </label>
          </div>
          <div>
            <label>
              Pass
              <input
                type="text"
                name="pass"
                onChange={this.handleChange}
                value={this.state.bets.pass}
                readOnly={
                  this.props.point === 0 && this.props.bets.pass === 0
                    ? false
                    : true
                }
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
