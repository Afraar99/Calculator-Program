const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";
let lastResult = null;
let resetOutput = false;

// Function to calculate based on button clicked.
const calculate = (btnValue) => {
  display.focus();

  if (btnValue === "=" && output !== "") {
    try {
      // If output has '%', replace with '/100' before evaluating.
      output = eval(output.replace("%", "/100"));
      lastResult = output;
      resetOutput = true;
    } catch (error) {
      output = "Error";
    }
  } else if (btnValue === "AC") {
    output = "";
    lastResult = null;
    resetOutput = false;
  } else if (btnValue === "DEL") {
    // If DEL button is clicked, remove the last character from the output.
    output = output.toString().slice(0, -1);
  } else {
    // If output is empty and button is specialChars then return
    if (output === "" && specialChars.includes(btnValue)) return;
    // Prevent consecutive operators like "++" or "**"
    if (specialChars.includes(btnValue) && specialChars.includes(output.slice(-1))) return;
    // If last result exists and a number or operator is pressed, continue the operation
    if (resetOutput && !specialChars.includes(btnValue)) {
      output = lastResult + btnValue;
      resetOutput = false;
    } else if (resetOutput && specialChars.includes(btnValue)) {
      output = lastResult + btnValue;
      resetOutput = false;
    } else if (resetOutput && output === lastResult) {
      output += btnValue;
      resetOutput = false;
    } else if (lastResult !== null && specialChars.includes(btnValue)) {
      output = lastResult + btnValue;
      resetOutput = false;
    } else {
      output += btnValue;
    }
  }

  display.value = output;
};

// Add event listener to buttons, call calculate() on click.
buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

// Keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key >= "0" && key <= "9") {
    calculate(key); // Number input
  } else if (key === ".") {
    calculate("."); // Decimal point
  } else if (key === "+" || key === "-" || key === "*" || key === "/" || key === "%") {
    calculate(key); // Operator input
  } else if (key === "Enter") {
    calculate("="); // Equals
  } else if (key === "Backspace") {
    calculate("DEL"); // Delete
  } else if (key === "Escape") {
    calculate("AC"); // Clear all
  }
});