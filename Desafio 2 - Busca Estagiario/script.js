import { dados } from "./dados.js";

let nome;
let cidade;
let inicial;
let final;
let quant = 0;
let resultado = [];
let pag = [{}];
let p;
let minimo = 1;
let maximo = 10;
let naoEncontrado = `<tr><td colspan="8" style="text-align: center;">Nenhum Estagiário Encontrado.</td></tr>`;
$("#dataIni").mask("00/00/0000");
$("#dataFim").mask("00/00/0000");
$("tbody").append(naoEncontrado);

function converter() {
  inicial = $("#dataIni").val().split("/").reverse().join("-");
  final = $("#dataFim").val().split("/").reverse().join("-");
}

$("#busca").on("click", function () {
  minimo = 1;
  maximo = 10;
  $(".navg").css("display", "flex");
  $("#add").css("width", "50px");
  $("#anterior").css("display", "none");
  $("#proximo").css("display", "flex");
  resultado = [];
  converter();
  separaPag(0, dados.length);
  trocaPag(minimo, maximo);
  gera(minimo, maximo);
  $("#add").text(minimo + "-" + maximo);
});

function separaPag(l, v) {
  quant = 0;
  limpaTab();
  buscaEstagiario();
  for (p = l; p < dados.length; p++) {
    pag[p] = dados[p];

    pag[p].DataInicio = pag[p].DataInicio.split("-").reverse().join("/");
    pag[p].DataFim = pag[p].DataFim.split("-").reverse().join("/");
  }
  for (p = l; p < v; p++) {
    if (
      (nome === "" || nome === pag[p].Nome) &&
      (cidade === "" || cidade === pag[p].Cidade) &&
      (inicial === "" || inicial === pag[p].DataInicio) &&
      (final === "" || final === pag[p].DataFim)
    ) {
      quant++;
      resultado[quant] = pag[p];
    }
  }
}

function gera(h, j) {
  quant = 0;
  limpaTab();
  buscaEstagiario();
  for (let o = h; o < resultado.length; o++) {
    if (o <= j) {
      $("tbody").append(`<tr><td >${resultado[o].Codigo}</td>
       <td >${resultado[o].Nome}</td>
       <td >${resultado[o].Cidade}</td>
       <td >${resultado[o].DataInicio}</td>
       <td >${resultado[o].DataFim}</td>
       <td >${resultado[o].Cargo}</td>
       <td >${resultado[o].Responsavel}</td>
       <td >${resultado[o].Efetivo}</td></tr>`);
    }
  }
  if (resultado.length < 10) {
    $(".navg").css("display", "none");
  } else {
    $(".navg").css("display", "flex");
  }
  if (resultado.length === 0) {
    $("tbody").append(naoEncontrado);
  }
}

$("#limpa").on("click", function () {
  function limpaInputs() {
    $("input[data-name='entrada']").val("");
    $("select").val("");
  }
  limpaInputs();
});

function buscaEstagiario() {
  nome = $("#nomeEstagiario").val();
  cidade = $("#cidadeEstagiario").val();
  dataini = $("#dataIni").val();
  datafim = $("#dataFim").val();
  $("#proximo").css({ "pointer-events": "all" });
}

function limpaTab() {
  $("tbody").empty();
}

function trocaPag(minimo, maximo) {
  if (maximo <= pag.length) {
    $("#proximo").on("click", function () {
      if (maximo >= resultado.length - 11) {
        $("#proximo").css("display", "none");
        $("#add").css("margin-left", "24px");
      }
      $("#anterior").css({ display: "flex" });
      limpaTab();
      if (maximo === resultado.length) {
        maximo = maximo;
        $("#add").text(minimo + 1 + "-" + maximo);
        gera(minimo + 1, maximo);
      } else if (maximo < resultado.length) {
        maximo += 10;
        minimo = maximo - 10;
        $("#add").text(minimo + 1 + "-" + maximo);
        gera(minimo + 1, maximo);
        if (maximo >= resultado.length) {
          limpaTab();
          maximo = resultado.length - 1;
          if (minimo === maximo) {
            minimo = minimo - 10;
          } else {
            minimo = minimo;
          }
          $("#add").text(minimo + 1 + "-" + maximo);
          gera(minimo + 1, maximo);
        }
      }
    });
  }

  if (minimo >= 0) {
    $("#anterior").on("click", function () {
      if (minimo <= 11) {
        $("#anterior").css("display", "none");
        $("#add").css("margin-left", "24px");
      }
      $("#add").css("margin-left", "0px");
      limpaTab();
      $("#proximo").css("display", "flex");
      $("#add").css("width", "50px");
      if (minimo === 0 || minimo < 0) {
        minimo === 0;
        maximo === 10;
        $("#add").text(minimo + 1 + "-" + maximo);
        gera(minimo + 1, maximo);
      } else if (maximo % 10 == 0) {
        minimo -= 10;
        maximo -= 10;
        $("#add").text(minimo + 1 + "-" + maximo);
        gera(minimo + 1, maximo);
      } else {
        minimo = 0;
        maximo = 10;
        $("#add").text(minimo + 1 + "-" + maximo);
        gera(minimo + 1, maximo);
      }
    });
  }
}
