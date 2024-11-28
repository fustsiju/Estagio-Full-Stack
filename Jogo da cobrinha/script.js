let cobra = [
  { x: 150, y: 150 },
  { x: 120, y: 150 }, 
  { x: 90, y: 150 }, 
];
let posicaoX = 0;
let posicaoY = 0;
const velocidade = 30;
let direcao = "direita";
let anguloAtual = 0;
let posicaoComidaX = 0;
let posicaoComidaY = 0; 
let pontuacaoComida = 0;
let emJogo = 0;
let attPosicao;
let attComida;
let widTam = 90;
let rabo = [{}];
let tempoProximaTecla = 200;
let tempo = 0;
let ultimaTecla = 0;
const intervaloMinimo = 70;

function menu() {
  $(".container").append(
    "<img src='./img/cobrinha.png' height='300px'><h1>ESPAÇO PARA INICIAR O JOGO</h1>"
  );
  $("#pontComida").remove();
  $(".comida").remove();
  $(".cobra").remove();
  $("#cobrinha").remove();
  document.addEventListener("keydown", function (event) {
    
    if (event.keyCode == 32 && emJogo === 0) {
      $(".container").css({
        display: "grid",
        "grid-template-rows": "repeat(20,auto)",
        "grid-template-columns": "repeat(20, auto)",
      });
      $(".container").append(
        "<div class='pontuacao' id='pontComida'>0</div> <div class='cobra'  ><div class='cabeca' id='cobrinha'></div></div>"
      );
      $("img").remove();
      $("h1").remove();
      emJogo = 1;
      
      movimentacao();
      geraComida();
      attPosicao = setInterval(atualizarPosicao, 100);
      attComida = setInterval(comeuComida, 1);
    }
  });
}

function movimentacao() {
  document.addEventListener("keydown", function (event) {
    let tempoAtual = new Date().getTime();

    if (tempoAtual - ultimaTecla > intervaloMinimo) {
      if (event.key === "ArrowRight" && direcao !== "esquerda") {
        direcao = "direita";
        anguloAtual = 0;
      } else if (event.key === "ArrowDown" && direcao !== "cima") {
        direcao = "baixo";
        anguloAtual = 90;
      } else if (event.key === "ArrowLeft" && direcao !== "direita") {
        direcao = "esquerda";
        anguloAtual = 180;
      } else if (event.key === "ArrowUp" && direcao !== "baixo") {
        direcao = "cima";
        anguloAtual = -90;
      }

      $("#cobrinha").css({
        transform: `rotate(${anguloAtual}deg)`,
      });
      ultimaTecla = tempoAtual;
    }
  });
}

function reiniciar() {
  clearInterval(attComida);
  clearInterval(attPosicao);
  emJogo = 0;
  posicaoX = 150;
  posicaoY = 150;
  direcao = "direita";
  cobra = [
    { x: 150, y: 150 },
    { x: 120, y: 150 }, 
    { x: 90, y: 150 }, 
  ];
  pontuacaoComida = 0;
  menu();
}

function atualizarPosicao() {
  let novaPosicao = { ...cobra[0] };

  if (direcao === "direita") {
    novaPosicao.x += velocidade;
  }
  if (direcao === "baixo") {
    novaPosicao.y += velocidade;
  }
  if (direcao === "esquerda") {
    novaPosicao.x -= velocidade;
  }
  if (direcao === "cima") {
    novaPosicao.y -= velocidade;
  }

  cobra.unshift(novaPosicao);
  cobra.pop();

  $(".cobra").empty();
  cobra.forEach((segmento, index) => {
    $(".cobra").append(`<div class='rabo'></div>`);
    $(".cobra div:last-child").css({
      left: `${segmento.x}px`,
      top: `${segmento.y}px`,
    });

    $(".cobra div:first-child").css({
      background: "green",
      "z-index": "1",
    });

    if (index !== 0 && cobra[0].x === segmento.x && cobra[0].y === segmento.y) {
      reiniciar();
    }
  });

  if (
    novaPosicao.x >= 600 ||
    novaPosicao.y >= 600 ||
    novaPosicao.x < 0 ||
    novaPosicao.y < 0
  ) {
    reiniciar();
  }
}

function inteiroRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function geraComida() {
  let comidaValida = false;
  while (!comidaValida) {

    posicaoComidaX = inteiroRandom(1, 19) * 30;
    posicaoComidaY = inteiroRandom(1, 19) * 30;

    comidaValida = !cobra.some(
      (segmento) => segmento.x === posicaoComidaX && segmento.y === posicaoComidaY
    );
  }

  $(".container").append("<div class='comida'></div>");
  $(".comida").css({
    top: `${posicaoComidaY}px`,
    left: `${posicaoComidaX}px`,
  });
}


function comeuComida() {
  let cabeca = cobra[0];
  if (
    (cabeca.x === posicaoComidaX && cabeca.y === posicaoComidaY) ||
    (cabeca.y === posicaoComidaX && cabeca.x === posicaoComidaY)
  ) {
    tamanhoCorpo();
    cobra.push({ ...cobra[cobra.length - 1] });
    pontuacaoComida += 1;
    $(".comida").remove();
    geraComida();
    $("#pontComida").text(pontuacaoComida);
  } else if (
    (segmento.x === posicaoComidaX && segmento.y === posicaoComidaY) ||
    (segmento.y === posicaoComidaX && segmento.x === posicaoComidaY) 
  ) {
    geraComida();
  }
}

function tamanhoCorpo() {
  widTam += 30;
  $(".cobra").css("width", `${widTam}px`);
}

menu();
