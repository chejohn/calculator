
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1/num2;
}

function operate(operator, num1, num2) {
    if (operator === '+') return add(num1, num2);
    else if (operator === '-') return subtract(num1, num2);
    else if (operator === '*') return multiply(num1, num2);
    else return divide(num1, num2);
}

function changeDisplay() {
    if (display.textContent === '0' || (operationValue !== null && displayValues['num2'] === null)) {
        display.textContent = this.textContent; 
    }
    else display.textContent = display.textContent + this.textContent;
    
    if (operationValue === null)
        displayValues['num1'] = display.textContent;
    else displayValues['num2'] = display.textContent;
}

function storeOperation() {
    operationValue = this.textContent;
}

function calculate() {
    
}

function clearDisplay() {
    displayValues['num1'] = null;
    displayValues['num2'] = null;
    operationValue = null;
    display.textContent = '0';
}

const display = document.getElementById('sub-display');
const displayValues = {
    num1: null,
    num2: null
};

const numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
    if (number.textContent === '.') return;
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
