function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, firstNumber, secondNumber) {
  switch (operator) {
    case '+':
      return add(firstNumber, secondNumber);
    case '-':
      return subtract(firstNumber, secondNumber);
    case '*':
      return multiply(firstNumber, secondNumber);
    case '/':
      return divide(firstNumber, secondNumber);

    default:
      break;
  }
}

function updateDisplay() {
  display.textContent = displayValue;
}

function numberClick(numberValue) {
  if (displayValue === '0' || displayValue === firstNumber) {
    displayValue = numberValue;
  } else {
    displayValue += numberValue;
  }

  updateDisplay();
}

let firstNumber = null;
let secondNumber = null;
let operator = null;
let displayValue = '0';
const display = document.querySelector('.calculator__display');
const keyboard = document.querySelector('.calculator__keyboard');

keyboard.addEventListener('click', function (e) {
  const target = e.target;

  if (target.hasAttribute('data-type')) {
    const buttonType = target.getAttribute('data-type');

    switch (buttonType) {
      case 'number':
        numberClick(target.value);
        break;

      default:
        break;
    }
  }
});
