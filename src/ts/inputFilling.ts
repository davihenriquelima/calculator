// arquivo que trata os botões e suas ações de adicionar no input

//selecionando os elementos a serem manipulados
const gbi = (el:string):HTMLElement|null => {
    return document.getElementById(el);
}
const subMode = gbi('subMode') as HTMLButtonElement;
const supMode = gbi('supMode') as HTMLButtonElement;
const cientNot = gbi('cientNot') as HTMLButtonElement;
const seven = gbi('number7') as HTMLButtonElement;
const eight = gbi('number8') as HTMLButtonElement;
const nine = gbi('number9') as HTMLButtonElement;
const four = gbi('number4') as HTMLButtonElement;
const five = gbi('number5') as HTMLButtonElement;
const six = gbi('number6') as HTMLButtonElement;
const one = gbi('number1') as HTMLButtonElement;
const two = gbi('number2') as HTMLButtonElement;
const tree = gbi('number3') as HTMLButtonElement;
const zero = gbi('number0') as HTMLButtonElement;
const point = gbi('point') as HTMLButtonElement;
const i = gbi('i') as HTMLButtonElement;
const modSimbol = gbi('mod-simbol') as HTMLButtonElement;
const undo = gbi('undo') as HTMLButtonElement;
const erase = gbi('erase') as HTMLButtonElement;
const divideSimbol = gbi('divide-simbol') as HTMLButtonElement;
const parentTr = gbi('parent-tr') as HTMLButtonElement;
const parentTl = gbi('parent-tl') as HTMLButtonElement;
const multiplySimbol = gbi('multiply-simbol') as HTMLButtonElement;
const memory = gbi('memory') as HTMLButtonElement;
const subtractSimbol = gbi('subtract-simbol') as HTMLButtonElement;
const pi = gbi('pi') as HTMLButtonElement;
const euler = gbi('euler') as HTMLButtonElement;
const addSimbol = gbi('add-simbol') as HTMLButtonElement;
const equal = gbi('equal') as HTMLButtonElement;
const factorize = gbi('factorize') as HTMLButtonElement;
const cosSimbol = gbi('cos-simbol') as HTMLButtonElement;
const sinSimbol = gbi('sin-simbol') as HTMLButtonElement;
const tanSimbol = gbi('tan-simbol') as HTMLButtonElement;
const sinhSimbol = gbi('sinh-simbol') as HTMLButtonElement;
const coshSimbol = gbi('cosh-simbol') as HTMLButtonElement;
const tanhSimbol = gbi('tanh-simbol') as HTMLButtonElement;
const powerToMinus1 = gbi('power-to-minus1') as HTMLButtonElement;
const factorialSimbol = gbi('factorial-simbol') as HTMLButtonElement;
const absSimbol = gbi('abs-simbol') as HTMLButtonElement;
const argSimbol = gbi('arg-simbol') as HTMLButtonElement;
const potentSimbol = gbi('potent-simbol') as HTMLButtonElement;
const radicSimbol = gbi('radic-simbol') as HTMLButtonElement;
const logSimbol = gbi('log-simbol') as HTMLButtonElement;
const natLogSimbol = gbi('nat-log-simbol') as HTMLButtonElement;
const realPart = gbi('real-part') as HTMLButtonElement;
const imaginPart = gbi('imagin-part') as HTMLButtonElement;
const conj = gbi('conj') as HTMLButtonElement;
const fxSelect = gbi('fx-select') as HTMLButtonElement;


// CÓDIGOS DOS MODOS SUP E SUB

