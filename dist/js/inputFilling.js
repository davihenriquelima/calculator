"use strict";
const gbi = (el) => {
    return document.getElementById(el);
};
const subMode = gbi('subMode');
const superMode = gbi('superMode');
const cientNot = gbi('cientNot');
const seven = gbi('number7');
const eight = gbi('number8');
const nine = gbi('number9');
const four = gbi('number4');
const five = gbi('number5');
const six = gbi('number6');
const one = gbi('number1');
const two = gbi('number2');
const tree = gbi('number3');
const zero = gbi('number0');
const point = gbi('point');
const i = gbi('i');
const modSimbol = gbi('mod-simbol');
const undo = gbi('undo');
const erase = gbi('erase');
const divideSimbol = gbi('divide-simbol');
const parentTr = gbi('parent-tr');
const parentTl = gbi('parent-tl');
const multiplySimbol = gbi('multiply-simbol');
const memory = gbi('memory');
const subtractSimbol = gbi('subtract-simbol');
const pi = gbi('pi');
const euler = gbi('euler');
const addSimbol = gbi('add-simbol');
const equal = gbi('equal');
const factorize = gbi('factorize');
const cosSimbol = gbi('cos-simbol');
const sinSimbol = gbi('sin-simbol');
const tanSimbol = gbi('tan-simbol');
const sinhSimbol = gbi('sinh-simbol');
const coshSimbol = gbi('cosh-simbol');
const tanhSimbol = gbi('tanh-simbol');
const powerToMinus1 = gbi('power-to-minus1');
const factorialSimbol = gbi('factorial-simbol');
const absSimbol = gbi('abs-simbol');
const argSimbol = gbi('arg-simbol');
const potentSimbol = gbi('potent-simbol');
const radicSimbol = gbi('radic-simbol');
const logSimbol = gbi('log-simbol');
const natLogSimbol = gbi('nat-log-simbol');
const realPart = gbi('real-part');
const imaginPart = gbi('imagin-part');
const conj = gbi('conj');
const fxSelect = gbi('fx-select');
const backspaceButton = gbi('backspace');
let superModeManuallyActive = false;
let subModeManuallyActive = false;
let subModeActive = false;
let superModeActive = false;
let cientNotActive;
function fillInput(event, mode) {
    const validCharRegex = /^[0-9a-zA-Z!@#$%^&*()_+{}\[\]:;<>,.?~\\-]$/;
    let inputContent = input.innerHTML;
    let key;
    let isKeyboardEvent = false;
    if (event instanceof KeyboardEvent) {
        isKeyboardEvent = true;
        key = event.key;
        if (!validCharRegex.test(event.key)) {
            return;
        }
    }
    else {
        const el = event.target;
        key = el.innerHTML;
        const willHaveSpace = ['mod-simbol', 'cos-simbol', 'sin-simbol', 'tan-simbol', 'cosh-simbol', 'sinh-simbol', 'tanh-simbol'];
        if (willHaveSpace.includes(el.id)) {
            if (input.innerHTML === '') {
                key = key + ' ';
            }
            else {
                key = ' ' + key + ' ';
            }
        }
        else if (el.id === 'cientNot') {
            cientNotActive = true;
            key = key.replace(/<sup>.*?<\/sup>/, '');
            toggleMode('super')();
        }
    }
    if (typeof mode !== 'undefined') {
        if (inputContent.length === 0) {
            if (/[0-9]/.test(key)) {
                let newElement = document.createElement(mode);
                input.appendChild(newElement);
                newElement.innerHTML += key;
            }
            else {
                input.innerHTML += key;
            }
        }
        else {
            if (key.match(/[0-9]/)) {
                if (inputContent.endsWith(`</${mode}>`)) {
                    input.innerHTML = inputContent.slice(0, -6) + key + `</${mode}>`;
                }
                else {
                    let newElement = document.createElement(mode);
                    input.appendChild(newElement);
                    newElement.innerHTML += key;
                }
            }
            else {
                input.innerHTML += key;
            }
        }
    }
    else {
        input.innerHTML += key;
    }
    if (isKeyboardEvent) {
        event.preventDefault();
    }
}
function subModeCallBack(event) {
    fillInput(event, 'sub');
}
function superModeCallBack(event) {
    fillInput(event, 'sup');
}
function toggleMode(mode) {
    return () => {
        if (mode === 'sub') {
            subModeActive = !subModeActive;
            if (superModeActive) {
                superModeActive = false;
                superModeManuallyActive = false;
                superMode.classList.remove('active');
            }
        }
        else if (mode === 'super') {
            if (cientNotActive) {
                superModeActive = true;
            }
            else {
                superModeActive = !superModeActive;
            }
            if (subModeActive) {
                subModeActive = false;
                subModeManuallyActive = false;
                subMode.classList.remove('active');
            }
        }
        const activeModes = {
            subModeActive: subModeActive,
            superModeActive: superModeActive
        };
        const activeClass = `${mode}ModeActive`;
        const modeElement = document.getElementById(`${mode}Mode`);
        if (modeElement) {
            modeElement.classList.toggle('active', activeModes[activeClass]);
        }
        const isSubActive = subModeManuallyActive || activeModes.subModeActive;
        const isSuperActive = superModeManuallyActive || activeModes.superModeActive;
        if (isSubActive) {
            input.addEventListener('keydown', subModeCallBack);
            input.removeEventListener('keydown', superModeCallBack);
        }
        else if (isSuperActive) {
            input.addEventListener('keydown', superModeCallBack);
            input.removeEventListener('keydown', subModeCallBack);
        }
        else {
            input.removeEventListener('keydown', subModeCallBack);
            input.removeEventListener('keydown', superModeCallBack);
        }
    };
}
subMode.addEventListener('click', () => {
    subModeManuallyActive = !subModeManuallyActive;
    toggleMode('sub')();
});
superMode.addEventListener('click', () => {
    if (cientNotActive && superModeActive) {
        cientNotActive = false;
    }
    else {
        superModeManuallyActive = !superModeManuallyActive;
    }
    toggleMode('super')();
});
document.querySelectorAll('.buttonsThatFill').forEach(button => {
    button.addEventListener('click', (event) => fillInput(event, ''));
});
