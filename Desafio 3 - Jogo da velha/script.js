let pos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let posic = localStorage.getItem("posic") ? localStorage.getItem("posic") : 0;
let i = 0;
let vez = localStorage.getItem("vez") ? localStorage.getItem("vez") : 2;
let x = 0;
let jogadas = localStorage.getItem("jogad") ? localStorage.getItem("jogad") : 0;
let aux;
let fim;
let jogador1 = localStorage.getItem("jogador1");
let jogador2 = localStorage.getItem("jogador2");
let melhorDe = localStorage.getItem("melhorDe")
  ? localStorage.getItem("melhorDe")
  : 1;
let vitoriasX = localStorage.getItem("vitoriasX")
  ? parseInt(localStorage.getItem("vitoriasX"))
  : 0;
let vitoriasO = localStorage.getItem("vitoriasO")
  ? parseInt(localStorage.getItem("vitoriasO"))
  : 0;
let partida = localStorage.getItem("partida")
  ? parseInt(localStorage.getItem("partida"))
  : 0;
let partidas = vitoriasO + vitoriasX;
let vezInicial = 0;

function jogo() {
  iniciar();
  $(".box").each(function () {
    $(this).on("click", function (e) {
      partida++;
      localStorage.setItem("partida", partida);
      if (vez == 2 || (localStorage.getItem(vez) == 2)) {
        $(this).html("X");
        pos[$(this).attr("id")] = "X";
        localStorage.setItem("posic", pos);
        $(this).css({
        "background" : "#5d8aa8", "color": "black" 
          ,"font-size" : "10em", "pointer-events": "none"
        });

        jogadas++;
        localStorage.setItem("jogad", jogadas);
        if (jogadas === 1) {
          vezInicial = 2;
        }
        vez = 1;
        localStorage.setItem("vez", vez);
      } else if (vez == 1 || (localStorage.getItem(vez) == 1)){
        $(this).html("O");
        pos[$(this).attr("id")] = "O";
        localStorage.setItem("posic", pos);
        $(this).css({
          "background": "#708090","color": "black" 
          ,"font-size" : "10em", "pointer-events": "none"
        });

        jogadas++;
        localStorage.setItem("jogad", jogadas);
        if (jogadas === 1) {
          vezInicial = 1;
        }
        vez = 2;
        localStorage.setItem("vez", vez);
      }
      //linha
      if (pos[0] === pos[1] && pos[0] === pos[2]) {
        venceu(0, 1, 2);
      } else if (pos[3] === pos[4] && pos[3] === pos[5]) {
        venceu(3, 4, 5);
      } else if (pos[6] === pos[7] && pos[6] === pos[8]) {
        venceu(6, 7, 8);
      }

      //coluna
      else if (pos[0] === pos[3] && pos[0] === pos[6]) {
        venceu(0, 3, 6);
      } else if (pos[1] === pos[4] && pos[1] === pos[7]) {
        venceu(1, 4, 7);
      } else if (pos[2] === pos[5] && pos[2] === pos[8]) {
        venceu(2, 5, 8);
      }

      //diagonal
      else if (pos[0] === pos[4] && pos[0] === pos[8]) {
        venceu(0, 4, 8);
      } else if (pos[2] === pos[4] && pos[2] === pos[6]) {
        venceu(2, 4, 6);
      }

      //maximo de jogadas
      else if (jogadas === 9) {
        $(".nomeJogador1, .nomeJogador2").css({ color: "yellow", "font-size": "3em" });

        if (vez === 2) {
          vez = 1;
        } else {
          vez = 2;
        }

        setTimeout(() => {
          reiniciar();
        }, 2000);

        setTimeout(() => {
          jogo();
        }, 2001);
      }
    });
  });
  partida = 0;
  localStorage.setItem("partida", partida);
}

function iniciar() {
  if (posic === 0) {
    pos.forEach((posicao) => {
      $(".tabuleiro").append(`<div id="${i}" class="box"></div>`);
      i++;
    });
  } else {
    posic = posic.replaceAll(",", "");
    pos.forEach((posicao) => {
      $(".tabuleiro").append(`<div id="${i}" class="box"></div>`);
      if (posic[i] == "X") {
        pos[i] = "X";
        $("#" + i).html("X").css({
          "background": "#5d8aa8",
          "color": "black",
          "font-size": "10em",
          "pointer-events": "none",  
          "cursor" : "not-allowed"
        }).click(); 
      } else if (posic[i] == "O") {
        pos[i] = "O";
        $("#" + i).html("O").css({
          "background": "#708090",
          "color": "black",
          "font-size": "10em",
          "pointer-events": "none", 
          "cursor" : "not-allowed"
        }).click();
      }
      i++;
    });
  }


  jogadores();
  $(".nomeJogador1, .nomeJogador2").css({ color: "black", "font-size": "3em" });
  $(".nomeJogador1").text(jogador1);
  $(".nomeJogador2").text(jogador2);
  $(".pont1").text(vitoriasX);
  $(".pont2").text(vitoriasO);
}

function reiniciar() {
  $(".tabuleiro").remove();
  $("body").append(`<div class="tabuleiro"></div>`);

  pos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  i = 0;
  jogadas = 0;
  localStorage.setItem("jogad", jogadas);
  posic = 0;
}

