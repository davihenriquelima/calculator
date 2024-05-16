// arquivo que trata os botões e suas ações para preencher o input

//selecionando os elementos a serem manipulados
const gbi = (el:string):HTMLElement|null => {
    return document.getElementById(el);
}
const subMode = gbi('subMode') as HTMLButtonElement;
const superMode = gbi('superMode') as HTMLButtonElement;
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

// função para alternar os modos entre super e sub ou desativa os dois
function toggleMode(mode:string) {
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
            supMode ele vai desativar o cientNotActive e executar toggleMode, que por sua vez, 
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
            // Se o modo sub estiver ativo, adiciona o event listener de subModeCallBack e remove o de superModeCallBack
            input.addEventListener('keydown', subModeCallBack);
            input.removeEventListener('keydown', superModeCallBack);
        } else if (isSuperActive) {
            // Se o modo super estiver ativo, adiciona o event listener de superModeCallBack e remove o de subModeCallBack
            input.addEventListener('keydown', superModeCallBack);
            input.removeEventListener('keydown', subModeCallBack);
        } else {
            // Se nenhum dos modos estiver ativo, remove ambos os event listeners e executa o preenchimento sem os subs
            input.removeEventListener('keydown', subModeCallBack);
            input.removeEventListener('keydown', superModeCallBack);
            input.addEventListener('keydown', (event)=>keyboardFills(event, ''));
        }
    }
}

// funcão que adiciona o conteúdo no input através do teclado, com ou sem sup/sub
function keyboardFills(event:KeyboardEvent, mode:string) {

    const validCharRegex = /^[0-9a-zA-Z!@#$%^&*()_+{}\[\]:;<>,.?~\\-]$/;

    if (!validCharRegex.test(event.key)) {
        // Não faz nada se a tecla não for uma combinação válida, ou seja, a função test comparou a string key com cada caractere
        return;
    }

    let inputContent = input.innerHTML;

    if(typeof mode !== 'undefined') { // se o segundo parametro veio algo, ou seja, sup ou sup
        if (inputContent.length === 0) { // se o input não tem nada dentro
            if((event.key.match(/[0-9]/))) { // se a tecla digitada corresponte a algum item dessa regex (digitou um numero)
                let newElement = document.createElement(mode) as HTMLElement;
                input.appendChild(newElement);
                newElement.innerHTML += event.key;
    
            } else if (event.key.match(/[a-zA-Z!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/)) { // se digitou uma letra
                input.innerHTML = event.key

            }
        } else { // se já tem algo dentro do input
            if(event.key.match(/[0-9]/)) { // se digitou um número
            
                if(inputContent.endsWith(`</${mode}>`)) { // se o input termina com fechamento da tag
                    input.innerHTML = inputContent.slice(0,-6) + event.key + `</${mode}>` // retira o fechamento da tag, adciona o key e fecha a tag
        
                } else { // se termina com qualquer outra string
                    let newElement = document.createElement(mode) as HTMLElement;
                    input.appendChild(newElement);
                    newElement.innerHTML += event.key;
                }
            } else if (event.key.match(/[a-zA-Z!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/)) { // se digitou uma letra ou simbolo
                input.innerHTML = inputContent + event.key;
            }
        }
    } else {
        input.innerHTML += event.key;
    }
    event.preventDefault();
    moveCursorToEnd(input)
}

// função que adiciona conteúdo no input através dos botões
function buttonsFills(event:Event) {
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
        cientNotActive = true;
        const extractedText = content.replace(/<sup>.*?<\/sup>/, '');
        input.innerHTML += extractedText
        toggleMode('super')();
    } else {
        input.innerHTML += content
    }
    // Obs.: implementar verificação de onde está o cursor, se não tem nada depois dele, executa moveCursor, caso contrário, significa que tem algo depois dele e eu quero escrever ali.
    //Obs.: verificar se dar pra mesclar as duas funções (buttonsFills e keyboardFills), já que ambas vão verificar se os modos sub e sup está ativo
    moveCursorToEnd(input)
}

// funções de callback que estarão nos eventListeners em toggleMode
function subModeCallBack(event: KeyboardEvent) {
    keyboardFills(event, 'sub');
}

function superModeCallBack(event: KeyboardEvent) {
    keyboardFills(event, 'sup');
}

// adicionando os respectivos eventListeners de clique nos botões de sup e sub 
subMode.addEventListener('click', ()=> {
    subModeManuallyActive = !subModeManuallyActive;
    toggleMode('sub')();
});
superMode.addEventListener('click', ()=> {
    if(cientNotActive && superModeActive) { // se cientNot está ativo e supMode também
        cientNotActive = false; // declara cientNot como falso
    } else {
        superModeManuallyActive = !superModeManuallyActive; // caso contrário,apenas troca o modo
    }
    toggleMode('super')();
});

// código para os botões que adicionam símbolos e etc

cientNot.addEventListener('click', buttonsFills)
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
parentTr.addEventListener('click',  buttonsFills);
parentTl.addEventListener('click',  buttonsFills);
pi.addEventListener('click',  buttonsFills);
euler.addEventListener('click',  buttonsFills);
cosSimbol.addEventListener('click',  buttonsFills);
sinSimbol.addEventListener('click',  buttonsFills);
tanSimbol.addEventListener('click',  buttonsFills);
coshSimbol.addEventListener('click',  buttonsFills);
sinhSimbol.addEventListener('click',  buttonsFills);
tanhSimbol.addEventListener('click',  buttonsFills);

// código do Memory

// código do "fatorar o número no input"