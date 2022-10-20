import React from "react";
import Button from "./Button";

// The program sets the screen's background to a random color.
// Clicking the randomize button will randomly select a color and set the background to that color
// Clicking one of the predefined color buttons will set the background to that color

// Components
// App - handles the logic and passes down the `handleClick` function and the color attribute as a prop to the button component
// The app's job is to store a color, and to use that color to update the screen’s background.
// App has a color state. The state can be changed by clicking one of the buttons which calls the `handleClick` function and sets the color state to a new color.
// Evertime the state is changed the `ComponentDidUpdate` lifecycle method is called and sets the background to the current value in the state by calling `applyColor`.

// Button - has an onclick event listener that triggers the `handleClick` function passed to it as props. The color prop is used as the innerText of the button. If it has a color prop then the button should be labeled with a color if it doesn it should be labeled with 'Randomize'.

// Page loads and we store a random color to the state of the component
// `componentDidMount` lifecycle method is executed and calls the `applyColor` function
// `applyColor`sets the background of the page to the color stored in state.
// render method is executed which renders multiple Button components which are passed an event handler and a color attribute as props. Each Button component has an onClick eventListener

// When a user clicks a btn
// The eventHandler is executed which sets the color state in App to a new value.
// The lifecycle `ComponentDidUpdate` lifecycle method is called and changes the backgorund to the color stored in the state.

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: this.randomColor() }; // set the initial state of the component to a random color
    // this.handleClick = this.handleClick.bind(this);  // not needed if we use an arrow function
  }

  componentDidMount() {
    // Executed on mount. On intital load/when the page is refreshed.
    this.applyColor();
  }

  componentDidUpdate() {
    // Executed whenever the state of the App component is changed.
    // We change the color state everytime we click a button.
    this.applyColor();
  }

  randomColor() {
    // generates a random rgb color which can be represented by three sets of numbers between 0 and 256
    const randomColor = [];
    for (let i = 0; i < 3; i++) {
      randomColor.push(Math.floor(Math.random() * 256));
    }
    return randomColor;
  }

  applyColor() {
    // applies the current color stored in the state to the webpage.
    let color;
    Array.isArray(this.state.color)
      ? (color = this.formatColor(this.state.color))
      : (color = this.state.color);
    document.body.style.background = color;
  }

  formatColor(color) {
    // formates the output we want to display to the user
    if (Array.isArray(this.state.color)) {
      // takes an array representing rgb formats it.
      // [123, 123, 123] => rgba(123, 123, 123)
      return `rgb(${color.join(",")})`;
    }
    return color;
  }

  isLight() {
    // method used to discern if the current color stored in the state is light or dark
    // Used to change the text color to white or black (accessibility)
    if (!Array.isArray(this.state.color)) return false;

    const rgb = this.state.color;
    console.log(rgb.reduce((a, b) => a + b) < 127 * 3);
    return rgb.reduce((a, b) => a + b) < 127 * 3;
  }

  handleClick = ({ target }) => {
    // eventhandler passed to the Button Component.
    // Sets the color state to a new value depending on the Button clicked
    // note - if we use the arrow function we don't need to bind 'this' in the constructor.
    let color;
    target.innerText === "Randomize"
      ? this.setState({ color: this.randomColor() })
      : this.setState({ color: target.innerText });
  };

  // we pass an attribute to the button component called onCLick and pass it the handleClick method which will be used as the cb for the eventlistener on the html rendered by the button component.
  render() {
    return (
      <div>
        <h1 className={this.isLight() ? "white" : "black"}>
          Current color is {this.formatColor(this.state.color)}
        </h1>
        <Button handleClick={this.handleClick} />
        <div style={{ marginTop: 32 }}>
          {colorNames.map((color) => (
            <Button color={color} handleClick={this.handleClick} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
