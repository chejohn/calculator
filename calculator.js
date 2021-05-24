
function add(num1, num2) {
    return String(num1 + num2);
}

function subtract(num1, num2) {
    return String(num1 - num2);
}

function multiply(num1, num2) {
    return String(num1 * num2);
}

function divide(num1, num2) {
    if (num2 === 0) return 'Error';
    return String(num1/num2);
}

function divideBy100(num1) {
    return String(num1/100)
}

function updateNumbers() {
    if (operationValue === null)
        displayValues['num1'] = display.textContent;
    else displayValues['num2'] = display.textContent;
}

function operate(operator, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    if (operator === '+') return add(num1, num2);
    else if (operator === '-') return subtract(num1, num2);
    else if (operator === '*') return multiply(num1, num2);
    else return divide(num1, num2);
}

function changeDisplay() {
    if (this.textContent === '.' && (operationValue!== null && displayValues['num2'] === null)) {
        display.textContent = '0' + this.textContent;
    }
    else if (this.textContent === '.') {
        display.textContent = display.textContent + this.textContent;
    } 
    else if (display.textContent === '0' || (operationValue !== null && displayValues['num2'] === null)) {
        display.textContent = this.textContent; 
    }
    else display.textContent = display.textContent + this.textContent;
    updateNumbers();
}

function storeOperation() {
    if (displayValues['num2'] !== null) calculate();
    operationValue = this.textContent;
}

function calculate() {
    if (operationValue === null) return;
    if (displayValues['num2'] === null) {
        display.textContent = operate(operationValue, displayValues['num1'], displayValues['num1']);
    }
    else {
        display.textContent = operate(operationValue, displayValues['num1'], displayValues['num2']);
    }
    displayValues['num1'] = display.textContent;
    displayValues['num2'] = null;
    operationValue = null;
}

function clearDisplay() {
    displayValues['num1'] = null;
    displayValues['num2'] = null;
    operationValue = null;
    display.textContent = '0';
}

function changeSign() {
    if (display.textContent === '0') return;
    if (display.textContent.includes('-')) {
        display.textContent = display.textContent.replace('-', '');
    }
    else display.textContent = '-' + display.textContent;
    updateNumbers();
}

function makeAPercent() {
    if (display.textContent === '0') return;
    display.textContent = divideBy100(Number(display.textContent));
    updateNumbers();
}

const display = document.getElementById('sub-display');
const displayValues = {
    num1: null,
    num2: null
};

const numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
    number.addEventListener('click', changeDisplay)
});

let operationValue = null;
const operations = document.querySelectorAll('.operation');
operations.forEach((operation) => {
    if (operation.textContent === '=') return;
    operation.addEventListener('click', storeOperation);
});

const clear = document.getElementById('clear');
clear.addEventListener('click', clearDisplay);

const equals = document.querySelector('#equals')
equals.addEventListener('click', calculate);

const posNeg = document.querySelector('#pos-neg');
posNeg.addEventListener('click', changeSign)

const percent = document.querySelector('#percent');
percent.addEventListener('click', makeAPercent)