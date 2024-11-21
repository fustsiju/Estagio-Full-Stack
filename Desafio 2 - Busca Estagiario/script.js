import { dados } from "./dados.js";

let nome;
let cidade;
let inicial;
let final;
let quant = 0;
let resultado = [];
let pag = [{}];
let minimo = 1;
let maximo = 10;
let naoEncontrado = `<tr><td colspan="8" style="text-align: center;">Nenhum Estagiário Encontrado.</td></tr>`;
$("#dataIni").mask("00/00/0000");
$("#dataFim").mask("00/00/0000");
$("tbody").append(naoEncontrado);

function converterEntradas() {
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
  converterEntradas();
  buscaEstagiario();
  trocaPag(minimo, maximo);
  geraTabela(minimo, maximo);
  $("#add").text(minimo + "-" + maximo);
});

function buscaEstagiario() {
  quant = 0;
  $("tbody").empty();
  pegaValorInputs();
  for (let p = 0; p < dados.length; p++) {
    pag[p] = dados[p];
    pag[p].DataInicio = pag[p].DataInicio.split("-").reverse().join("/");
    pag[p].DataFim = pag[p].DataFim.split("-").reverse().join("/");
    if (
      (nome === "" || nome === pag[p].Nome) &&
      (cidade === "" || cidade === pag[p].Cidade) &&
      (inicial === "" || inicial === pag[p].DataInicio.split("-").reverse().join("/")) &&
      (final === "" || final === pag[p].DataFim.split("-").reverse().join("/"))
    ) {
      quant++;
      resultado[quant] = pag[p];
    }
  }
}

function geraTabela(min, max) {
  quant = 0;
  $("tbody").empty();
  pegaValorInputs();

  if (resultado.length === 0) {
    $("tbody").append(naoEncontrado);
    return;
  }

  for (let o = min; o < resultado.length; o++) {
    if (o <= max) {
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

}

function pegaValorInputs() {
  nome = $("#nomeEstagiario").val();
  cidade = $("#cidadeEstagiario").val();
  inicial = $("#dataIni").val();
  final = $("#dataFim").val();
  $("#proximo").css({ "pointer-events": "all" });
}

function trocaPag(minimo, maximo) {
  if (maximo <= pag.length) {
    $("#proximo").on("click", function () {
      if (maximo >= resultado.length - 11) {
        $("#proximo").css("display", "none");
        $("#add").css("margin-left", "24px");
      }
      $("#anterior").css({ display: "flex" });
      $("tbody").empty();
      if (maximo === resultado.length) {
        $("#add").text(minimo + 1 + "-" + maximo);
        geraTabela(minimo + 1, maximo);
      } else if (maximo < resultado.length) {
        maximo += 10;
        minimo = maximo - 10;
        $("#add").text(minimo + 1 + "-" + maximo);
        geraTabela(minimo + 1, maximo);
        if (maximo >= resultado.length) {
          $("tbody").empty();
          maximo = resultado.length - 1;
          if (minimo === maximo) {
            minimo = minimo - 10;
          } else {
            minimo = minimo;
          }
          $("#add").text(minimo + 1 + "-" + maximo);
          geraTabela(minimo + 1, maximo);
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
      $("tbody").empty();
      $("#proximo").css("display", "flex");
      $("#add").css("width", "50px");
      if (minimo === 0 || minimo < 0) {
        minimo === 0;
        maximo === 10;
        $("#add").text(minimo + 1 + "-" + maximo);
        geraTabela(minimo + 1, maximo);
      } else if (maximo % 10 == 0) {
        minimo -= 10;
        maximo -= 10;
        $("#add").text(minimo + 1 + "-" + maximo);
        geraTabela(minimo + 1, maximo);
      } else {
        minimo = 0;
        maximo = 10;
        $("#add").text(minimo + 1 + "-" + maximo);
        geraTabela(minimo + 1, maximo);
      }
    });
  }
}
