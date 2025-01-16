const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const display = document.querySelector(".display");

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.textContent = '☀️';
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    // Store current display value, ensuring it's not undefined
    const currentValue = display.value || "0";
    
    // Toggle theme
    body.classList.toggle('light-theme');
    const isLight = body.classList.contains('light-theme');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    // Restore display value, ensuring it matches the current calculation state
    display.value = output || currentValue;
});

const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";
let lastResult = null;
let lastOperator = null;
let newNumber = false;

const calculate = (btnValue) => {
  display.focus();

  if (btnValue === "AC") {
    // Complete reset
    output = "";
    lastResult = null;
    lastOperator = null;
    newNumber = false;
    display.value = "0";
    return;
  }

  if (btnValue === "DEL") {
    // Simple character deletion
    if (output === "Error") {
      output = "";
    } else if (output.length > 0) {
      output = output.slice(0, -1);
    }
    // Show 0 when everything is deleted
    display.value = output || "0";
    return;
  }

  // Handle numbers
  if (!specialChars.includes(btnValue)) {
    if (newNumber || output === "Error" || output === "0") {
      output = btnValue;
      newNumber = false;
    } else {
      output += btnValue;
    }
  }
  // Handle operators and other special functions
  else if (btnValue !== "AC" && btnValue !== "DEL") {
    switch (btnValue) {
      case "=":
        if (output !== "") {
          try {
            output = output.replace(/(\d+)%/g, "($1/100)");
            lastResult = eval(output);
            output = lastResult.toString();
            newNumber = true;
          } catch (error) {
            output = "Error";
            lastResult = null;
          }
        }
        break;

      default:
        if (output === "" && lastResult !== null) {
          output = lastResult.toString();
        }
        if (output !== "" && output !== "Error") {
          if (specialChars.includes(output.slice(-1))) {
            output = output.slice(0, -1);
          }
          output += btnValue;
          newNumber = false;
          lastOperator = btnValue;
        }
    }
  }

  display.value = output || "0";
};

// Add event listener to buttons, call calculate() on click.
buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

// Keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;
  const validKeys = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    ".": ".",
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/",
    "%": "%",
    Enter: "=",
    Backspace: "DEL",
    Escape: "AC",
  };

  if (validKeys.hasOwnProperty(key)) {
    calculate(validKeys[key]);
    event.preventDefault();
  }
});
