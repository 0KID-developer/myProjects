// Seleção dos elementos do DOM
const relogio = document.querySelector('.relogio'); // Onde o tempo será exibido
const iniciar = document.querySelector('.iniciar'); // Botão Iniciar
const pausar = document.querySelector('.pausar');   // Botão Pausar
const zerar = document.querySelector('.zerar');     // Botão Zerar

// Variáveis de controle
let segundos = 0; // Contador principal de segundos (começa em 0)
let timer;        // Variável que irá armazenar a referência do setInterval

/**
 * Converte um número total de segundos em uma string de hora (HH:MM:SS).
 * @param {number} segundos - O número total de segundos.
 * @returns {string} A hora formatada.
 */
function criaHoraDosSegundos (segundos) {
    // Cria um objeto Date a partir dos milissegundos.
    // Multiplicamos por 1000 porque o construtor Date espera milissegundos.
    const data = new Date(segundos * 1000);

    // Formata o tempo para 'pt-BR' (opcional), sem hora AM/PM (hour12: false).
    // O timeZone: 'UTC' é fundamental para que a data comece a contar a partir de 00:00:00
    // independentemente do fuso horário local, garantindo que a conversão seja precisa (1 segundo = 1 segundo, 60 segundos = 1 minuto, etc.).
    return data.toLocaleTimeString('pt-BR', {
        hour12: false,
        timeZone: 'UTC'
    });
}

/**
 * Inicia o cronômetro, incrementando a variável 'segundos' a cada 1000ms (1 segundo).
 */
function iniciaRelogio() {
    // Configura um intervalo de repetição
    timer = setInterval(function () {
        segundos++; // Incrementa o contador de segundos
        // Atualiza o HTML do relógio com a hora convertida
        relogio.innerHTML = criaHoraDosSegundos(segundos);
    }, 1000); // Executa a cada 1000 milissegundos
}

// --- Evento de Clique: INICIAR ---
iniciar.addEventListener('click', function(event) {
    // 1. Remove a classe 'pausado' (se estiver presente) para tirar a cor de pausa
    relogio.classList.remove('pausado');

    // 2. Limpa qualquer 'timer' anterior para evitar múltiplos cronômetros rodando
    clearInterval(timer);

    // 3. Inicia o novo cronômetro
    iniciaRelogio();
});

// --- Evento de Clique: PAUSAR ---
pausar.addEventListener('click', function(event) {
    // 1. Para a execução do cronômetro (mantém o valor de 'segundos' atual)
    clearInterval(timer);

    // 2. Adiciona a classe 'pausado' (para estilização, ex: cor vermelha)
    relogio.classList.add('pausado');
});

// --- Evento de Clique: ZERAR ---
zerar.addEventListener('click', function(event) {
    // 1. Para a execução do cronômetro
    clearInterval(timer);

    // 2. Reseta a exibição para '00:00:00'
    relogio.innerHTML = '00:00:00';

    // 3. Reseta a variável de controle dos segundos para 0
    segundos = 0;

    // 4. Remove a classe 'pausado' caso o cronômetro estivesse pausado antes de zerar
    relogio.classList.remove('pausado');
});
