import React, { useState, useEffect } from "react";
import Button from "./Button";

const colorNames = [
  "Aquamarine",
  "BlueViolet",
  "Chartreuse",
  "CornflowerBlue",
  "Thistle",
  "SpringGreen",
  "SaddleBrown",
  "PapayaWhip",
  "MistyRose",
];

function App() {
  const [color, setColor] = useState();

  useEffect(() => {
    setColor(randomColor);
  }, []);

  useEffect(() => {
    applyColor();
  }, [color]);

  const randomColor = () => {
    const randomColorArray = [];
    for (let i = 0; i < 3; i++) {
      randomColorArray.push(Math.floor(Math.random() * 256));
    }
    return randomColorArray;
  };

  const applyColor = () => {
    let formatedColor;
    Array.isArray(color)
      ? (formatedColor = formatColor(color))
      : (formatedColor = color);
    document.body.style.background = formatedColor;
  };

  const formatColor = () => {
    if (Array.isArray(color)) {
      return `rgb(${color.join(",")})`;
    }
    return color;
  };

  const isLight = () => {
    if (!Array.isArray(color)) return false;

    const rgb = color;
    rgb.reduce((a, b) => a + b) < 127 * 3;
    return rgb.reduce((a, b) => a + b) < 127 * 3;
  };

  const handleClick = ({ target }) => {
    target.innerText === "Randomize"
      ? setColor(randomColor())
      : setColor(target.innerText);
  };

  return (
    <div>
      <h1 className={isLight() ? "white" : "black"}>
        Current color is {formatColor(color)}
      </h1>
      <Button handleClick={handleClick} light={isLight()} />
      <div style={{ marginTop: 32 }}>
        {colorNames.map((color) => (
          <Button color={color} handleClick={handleClick} light={isLight()} />
        ))}
      </div>
    </div>
  );
}

export default App;
