import React from "react";

export default class Button extends React.Component {
  render() {
    const { light, handleClick } = this.props;
    return (
      <button
        className={light ? "light-button" : "dark-button"}
        onClick={handleClick}
      >
        {this.props.color || "Randomize"}
      </button>
    );
  }
}
