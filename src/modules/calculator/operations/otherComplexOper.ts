/* funções mais complexas, como operações com números complexos, funções especiais, logaritmo natural, parte real, parte imaginária, função f(x), etc */

export function mod(x:number, y:number):number{
    return x % y
}

export function squareRoot(x: number): number {
    if (x < 0) {
        throw new Error("Não é possível calcular a raiz quadrada de números negativos.");
    }
    return Math.sqrt(x);
}

export function raise(base: number, ex:number): number {
    if (ex === 0) {
        return 1
    } else if (ex === 1) {
        return base;
    }

    let res = 1

    for(let i = 0; i < ex; i++) {
        res *= base
    }

    return res
}