let expression = '';
let result = '';
let screen = document.getElementById('screen');
let binaryResult = document.getElementById('binaryResult');
let decimalResult = document.getElementById('decimalResult');
let octalResult = document.getElementById('octalResult');
let hexResult = document.getElementById('hexResult');

// Function to append a number to the expression
function appendNumber(number) {
  expression += number;
  screen.textContent = expression;
}

// Function to append an operator to the expression
function appendOperator(operator) {
  expression += operator;
  screen.textContent = expression;
}

// Function to calculate the result
function calculate() {
  try {
    result = eval(expression);
    screen.textContent = result;

    // Update the result table
    binaryResult.textContent = result.toString(2);
    decimalResult.textContent = result.toString(10);
    octalResult.textContent = result.toString(8);
    hexResult.textContent = result.toString(16).toUpperCase();
  } catch (error) {
    screen.textContent = 'Error';
  }
}

// Function to clear the last character
function clearLast() {
  expression = expression.slice(0, -1);
  screen.textContent = expression;
}

// Function to clear all
function clearAll() {
  expression = '';
  result = '';
  screen.textContent = '0';
  binaryResult.textContent = '';
  decimalResult.textContent = '';
  octalResult.textContent = '';
  hexResult.textContent = '';
}