function reiniciarTabuleiro() {
  $(".tabuleiro").remove();
  $("body").append(`<div class="tabuleiro"></div>`);

  pos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  i = 0;
  jogadas = 0;
  localStorage.setItem("jogad", jogadas);
  posic = 0;
  if (vezInicial === 2) {
    vez = 2;
  } else {
    vez = 1;
  }
  vezInicial = 0;
}

function jogadores() {
  if (
    (jogador1 === "" && jogador2 === "") ||
    (jogador1 === null && jogador2 === null)
  ) {
    jogador1 = $("#jogador1").val()
      ? $("#jogador1").val()
      : localStorage.getItem(jogador1);
    jogador2 = $("#jogador2").val()
      ? $("#jogador2").val()
      : localStorage.getItem(jogador2);
  }
  if (jogador1 === jogador2) {
    $(".box, #resetJogo, #resetTabuleiro").css({
      "display": "none"
    });
    $("#mensagem").css("display", "flex");
    $("#jogador1").val("");
    $("#jogador2").val("");
    jogador1 = "";
    jogador2 = "";
  }
  if (jogador1 !== "" && jogador2 !== "") {
    $(".box, #resetJogo, #resetTabuleiro").css({
      "display": "flex"
    });
    $(".jogadores").css("display", "none");
    $(".nomeJogador1").text(jogador1);
    $(".nomeJogador2").text(jogador2);
    $(".box").css({
      "font-size": "10em"
    });
    $(".pont1").css("display", "inline");
    $(".pont2").css("display", "inline");
    $("#resetJogo").css({ "cursor" : "pointer", "pointer-events": "all" });
    $("#resetTabuleiro").css({ "cursor" : "pointer", "pointer-events": "all" });
  }
  localStorage.setItem("jogador1", jogador1);
  localStorage.setItem("jogador2", jogador2);
}

//selecionar melhor de 1, 3 ou 5.
$("#md1").on("click", function () {
  melhorDe = 1;
  localStorage.setItem("melhorDe", melhorDe);
  $("#md1").css({ background: "rgb(59, 113, 122)" });
  $("#md3, #md5").css({ background: "rgb(93, 185, 201)" });
});

$("#md3").on("click", function () {
  melhorDe = 3;
  localStorage.setItem("melhorDe", melhorDe);
  $("#md3").css({ background: "rgb(59, 113, 122)" });
  $("#md1, #md5").css({ background: "rgb(93, 185, 201)" });
});

$("#md5").on("click", function () {
  melhorDe = 5;
  localStorage.setItem("melhorDe", melhorDe);
  $("#md5").css({ background: "rgb(59, 113, 122)" });
  $("#md1, #md3").css({ background: "rgb(93, 185, 201)" });
});

function venceu(a, b, c) {
  $("#" + a +', #' + b + ', #' + c).css({
    background: "green",
    "text-decoration": "line-through",
    "text-decoration-thickness": "5px",
  });
  $(".box").css({
    "font-size": "10em",
    "pointer-events": "none",
    "user-select": "none",
  });
  if (vez === 1) {
    vitoriasX++;
    partida = 0;
    $(".nomeJogador1").css({ color: "green", "font-size": "4em" });
    $(".nomeJogador2").css({ color: "red", "font-size": "2em" });
    localStorage.setItem("vitoriasX", vitoriasX);
    $(".pont1").text(vitoriasX);
    pos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    localStorage.setItem("posic", pos);
  } else {
    vitoriasO++;
    partida = 0;
    $(".nomeJogador1").css({ color: "red", "font-size": "2em" });
    $(".nomeJogador2").css({ color: "green", "font-size": "4em" });
    localStorage.setItem("vitoriasO", vitoriasO);
    $(".pont2").text(vitoriasO);
    pos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    localStorage.setItem("posic", pos);
  }

  vencedor();
  if (fim === 0) {
    setTimeout(() => {
      reiniciar();
    }, 2000);

    setTimeout(() => {
      jogo();
    }, 2001);
  }
}

function removerTudo() {
  $(".tabuleiro").remove();
  $(".nomeJogador1").remove();
  $(".nomeJogador2").remove();
  $(".pont1").remove();
  $(".pont2").remove();
  $("#resetTabuleiro").remove();
}

function vencedor() {
  if (vitoriasX === parseInt((melhorDe / 2) + 1)) {
    localStorage.clear();
    setTimeout(() => {
      removerTudo();
      $("#repetir").text("NOVO JOGO");
      $("#vitoria").text("O Jogador " + jogador1 + " venceu!!");
      $("#vitoria").css({
        color: "green",
        position: "absolute",
        top: "35%",
      });
    }, 1500);
    fim = 1;
  } else if (vitoriasO === parseInt((melhorDe / 2) + 1)) {
    localStorage.clear();
    setTimeout(() => {
      removerTudo();
      $("#resetTabuleiro").remove();
      $("#repetir").text("NOVO JOGO");
      $("#vitoria").text("O Jogador " + jogador2 + " venceu!!");
      $("#vitoria").css({
        color: "green",
        position: "absolute",
        top: "35%",
      });
    }, 1500);
    fim = 1;
  } else {
    fim = 0;
  }
}

//Jogo
setTimeout(() => {
  jogo();
}, 0);

// reset
$("#resetTabuleiro").on("click", function () {
  reiniciarTabuleiro();
  jogo();
});
$("#resetJogo").on("click", function () {
  location.reload();
  localStorage.clear();
});
