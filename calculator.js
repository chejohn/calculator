

function add(num1, num2) {
    const result = String(num1 + num2);
    if (result.length >= 9) {
        return String(expo(Number(result), 3))
    }
    return result;
}

function subtract(num1, num2) {
    const result = String(num1 - num2);
    if (result.length >= 9) {
        return String(expo(Number(result), 3))
    }
    return result;
}

function multiply(num1, num2) {
    const result = String(num1 * num2);
    if (result.length >= 9) {
        return String(expo(Number(result), 3))
    }
    return result;
}

function divide(num1, num2) {
    if (num2 === 0) return 'Error';
    const result = String(num1/num2);
    if (result.length >= 9) {
        return String(expo(Number(result), 3))
    }
    return result;
}

function divideBy100(num1) {
    const result = String(num1/100);
    if (result.length >= 9) {
        return String(expo(Number(result), 3))
    }
    return result;
}

function expo(number, roundTo) {
    return Number.parseFloat(number).toExponential(roundTo);
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

function populateNumbers() {
    if (display.textContent === '0' || (operationValue !== null && displayValues['num2'] === '')) {
        display.textContent = this.textContent; 
    }
    else display.textContent = display.textContent + this.textContent;
    updateNumbers();
}

function storeOperation() {
    if (displayValues['num2'] !== '') calculate();
    operationValue = this.textContent;
}

function calculate() {
    if (operationValue === null) return;
    
    if (displayValues['num2'] === '') {
        display.textContent = operate(operationValue, displayValues['num1'], displayValues['num1']);
    }
    else {
        display.textContent = operate(operationValue, displayValues['num1'], displayValues['num2']);
    }
    displayValues['num1'] = display.textContent;
    displayValues['num2'] = '';
    operationValue = null;
}

function clearDisplay() {
    displayValues['num1'] = '';
    displayValues['num2'] = '';
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
    display.textContent = divideBy100(Number(display.textContent));
    updateNumbers();
}

function insertDecimal() {
    if (operationValue === null && displayValues['num1'].includes('.')) return;
    if (operationValue !== null && displayValues['num2'].includes('.')) return;
    
    if (operationValue !== null && displayValues['num2'] === '') {
        display.textContent = '0' + this.textContent;
    }
    else display.textContent = display.textContent + this.textContent;
    updateNumbers();
}

const display = document.getElementById('sub-display');
const displayValues = {
    num1: '',
    num2: ''
};

const numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
    if (number.id === 'decimal') return;
    number.addEventListener('click', populateNumbers);
});

let operationValue = null;
const operations = document.querySelectorAll('.operation');
operations.forEach((operation) => {
    if (operation.textContent === '=') return;
    operation.addEventListener('click', storeOperation);
});

const clear = document.getElementById('clear');
clear.addEventListener('click', clearDisplay);

const equals = document.querySelector('#equals');
equals.addEventListener('click', calculate);

const posNeg = document.querySelector('#pos-neg');
posNeg.addEventListener('click', changeSign);

const percent = document.querySelector('#percent');
percent.addEventListener('click', makeAPercent);

const decimal = document.querySelector('#decimal');
decimal.addEventListener('click', insertDecimal);