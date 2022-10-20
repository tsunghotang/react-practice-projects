import React from "react";

function Button({ color, light, handleClick }) {
  return (
    <button
      className={light ? "light-button" : "dark-button"}
      onClick={handleClick}
    >
      {color || "Randomize"}
    </button>
  );
}

export default Button;
