const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let currentInput = "";

// Handle button clicks
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    handleInput(button.dataset.value);
  });
});

// Handle keyboard inputs
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (isNumber(key) || isOperator(key) || key === "Enter" || key === "Backspace" || key === "Escape") {
    handleInput(key);
  }
});

function handleInput(input) {
  if (input === "AC" || input === "Escape") {
    // Clear display
    currentInput = "";
  } else if (input === "DEL" || input === "Backspace") {
    // Delete the last character
    currentInput = currentInput.slice(0, -1);
  } else if (input === "=" || input === "Enter") {
    // Evaluate the expression
    try {
      currentInput = eval(currentInput).toString();
    } catch {
      currentInput = "Error";
    }
  } else if (isOperator(input)) {
    // Add operator only if the last character is not an operator
    if (!isOperator(currentInput.slice(-1))) {
      currentInput += input === "*" ? "*" : input; // Handle multiplication symbol
    }
  } else if (isNumber(input) || input === ".") {
    // Add numbers or decimal point
    currentInput += input;
  }

  // Update the display
  display.value = currentInput;
}

// Helper functions
function isNumber(char) {
  return !isNaN(char) && char.trim() !== "";
}

function isOperator(char) {
  return ["+", "-", "*", "/", "%"].includes(char);
}