// funcão que adiciona o conteúdo, com ou sem sup/sub, com base nas entradas de teclado
function sModeKeyInp(event:KeyboardEvent, mode:string) { 

    const validCharRegex = /^[0-9a-zA-Z!@#$%^&*()_+{}\[\]:;<>,.?~\\-]$/;

    if (!validCharRegex.test(event.key)) {
        // Não faz nada se a tecla não for uma combinação válida, ou seja, a função test comparou a string key com cada caractere
        return;
    }

    let inputContent = input.innerHTML;

    if (inputContent.length === 0) { // se o input não tem nada dentro
        if((event.key.match(/[0-9]/))) { // se a tecla digitada corresponte a algum item dessa regex (digitou um numero)
            let newElement = document.createElement(mode) as HTMLElement;
            input.appendChild(newElement);
            newElement.innerHTML += event.key;
            event.preventDefault()

        } else if (event.key.match(/[a-zA-Z!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/)) { // se digitou uma letra
            input.innerHTML = event.key
            event.preventDefault()
        }

    } else { // se já tem algo dentro do input
        if(event.key.match(/[0-9]/)) { // se digitou um número
        
            if(inputContent.endsWith(`</${mode}>`)) { // se o input termina com fechamento da tag
                input.innerHTML = inputContent.slice(0,-6) + event.key + `</${mode}>` // retira o fechamento da tag, adciona o key e fecha a tag
                event.preventDefault();
            } else { // se termina com qualquer outra string
                let newElement = document.createElement(mode) as HTMLElement;
                input.appendChild(newElement);
                newElement.innerHTML += event.key;
                event.preventDefault();
            }
             
        } else if (event.key.match(/[a-zA-Z!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/)) { // se digitou uma letra ou simbolo
            input.innerHTML = inputContent + event.key;
            event.preventDefault();
        }
    }

    moveCursorToEnd(input)
}

// variáveis de controle dos modos
let supModeManuallyActive = false;
let subModeManuallyActive = false;
let subModeActive = false;
let supModeActive = false;

// funções que estarão nos eventListeners dos modos sup e sub
function sModeKeyInpSub(event: KeyboardEvent) {
  sModeKeyInp(event, 'sub');
}

function sModeKeyInpSup(event: KeyboardEvent) {
  sModeKeyInp(event, 'sup');
}

// função para alternar os modos
function toggleMode(mode:string) {
    return ()=> {

        if (mode === 'sub') {
            subModeActive = !subModeActive;

            if (supModeActive) {
                supModeActive = false;
                supModeManuallyActive = false;
                supMode.classList.remove('active');
            }

        } else if (mode === 'sup') {
            supModeActive = !supModeActive;

            if (subModeActive) {
                subModeActive = false;
                subModeManuallyActive = false
                subMode.classList.remove('active');
            }
        }
        const activeModes: { [key: string]: boolean } = {
            subModeActive: subModeActive,
            supModeActive: supModeActive
        };

        const activeClass: string = `${mode}ModeActive`;
        const modeElement: Element|null = document.getElementById(`${mode}Mode`);

        if(modeElement) {
            modeElement.classList.toggle('active', activeModes[activeClass]);
        }
        const isSubActive = subModeManuallyActive || activeModes.subModeActive
        const isSupActive = supModeManuallyActive || activeModes.supModeActive

        if (isSubActive) {
            input.addEventListener('keydown', sModeKeyInpSub);
            input.removeEventListener('keydown', sModeKeyInpSup);
        } else if(isSupActive) {
            input.removeEventListener('keydown', sModeKeyInpSub);
            input.addEventListener('keydown', sModeKeyInpSup);
        }

        moveCursorToEnd(input)
    }
}

subMode.addEventListener('click', ()=> {
    subModeManuallyActive = !subModeManuallyActive;
    toggleMode('sub')();
});
supMode.addEventListener('click', ()=> {
    supModeManuallyActive = !supModeManuallyActive;
    toggleMode('sup')();
});


// código para os botões que apenas adicionam símbolos

let cientNotActive = false;

function buttonContent(event:Event) {
    let el = event.target as HTMLElement;
    let content = el.innerHTML;

    const spacedIds = ['mod-simbol', 'cos-simbol', 'sin-simbol', 'tan-simbol', 'cosh-simbol', 'sinh-simbol', 'tanh-simbol']
    if(spacedIds.includes(el.id)) {
        if(input.innerHTML === '') {
            input.innerHTML += content + ' ';
        } else {
            input.innerHTML += ' ' + content;
        }
    } else if(el.id === 'cientNot') {
        cientNotActive = !cientNotActive
        const extractedText = content.replace(/<sup>.*?<\/sup>/, '');
        input.innerHTML += extractedText
        if(cientNotActive && supModeManuallyActive === false && supModeActive === false) {
            toggleMode('sup')();
        }
    } else {
        input.innerHTML += content
    }
    //fazer verificação de onde está o cursor, se não tem nada depois dele, executa moveCursor, caso contrário, significa que tem algo depois dele e eu quero escrever ali.
    moveCursorToEnd(input)
}

cientNot.addEventListener('click', buttonContent)
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
parentTr.addEventListener('click',  buttonContent);
parentTl.addEventListener('click',  buttonContent);
pi.addEventListener('click',  buttonContent);
euler.addEventListener('click',  buttonContent);
cosSimbol.addEventListener('click',  buttonContent);
sinSimbol.addEventListener('click',  buttonContent);
tanSimbol.addEventListener('click',  buttonContent);
coshSimbol.addEventListener('click',  buttonContent);
sinhSimbol.addEventListener('click',  buttonContent);
tanhSimbol.addEventListener('click',  buttonContent);

// código do desfazer
undo.addEventListener('click', () => {

})

// código do apagar tudo
erase.addEventListener('click', () => {
    input.innerHTML = ''
    input.focus()
})
// código do Memory

// código do "fatorar o número no input"