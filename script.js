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
      if (secondNumber === 0) {
        firstNumber = null;
        secondNumber = null;
        operator = null;

        return 'Cannot divide by zero';
      } else {
        return divide(firstNumber, secondNumber);
      }

    default:
      break;
  }
}

function updateDisplay() {
  display.textContent = displayValue;
}

function numberClick(numberValue) {
  if (
    (displayValue === '0' && numberValue !== '.') ||
    displayValue === firstNumber
  ) {
    displayValue = numberValue;
  } else {
    if (numberValue === '.' && displayValue.includes('.')) {
      return;
    }

    displayValue += numberValue;
  }

  updateDisplay();
}

function calculate() {
  secondNumber = displayValue;

  const answer = operate(operator, +firstNumber, +secondNumber);

  displayValue = isFinite(answer) ? String(roundAnswer(answer)) : answer;
  firstNumber = displayValue;
  secondNumber = null;
  updateDisplay();
}

function operatorClick(operatorValue) {
  if (!isFinite(displayValue)) {
    return;
  }

  if (firstNumber && operator) {
    calculate();
    operator = operatorValue;
  } else {
    firstNumber = displayValue;
    operator = operatorValue;
  }
}

function equalClick() {
  if (!operator || !isFinite(displayValue)) {
    return;
  }

  calculate();
  operator = null;
}

function roundAnswer(number) {
  return Math.round(number * 100) / 100;
}

function clearAll() {
  firstNumber = null;
  secondNumber = null;
  operator = null;
  displayValue = '0';

  updateDisplay();
}

function deleteSymbol() {
  if (displayValue.length === 1) {
    displayValue = '0';
  } else {
    displayValue = displayValue.slice(0, -1);
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

  if (target.closest('button[data-type]')) {
    const buttonType = target
      .closest('button[data-type]')
      .getAttribute('data-type');

    switch (buttonType) {
      case 'number':
        numberClick(target.value);
        break;
      case 'operator':
        operatorClick(target.value);
        break;
      case 'equal':
        equalClick();
        break;
      case 'clear-all':
        clearAll();
        break;
      case 'backspace':
        deleteSymbol();
        break;

      default:
        break;
    }
  }
});
