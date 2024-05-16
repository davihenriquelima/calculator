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
            input.addEventListener('keydown', (event) => keyboardFills(event, ''));
        }
    };
}
function keyboardFills(event, mode) {
    const validCharRegex = /^[0-9a-zA-Z!@#$%^&*()_+{}\[\]:;<>,.?~\\-]$/;
    if (!validCharRegex.test(event.key)) {
        return;
    }
    let inputContent = input.innerHTML;
    if (typeof mode !== 'undefined') {
        if (inputContent.length === 0) {
            if ((event.key.match(/[0-9]/))) {
                let newElement = document.createElement(mode);
                input.appendChild(newElement);
                newElement.innerHTML += event.key;
            }
            else if (event.key.match(/[a-zA-Z!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/)) {
                input.innerHTML = event.key;
            }
        }
        else {
            if (event.key.match(/[0-9]/)) {
                if (inputContent.endsWith(`</${mode}>`)) {
                    input.innerHTML = inputContent.slice(0, -6) + event.key + `</${mode}>`;
                }
                else {
                    let newElement = document.createElement(mode);
                    input.appendChild(newElement);
                    newElement.innerHTML += event.key;
                }
            }
            else if (event.key.match(/[a-zA-Z!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/)) {
                input.innerHTML = inputContent + event.key;
            }
        }
    }
    else {
        input.innerHTML += event.key;
    }
    event.preventDefault();
    moveCursorToEnd(input);
}
function buttonsFills(event) {
    let el = event.target;
    let content = el.innerHTML;
    const spacedIds = ['mod-simbol', 'cos-simbol', 'sin-simbol', 'tan-simbol', 'cosh-simbol', 'sinh-simbol', 'tanh-simbol'];
    if (spacedIds.includes(el.id)) {
        if (input.innerHTML === '') {
            input.innerHTML += content + ' ';
        }
        else {
            input.innerHTML += ' ' + content;
        }
    }
    else if (el.id === 'cientNot') {
        cientNotActive = true;
        const extractedText = content.replace(/<sup>.*?<\/sup>/, '');
        input.innerHTML += extractedText;
        toggleMode('super')();
    }
    else {
        input.innerHTML += content;
    }
    moveCursorToEnd(input);
}
function subModeCallBack(event) {
    keyboardFills(event, 'sub');
}
function superModeCallBack(event) {
    keyboardFills(event, 'sup');
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
cientNot.addEventListener('click', buttonsFills);
seven.addEventListener('click', buttonsFills);
eight.addEventListener('click', buttonsFills);
nine.addEventListener('click', buttonsFills);
four.addEventListener('click', buttonsFills);
five.addEventListener('click', buttonsFills);
six.addEventListener('click', buttonsFills);
one.addEventListener('click', buttonsFills);
two.addEventListener('click', buttonsFills);
tree.addEventListener('click', buttonsFills);
zero.addEventListener('click', buttonsFills);
point.addEventListener('click', buttonsFills);
i.addEventListener('click', buttonsFills);
modSimbol.addEventListener('click', buttonsFills);
divideSimbol.addEventListener('click', buttonsFills);
multiplySimbol.addEventListener('click', buttonsFills);
subtractSimbol.addEventListener('click', buttonsFills);
addSimbol.addEventListener('click', buttonsFills);
parentTr.addEventListener('click', buttonsFills);
parentTl.addEventListener('click', buttonsFills);
pi.addEventListener('click', buttonsFills);
euler.addEventListener('click', buttonsFills);
cosSimbol.addEventListener('click', buttonsFills);
sinSimbol.addEventListener('click', buttonsFills);
tanSimbol.addEventListener('click', buttonsFills);
coshSimbol.addEventListener('click', buttonsFills);
sinhSimbol.addEventListener('click', buttonsFills);
tanhSimbol.addEventListener('click', buttonsFills);
