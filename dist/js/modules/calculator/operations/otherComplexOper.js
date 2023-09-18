"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raise = exports.squareRoot = exports.mod = void 0;
function mod(x, y) {
    return x % y;
}
exports.mod = mod;
function squareRoot(x) {
    if (x < 0) {
        throw new Error("Não é possível calcular a raiz quadrada de números negativos.");
    }
    return Math.sqrt(x);
}
exports.squareRoot = squareRoot;
function raise(base, ex) {
    if (ex === 0) {
        return 1;
    }
    else if (ex === 1) {
        return base;
    }
    let res = 1;
    for (let i = 0; i < ex; i++) {
        res *= base;
    }
    return res;
}
exports.raise = raise;
