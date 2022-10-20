import React from "react";

export default class Button extends React.Component {
  render() {
    return (
      <button
        className={this.props.light ? "light-button" : "dark-button"}
        onClick={this.props.handleClick}
      >
        {this.props.color || "Randomize"}
      </button>
    );
  }
}
