/* funções relacionadas às operações básicas, como adição, subtração, multiplicação e divisão */

export function add(a:number, b:number):number {
    return a + b;
}

export function subtract(a:number, b:number):number {
    return a - b;
}

export function multiply(a: number, b: number): number {
    return a * b;
}

export function divide(a: number, b: number): number {
    if (b === 0) {
        throw new Error("Divisão por zero não é permitida.");
    }
    return a / b;
}