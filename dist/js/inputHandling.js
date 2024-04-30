"use strict";
const input = document.querySelector('#editable-div');
function getAllTextNodes(node) {
    const textNodes = [];
    function collectTextNodes(currentNode) {
        if (currentNode.nodeType === Node.TEXT_NODE) {
            textNodes.push(currentNode);
        }
        else if (currentNode.childNodes) {
            for (let i = 0; i < currentNode.childNodes.length; i++) {
                collectTextNodes(currentNode.childNodes[i]);
            }
        }
    }
    collectTextNodes(node);
    return textNodes;
}
function moveCursorToEnd(inputElement) {
    const textNodes = getAllTextNodes(inputElement);
    if (textNodes.length > 0) {
        const lastTextNode = textNodes[textNodes.length - 1];
        const range = document.createRange();
        const sel = window.getSelection();
        if (lastTextNode) {
            const textContent = lastTextNode.textContent || '';
            const spaceIndex = textContent.lastIndexOf(' ');
            if (range && sel) {
                if (spaceIndex !== -1) {
                    range.setStart(lastTextNode, spaceIndex + 1);
                }
                else {
                    range.setStart(lastTextNode, textContent.length);
                }
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }
}
function backspace(event) {
    if (event.key.toLowerCase() === 'backspace') {
        if (input.innerHTML === '') {
            event.preventDefault();
        }
        else if (input.innerText.length === 1) {
            event.preventDefault();
            input.innerHTML = '';
        }
    }
}
input.addEventListener('keydown', backspace);
