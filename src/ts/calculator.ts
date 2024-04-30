// arquivo que vai calcular de fato

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita que o Enter insira uma nova linha
    }
});