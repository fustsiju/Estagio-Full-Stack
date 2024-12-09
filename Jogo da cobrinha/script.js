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
let attVerificacoes;
let widTam = 90;
let ultimaTecla = 0;
const intervaloMinimo = 70;
let obstaculo = [];
let aumentoVelocidade = 100;
let maximoPontuacao = 25;

function menu() {
  $("img, h1").remove();

  $(".container").append(
    "<img src='./img/cobrinha.png' height='300px'><h1>ESPAÇO PARA INICIAR O JOGO</h1>"
  );

  $("#pontComida, .comida, .cobra, #cobrinha, .obstaculo").remove();

  $(document).on("keydown", function (event) {
    if (event.keyCode == 32 && emJogo === 0) {
      $(".vitoria, h2").remove();
      $(".container")
        .css({
          display: "grid",
          "grid-template-rows": "repeat(20, auto)",
          "grid-template-columns": "repeat(20, auto)",
        })
        .append(
          "<div class='pontuacao' id='pontComida'>0</div> <div class='cobra'><div class='cabeca' id='cobrinha'></div></div>"
        );
      $("img, h1").remove();
      emJogo = 1;
      movimentacao();
      geraObstaculo(3);
      geraComida();

      attPosicao = setInterval(atualizarPosicao, aumentoVelocidade);
      attVerificacoes = setInterval(verificarJogo, aumentoVelocidade);
    }
  });
}

function movimentacao() {
  $(document).on("keydown", function (event) {
    let tempoAtual = new Date().getTime();

    if (tempoAtual - ultimaTecla > intervaloMinimo) {
      if (event.key === "ArrowRight" && direcao !== "esquerda" && emJogo == 1) {
        direcao = "direita";
        anguloAtual = 0;
      } else if (
        event.key === "ArrowDown" &&
        direcao !== "cima" &&
        emJogo == 1
      ) {
        direcao = "baixo";
        anguloAtual = 90;
      } else if (
        event.key === "ArrowLeft" &&
        direcao !== "direita" &&
        emJogo == 1
      ) {
        direcao = "esquerda";
        anguloAtual = 180;
      } else if (
        event.key === "ArrowUp" &&
        direcao !== "baixo" &&
        emJogo == 1
      ) {
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
  clearInterval(attPosicao);
  clearInterval(attVerificacoes);
  aumentoVelocidade = 100;
  emJogo = 0;
  posicaoX = 150;
  posicaoY = 150;
  direcao = "direita";

  cobra = [
    { x: 150, y: 150 },
    { x: 120, y: 150 },
    { x: 90, y: 150 },
  ];
  if (pontuacaoComida != maximoPontuacao) {
    menu();
  }
  pontuacaoComida = 0;
}

function atualizarPosicao() {
  let novaPosicao = { ...cobra[0] };

  switch (direcao) {
    case "direita":
      novaPosicao.x += velocidade;
      break;
    case "baixo":
      novaPosicao.y += velocidade;
      break;
    case "esquerda":
      novaPosicao.x -= velocidade;
      break;
    case "cima":
      novaPosicao.y -= velocidade;
      break;
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
      return;
    } else if (
      novaPosicao.x >= 600 ||
      novaPosicao.y >= 600 ||
      novaPosicao.x < 0 ||
      novaPosicao.y < 0
    ) {
      reiniciar();
    }
  });
}

function inteiroRandomObstaculo(min, max) {
  validacaoX = Math.floor(Math.random() * (max - min + 1) + min) * 30;
  while (validacaoX !== 150) {
    if (validacaoX === 150) {
      validacaoX = Math.floor(Math.random() * (max - min + 1) + min) * 30;
    }
    return validacaoX;
  }
}
function inteiroRandomComida(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min) * 30;
}

function geraPosicao(geraQuant) {
  obstaculo = [];
  for (let h = 0; h < geraQuant; h++) {
    let posicaoUnica = false;
    let posX, posY;
    while (!posicaoUnica) {
      posX = inteiroRandomObstaculo(1, 19);
      posY = inteiroRandomObstaculo(1, 19);
      posicaoUnica =
        !obstaculo.some(
          (posicao) => posicao[0] === posX && posicao[1] === posY
        ) &&
        !obstaculo.some(
          (obstaculoPos) =>
            obstaculoPos[0] === posicaoComidaX &&
            obstaculoPos[1] === posicaoComidaY
        );
    }
    obstaculo.push([posX, posY]);
  }
}

function geraComida() {
  let comidaValida = false;
  while (!comidaValida) {
    posicaoComidaX = inteiroRandomComida(1, 19);
    posicaoComidaY = inteiroRandomComida(1, 19);
    comidaValida =
      !cobra.some(
        (segmento) =>
          segmento.x === posicaoComidaX && segmento.y === posicaoComidaY
      ) &&
      !obstaculo.some(
        (obstaculoPos) =>
          obstaculoPos[0] === posicaoComidaX &&
          obstaculoPos[1] === posicaoComidaY
      );
  }
  $(".container").append("<div class='comida'></div>");
  $(".comida").css({
    top: `${posicaoComidaY}px`,
    left: `${posicaoComidaX}px`,
  });
}

function geraObstaculo(quantObstaculo) {
  geraPosicao(quantObstaculo);

  for (let i = 0; i < quantObstaculo; i++) {
    $(".container").append(`<div class="obstaculo" id="obstaculo-${i}"></div>`);
    $("#obstaculo-" + i).css({
      top: `${obstaculo[i][1]}px`,
      left: `${obstaculo[i][0]}px`,
    });
  }
}

function verificarJogo() {
  bateuObstaculo();
  comeuComida();
  vitoria();
}

function vitoria() {
  if (pontuacaoComida === maximoPontuacao) {
    $("#pontComida, .comida, .cobra, #cobrinha, .obstaculo").remove();
    emJogo = 0;
    reiniciar();
    $(".container").append(
      "<img src='./img/cobrinha.png' height='300px'><h1 id='venceu'>VENCEU!!!</h1><h2>ESPAÇO PARA JOGAR NOVAMENTE</h2>"
    );
  }
  $(".vitoria").on("click", function () {
    reiniciar();
  });
}

function bateuObstaculo() {
  let bateuCabeca = cobra[0];
  obstaculo.forEach((obst) => {
    if (bateuCabeca.x === obst[0] && bateuCabeca.y === obst[1]) {
      reiniciar();
      return;
    }
  });
}

function comeuComida() {
  let cabeca = cobra[0];
  if (cabeca.x === posicaoComidaX && cabeca.y === posicaoComidaY) {
    cobra.push({ ...cobra[cobra.length - 1] });
    pontuacaoComida += 1;
    $(".comida").remove();
    geraComida();
    $("#pontComida").text(pontuacaoComida);
    clearInterval(attPosicao);
    clearInterval(attVerificacoes);
    aumentoVelocidade = aumentoVelocidade - 2;
    attPosicao = setInterval(atualizarPosicao, aumentoVelocidade);
    attVerificacoes = setInterval(verificarJogo, aumentoVelocidade);
  }
}

menu();
