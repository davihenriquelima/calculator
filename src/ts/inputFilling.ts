// arquivo que trata os botões e suas ações para preencher o input

//selecionando os elementos a serem manipulados
const gbi = (el:string):HTMLElement|null => {
    return document.getElementById(el);
}

const input = document.querySelector('#editable-div') as HTMLDivElement;
const subMode = gbi('subMode') as HTMLButtonElement;
const superMode = gbi('superMode') as HTMLButtonElement;
const buttonsThatFill = document.querySelectorAll('.buttonsThatFill') as NodeList;
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
const backspaceButton = gbi('backspace') as HTMLButtonElement;

// CÓDIGOS DOS MODOS SUP E SUB

// variáveis de controle dos modos
let superModeManuallyActive = false;
let subModeManuallyActive = false;
let subModeActive = false;
let superModeActive = false;
let cientNotActive:boolean;

// funcão que adiciona o conteúdo no input, com ou sem sup/sub
function fillInput(event:Event, mode:string) {

    const validCharRegex = /^[0-9a-zA-Z!@#$%^&*()_+{}\[\]:;<>,.?~\\-]$/;
    let inputContent = input.innerHTML;
    let key:string;
    let isKeyboardEvent = false;

    if(event instanceof KeyboardEvent) { // se foi um evento de teclado
        isKeyboardEvent = true;
        key = event.key
        if (!validCharRegex.test(event.key)) {
            return; // retorna daqui se a tecla não for uma combinação válida
        }
    } else { // se não foi um keyBoardEvent, é um evento de clique nos botões da tela
        const el = event.target as HTMLElement;
        key = el.innerHTML;

        const willHaveSpace = ['mod-simbol', 'cos-simbol', 'sin-simbol', 'tan-simbol', 'cosh-simbol', 'sinh-simbol', 'tanh-simbol']
        if(willHaveSpace.includes(el.id)) {
            if(input.innerHTML === '') {
                key = key + ' ';
            } else {
                key = ' ' + key + ' ';
            }
        } else if(el.id === 'cientNot') {
            cientNotActive = true;
            key = key.replace(/<sup>.*?<\/sup>/, '');
            modeControl('super')();
        }
    }
    console.log(key)
    if(mode !== '') { // se o segundo parametro veio algo, ou seja, sup ou sup
        if (inputContent.length === 0) { // se o input não tem nada dentro
            if(/[0-9]/.test(key)) { // se a tecla corresponte a algum item dessa regex
                let newElement = document.createElement(mode) as HTMLElement;
                input.appendChild(newElement);
                newElement.innerHTML += key;
    
            } else {
                input.innerHTML += key;
            }
        } else { // se já tem algo dentro do input
            if(key.match(/[0-9]/)) { // se digitou um número
            
                if(inputContent.endsWith(`</${mode}>`)) { // se o input termina com o fechamento da tag
                    input.innerHTML = inputContent.slice(0,-6) + key + `</${mode}>` // retira o fechamento da tag, adciona o key e fecha a tag
        
                } else { // se termina com qualquer outra string
                    let newElement = document.createElement(mode) as HTMLElement;
                    input.appendChild(newElement);
                    newElement.innerHTML += key;
                }
            } else { // se digitou uma letra ou simbolo
                input.innerHTML += key;
            }
        }
    } else { // se não veio nada no parâmetro 2, só o preenche mesmo
        console.log('preenchendo só')
        
        input.innerHTML += key;
    }
    event.preventDefault();
    moveCursorToEnd(input)
}

    // Obs.: implementar verificação de onde está o cursor, se não tem nada depois dele, executa moveCursortoEnd, caso contrário, significa que tem algo depois dele e eu quero escrever ali, ou algo parecido com isso

// funções de callback que estarão nos eventListeners em modeControl
function subModeCallBack(event: Event | KeyboardEvent) {
    console.log('subMode callback executado', event);
    fillInput(event, 'sub');
}

const superModeCallBack = (event: Event | KeyboardEvent) => {
    console.log('superMode callback executado', event);
    fillInput(event, 'sup');
}

const noModeCallBack = (event: Event | KeyboardEvent) => {
    console.log('noMode callback executado', event);
    fillInput(event, '');
}

// função para alternar os modos entre super e sub ou desativa os dois
function modeControl(mode:string) {
    return ()=> {

        if (mode === 'sub') {
            subModeActive = !subModeActive;

            if (superModeActive) {
                superModeActive = false;
                superModeManuallyActive = false;
                superMode.classList.remove('active');
            }

        } else if (mode === 'super') {
            if(cientNotActive) { // se o cienNot estiver ativo :
                superModeActive = true; // o superModeActive vai ser sempre true
            } else {
                superModeActive = !superModeActive; // caso contrário apenas troca o estado
            }

            /* superModeActive estará sempre ativo através do controle recebido no 
            código do cientNot, que define cientNotActive como true. E ao clicar no botão 
            supMode ele vai desativar o cientNotActive e executar modeControl, que por sua vez, 
            na linha acima, vai desativar superModeActive, que nas linhas abaixo surtirá efeito visual,
            para que tenhamos o controle correto. Pois se foi clicado no botão cientNot, significa que
            foi adicionado o valor "x10" no input e espera-se um valor de potência, que deverá ser adicionado dentro do
            superMode.*/

            if (subModeActive) {
                subModeActive = false;
                subModeManuallyActive = false
                subMode.classList.remove('active');
            }
        }
        // Cria um objeto com os modos ativos para determinar qual classe CSS adicionar/remover
        const activeModes: { [key: string]: boolean } = {
            subModeActive: subModeActive,
            superModeActive: superModeActive
        };

        // Cria uma string para a classe CSS correspondente ao modo ativo
        const activeClass: string = `${mode}ModeActive`;

        // Obtém o elemento HTML do modo atual (subMode ou superMode)
        const modeElement: Element | null = document.getElementById(`${mode}Mode`);

        // Se o elemento do modo existir, adiciona ou remove a classe CSS 'active' com base no estado do modo
        if (modeElement) {
            modeElement.classList.toggle('active', activeModes[activeClass]);
        }

        // Verifica se o modo sub está ativo
        const isSubActive = subModeManuallyActive || activeModes.subModeActive;

        // Verifica se o modo super está ativo
        const isSuperActive = superModeManuallyActive || activeModes.superModeActive;

        // Adiciona ou remove os event listeners de acordo com os modos ativos
        if (isSubActive) {
            buttonsThatFill.forEach(button => button.removeEventListener('click', noModeCallBack));
            buttonsThatFill.forEach(button => button.removeEventListener('click', superModeCallBack));
            input.removeEventListener('keydown', noModeCallBack);
            input.removeEventListener('keydown', superModeCallBack);
            buttonsThatFill.forEach(button => button.addEventListener('click', subModeCallBack));
            input.addEventListener('keydown', subModeCallBack);
            
        } else if (isSuperActive) {
            buttonsThatFill.forEach(button => button.removeEventListener('click', noModeCallBack));
            buttonsThatFill.forEach(button => button.removeEventListener('click', subModeCallBack));
            input.removeEventListener('keydown', noModeCallBack);
            input.removeEventListener('keydown', subModeCallBack);
            buttonsThatFill.forEach(button => button.addEventListener('click', superModeCallBack));
            input.addEventListener('keydown', superModeCallBack);
        } else {
            // Se nenhum dos modos estiver ativo, remove ambos os event listeners, super e sub de input e dos botões
            buttonsThatFill.forEach(button => button.removeEventListener('click', superModeCallBack));
            buttonsThatFill.forEach(button => button.removeEventListener('click', subModeCallBack));
            input.removeEventListener('keydown', subModeCallBack);
            input.removeEventListener('keydown', superModeCallBack);
            input.addEventListener('keydown', noModeCallBack);
            buttonsThatFill.forEach(button => button.addEventListener('click', noModeCallBack));
        }
        input.focus()
        moveCursorToEnd
    }
}

// adicionando os respectivos eventListeners de clique nos botões de sup e sub 
subMode.addEventListener('click', ()=> {
    subModeManuallyActive = !subModeManuallyActive;
    modeControl('sub')();
});
superMode.addEventListener('click', ()=> {
    if(cientNotActive && superModeActive) { // se cientNot está ativo e supMode também
        cientNotActive = false; // declara cientNot como falso
    } else {
        superModeManuallyActive = !superModeManuallyActive; // caso contrário,apenas troca o modo
    }
    modeControl('super')();
});

// Adicionando eventListeners que executam sem modo super ou sub

input.addEventListener('keydown', noModeCallBack); 

buttonsThatFill.forEach(button => button.addEventListener('click', noModeCallBack));

// código do Memory

// código do "fatorar o número no input"