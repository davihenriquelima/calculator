const input = document.querySelector('#editable-div') as HTMLDivElement;

// funções que tratam o cursor
function getAllTextNodes(node: Node): Node[] { 
  //Essa função retorna uma matriz de todos os nós de texto (ou seja, conteúdo de texto) que estão dentro do elemento HTML
  const textNodes: Node[] = []; // array que vai receber todos os nós de texto

  function collectTextNodes(currentNode: Node) { // função que será usada recursivamente para percorrer a árvore de nós do elemento HTML
      if (currentNode.nodeType === Node.TEXT_NODE) { // se o currentNode é um nó de texto
          textNodes.push(currentNode); // ele é adicionado à matriz textNodes
      } else if (currentNode.childNodes){ // Se o currentNode não for um nó de texto e ele possui nós filhos. Isso permite que você continue navegando pela árvore de nós
          for (let i = 0; i < currentNode.childNodes.length; i++) { // inicia um loop que percorre todos os nós filhos de currentNode
              collectTextNodes(currentNode.childNodes[i]); // executa a própria função, que coleta nós, nesses nós filhos
          }
      }
  }
  collectTextNodes(node);
  return textNodes;
}

function moveCursorToEnd(inputElement: HTMLElement) {
  const textNodes = getAllTextNodes(inputElement);

  if (textNodes.length > 0) { // verifica se existem nós de texto coletados na matriz textNodes
      const lastTextNode = textNodes[textNodes.length - 1] as Text; // pega o último nó na matriz baseado na quantidade desta -1
      const range = document.createRange(); // instância de um objeto Range que é usado para representar uma seleção de texto no documento
      const sel = window.getSelection(); // obtém a seleção atual (que pode conter um cursor de texto) 

      if(lastTextNode) {
        const textContent = lastTextNode.textContent || '';
        const spaceIndex = textContent.lastIndexOf(' ');

        if (range && sel) {

          if (spaceIndex !== -1) { //Se houver um espaço
            range.setStart(lastTextNode, spaceIndex + 1); // coloque o cursor após o último espaço.
          } else { // se não houver um espaço
            range.setStart(lastTextNode, textContent.length);// Define o ponto de partida do Range para ser o final do último nó de texto coletado. Isso significa que o cursor será posicionado no final desse nó de texto
          }
          range.collapse(true); // Colapsa o Range para que ele não selecione nenhum texto. Ao passar true como argumento, você está indicando que deseja que o cursor fique no ponto de início do Range, que foi definido como o final do último nó de texto
          sel.removeAllRanges(); // Remove todas as seleções (inclusive o cursor) da janela atual
          sel.addRange(range); // Adiciona o Range que foi criado (e colapsado) à seleção atual. Isso efetivamente posiciona o cursor no final do último nó de texto
        }
      }
  }
}

// função que trata o backspace no input através da entrada de teclado
function backspaceOnKey(event:KeyboardEvent) {
	if (event.key.toLowerCase() === 'backspace') {
    if(input.innerHTML === '') {
      event.preventDefault();
    } else if(input.innerText.length === 1) {
      event.preventDefault();
      input.innerHTML = '';
    }
  }
}
input.addEventListener('keydown', backspaceOnKey)

// Código do backspace button que está no html
backspaceButton.addEventListener('click', () => {
  
})

// código do botão apagar tudo
erase.addEventListener('click', () => {
  input.innerHTML = ''
  input.focus()
})

// código do botão desfazer
undo.addEventListener('click', () => {

})

// tratando números complexos

/* 
  function handleInputCpxNums(value: string): { real: number; imag: number } {
    const parts = value.split("+"); // Separar parte real e imaginária
    if (parts.length !== 2) {
        throw new Error("Formato inválido para número complexo.");
    }
    
    const realPart = parseFloat(parts[0]);
    const imagPart = parseFloat(parts[1].replace("i", ""));
    
    if (isNaN(realPart) || isNaN(imagPart)) {
        throw new Error("Valores inválidos na representação do número complexo.");
    }
    return { real: realPart, imag: imagPart };
}*/

/*
function handleUserInput() {
    let value = input.value
    try {

      const complexNumber = tratComplexNumber(value);

    } catch (error) {
     
    }
  }
*/
