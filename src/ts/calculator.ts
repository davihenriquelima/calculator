// arquivo que vai calcular de fato

/* const handleCalc() = () => {}

}
*/
input.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'enter') {
        event.preventDefault(); // Evita que o Enter insira uma nova linha
    }
});