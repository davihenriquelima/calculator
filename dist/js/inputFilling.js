"use strict";
const gbi = (el) => {
    return document.getElementById(el);
};
const subMode = gbi('subMode');
const supMode = gbi('supMode');
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
function sModeKeyInp(event, mode) {
    const validCharRegex = /^[0-9a-zA-Z!@#$%^&*()_+{}\[\]:;<>,.?~\\-]$/;
    if (!validCharRegex.test(event.key)) {
        return;
    }
    let inputContent = input.innerHTML;
    if (inputContent.length === 0) {
        if ((event.key.match(/[0-9]/))) {
            let newElement = document.createElement(mode);
            input.appendChild(newElement);
            newElement.innerHTML += event.key;
            event.preventDefault();
        }
        else if (event.key.match(/[a-zA-Z!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/)) {
            input.innerHTML = event.key;
            event.preventDefault();
        }
    }
    else {
        if (event.key.match(/[0-9]/)) {
            if (inputContent.endsWith(`</${mode}>`)) {
                input.innerHTML = inputContent.slice(0, -6) + event.key + `</${mode}>`;
                event.preventDefault();
            }
            else {
                let newElement = document.createElement(mode);
                input.appendChild(newElement);
                newElement.innerHTML += event.key;
                event.preventDefault();
            }
        }
        else if (event.key.match(/[a-zA-Z!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/)) {
            input.innerHTML = inputContent + event.key;
            event.preventDefault();
        }
    }
    moveCursorToEnd(input);
}
let supModeManuallyActive = false;
let subModeManuallyActive = false;
let subModeActive = false;
let supModeActive = false;
function sModeKeyInpSub(event) {
    sModeKeyInp(event, 'sub');
}
function sModeKeyInpSup(event) {
    sModeKeyInp(event, 'sup');
}
function toggleMode(mode) {
    return () => {
        if (mode === 'sub') {
            subModeActive = !subModeActive;
            if (supModeActive) {
                supModeActive = false;
                supModeManuallyActive = false;
                supMode.classList.remove('active');
            }
        }
        else if (mode === 'sup') {
            supModeActive = !supModeActive;
            if (subModeActive) {
                subModeActive = false;
                subModeManuallyActive = false;
                subMode.classList.remove('active');
            }
        }
        const activeModes = {
            subModeActive: subModeActive,
            supModeActive: supModeActive
        };
        const activeClass = `${mode}ModeActive`;
        const modeElement = document.getElementById(`${mode}Mode`);
        if (modeElement) {
            modeElement.classList.toggle('active', activeModes[activeClass]);
        }
        const isSubActive = subModeManuallyActive || activeModes.subModeActive;
        const isSupActive = supModeManuallyActive || activeModes.supModeActive;
        if (isSubActive) {
            input.addEventListener('keydown', sModeKeyInpSub);
        }
        else {
            input.removeEventListener('keydown', sModeKeyInpSub);
        }
        if (isSupActive) {
            input.addEventListener('keydown', sModeKeyInpSup);
        }
        else {
            input.removeEventListener('keydown', sModeKeyInpSup);
        }
        moveCursorToEnd(input);
    };
}
subMode.addEventListener('click', () => {
    subModeManuallyActive = !subModeManuallyActive;
    toggleMode('sub')();
});
supMode.addEventListener('click', () => {
    supModeManuallyActive = !supModeManuallyActive;
    toggleMode('sup')();
});
let cientNotActive = false;
function buttonContent(event) {
    let el = event.target;
    let content = el.innerHTML;
    const spacedIds = ['mod-simbol', 'cos-simbol', 'sin-simbol', 'tan-simbol', 'cosh-simbol', 'sinh-simbol', 'tanh-simbol'];
    if (spacedIds.includes(el.id)) {
        if (input.innerHTML === '') {
            input.innerHTML += `${content} `;
        }
        else {
            input.innerHTML += ` ${content} `;
        }
    }
    else if (el.id === 'cientNot') {
        cientNotActive = !cientNotActive;
        const extractedText = content.replace(/<sup>.*?<\/sup>/, '');
        input.innerHTML += extractedText;
        if (cientNotActive && supModeManuallyActive === false && supModeActive === false) {
            toggleMode('sup')();
        }
    }
    else {
        input.innerHTML += content;
    }
    moveCursorToEnd(input);
}
cientNot.addEventListener('click', buttonContent);
seven.addEventListener('click', buttonContent);
eight.addEventListener('click', buttonContent);
nine.addEventListener('click', buttonContent);
four.addEventListener('click', buttonContent);
five.addEventListener('click', buttonContent);
six.addEventListener('click', buttonContent);
one.addEventListener('click', buttonContent);
two.addEventListener('click', buttonContent);
tree.addEventListener('click', buttonContent);
zero.addEventListener('click', buttonContent);
point.addEventListener('click', buttonContent);
i.addEventListener('click', buttonContent);
modSimbol.addEventListener('click', buttonContent);
divideSimbol.addEventListener('click', buttonContent);
multiplySimbol.addEventListener('click', buttonContent);
subtractSimbol.addEventListener('click', buttonContent);
addSimbol.addEventListener('click', buttonContent);
parentTr.addEventListener('click', buttonContent);
parentTl.addEventListener('click', buttonContent);
pi.addEventListener('click', buttonContent);
euler.addEventListener('click', buttonContent);
cosSimbol.addEventListener('click', buttonContent);
sinSimbol.addEventListener('click', buttonContent);
tanSimbol.addEventListener('click', buttonContent);
coshSimbol.addEventListener('click', buttonContent);
sinhSimbol.addEventListener('click', buttonContent);
tanhSimbol.addEventListener('click', buttonContent);
undo.addEventListener('click', () => {
});
erase.addEventListener('click', () => {
    input.innerHTML = '';
    input.focus();
});
