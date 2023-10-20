const CLASSE_X = "x";
const CLASSE_CIRCULO = "circulo";
const COMBINACOES_VITORIA = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const casas = document.querySelectorAll("[data-casa]");
const tabuleiro = document.getElementById("tabuleiro");
const mensagemVitoria = document.getElementById("mensagemVitoria");
const mensagemVitoriaTexto = document.querySelector("[data-mensagem-vitoria-text]");
const botaoReiniciar = document.getElementById("botaoReiniciar");
const botaoJogarNovamente = document.getElementById("botaoJogarNovamente");
const pontuacaoXTexto = document.getElementById("pontuacaoX");
const pontuacaoOTexto = document.getElementById("pontuacaoO");

let turnoCirculo;
let pontuacaoX = 0,
    pontuacaoO = 0;
iniciarJogo();

botaoReiniciar.addEventListener("click", iniciarJogo);
botaoJogarNovamente.addEventListener("click", jogarNovamente);

function iniciarJogo() {
    turnoCirculo = false;
    definirClasseBordaHover();
    casas.forEach((casa) => {
        casa.classList.remove(CLASSE_X);
        casa.classList.remove(CLASSE_CIRCULO);
        casa.removeEventListener("click", lidarComClique);
        casa.addEventListener("click", lidarComClique, { once: true });
    });
    mensagemVitoria.classList.remove("show");
    botaoReiniciar.style.display = "block";
    botaoJogarNovamente.style.display = "none";
    pontuacaoXTexto.textContent = pontuacaoX;
    pontuacaoOTexto.textContent = pontuacaoO;
}

function jogarNovamente() {
    iniciarJogo();
}

function lidarComClique(e) {
    const casa = e.target;
    const classeAtual = turnoCirculo ? CLASSE_CIRCULO : CLASSE_X;

    colocarMarca(casa, classeAtual);
    if (verificarVitoria(classeAtual)) {
        finalizarJogo(false);
    } else if (verificarEmpate()) {
        finalizarJogo(true);
    } else {
        trocarTurno();
        definirClasseBordaHover();
    }
}

function colocarMarca(casa, classeAtual) {
    casa.classList.add(classeAtual);
}

function trocarTurno() {
    turnoCirculo = !turnoCirculo;
}

function definirClasseBordaHover() {
    tabuleiro.classList.remove(CLASSE_CIRCULO);
    tabuleiro.classList.remove(CLASSE_X);

    if (turnoCirculo) tabuleiro.classList.add(CLASSE_CIRCULO);
    else tabuleiro.classList.add(CLASSE_X);
}

function verificarVitoria(classeAtual) {
    return COMBINACOES_VITORIA.some((combinacao) => {
        return combinacao.every((indice) => {
            return casas[indice].classList.contains(classeAtual);
        });
    });
}

function finalizarJogo(empate) {
    if (empate) {
        mensagemVitoriaTexto.textContent = "O jogo terminou sem vencedor!";
    } else {
        mensagemVitoriaTexto.textContent = `${turnoCirculo ? "O" : "X"} é o vencedor!`;
        if (turnoCirculo) {
            pontuacaoO++;
        } else {
            pontuacaoX++;
        }
    }

    mensagemVitoria.classList.add("show");
    botaoReiniciar.style.display = "none";
    botaoJogarNovamente.style.display = "block";
}

function verificarEmpate() {
    return [...casas].every((casa) => {
        return (
            casa.classList.contains(CLASSE_X) || casa.classList.contains(CLASSE_CIRCULO)
        );
    });
}
