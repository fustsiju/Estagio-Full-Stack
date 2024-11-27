import { dados } from "./dados.js";

let nome;
let cidade;
let inicial;
let final;
let quant = 0;
let resultado = [];
let pag = [{}];
let minimo = 0;
let maximo = 10;
let paginas = [];
let qtdPagina = 0;
let paginaAtual = 1;
let paginacaoInicial = 0;
let paginacaoFinal = 1;
let naoEncontrado = `<tr><td colspan="8" style="text-align: center;">Nenhum Estagiário Encontrado.</td></tr>`;
$("#dataIni").mask("00/00/0000");
$("#dataFim").mask("00/00/0000");
$("tbody").append(naoEncontrado);

function converterEntradas() {
  inicial = $("#dataIni").val().split("/").reverse().join("-");
  final = $("#dataFim").val().split("/").reverse().join("-");
}

$("#busca").on("click", function () {
  minimo = 0;
  maximo = 10;
  qtdPagina = 0;
  paginas = [];
  quant = 0;
  resultado = [];
  paginacaoInicial = 0;
  paginacaoFinal = 1;

  $("tbody").remove();
  $("table").append("<tbody></tbody>");
  $("tbody").append(naoEncontrado);
  $("#proximo").css({
    display: "flex",
    color: "black",
    "pointer-events": "all",
  });
  $(".navg").css("display", "flex");
  $("#add").css("width", "50px");
  $("#anterior").css("display", "none");
  $("#proximo").css("display", "flex");
  $("#add").text(paginacaoInicial * 10 + 1 + "-" + paginacaoFinal * 10);
  converterEntradas();
  buscaEstagiario();
  trocaPag();
  console.log(paginas);
});

function numerosPaginacao() {
  $("#add").text(paginacaoInicial * 10 + 1 + "-" + paginacaoFinal * 10);
  if (paginaAtual === qtdPagina) {
    $("#add").text(paginacaoInicial * 10 + 1 + "-" + quant);
  }
}

function buscaEstagiario() {
  $("tbody").empty();
  pegaValorInputs();
  for (let p = 0; p < dados.length; p++) {
    pag[p] = dados[p];
    pag[p].DataInicio = pag[p].DataInicio.split("-").reverse().join("/");
    pag[p].DataFim = pag[p].DataFim.split("-").reverse().join("/");
    if (
      (nome === "" ||
        nome === pag[p].Nome.toLowerCase() ||
        pag[p].Nome.toLowerCase().includes(nome)) &&
      (cidade === "" || cidade === pag[p].Cidade) &&
      (inicial === "" ||
        inicial === pag[p].DataInicio ||
        pag[p].DataInicio.includes(inicial)) &&
      (final === "" || final === pag[p].DataFim.split("-").reverse().join("/"))
    ) {
      resultado[quant] = pag[p];
      quant++;
      if (quant % 10 === 0) {
        paginas[qtdPagina] = resultado.slice(minimo, maximo);
        minimo += 10;
        maximo += 10;
        qtdPagina++;
      }
    }
  }

  if (maximo > quant) {
    maximo = quant;
    paginas[qtdPagina] = resultado.slice(minimo, maximo);
  }
  if (quant <= 10) {
    $(".navg").css("display", "none");
  }
}

function geraTabela(lista) {
  $("tbody").empty();
  pegaValorInputs();
  if (resultado.length === 0) {
    $("tbody").append(naoEncontrado);
    return;
  }

  paginas[lista].forEach((item) => {
    $("tbody").append(`<tr>
      <td>${item.Codigo}</td>
      <td>${item.Nome}</td>
      <td>${item.Cidade}</td>
      <td>${item.DataInicio}</td>
      <td>${item.DataFim}</td>
      <td>${item.Cargo}</td>
      <td>${item.Responsavel}</td>
      <td>${item.Efetivo}</td>
    </tr>`);
  });
}

if (resultado.length < 10) {
  $(".navg").css("display", "none");
} else {
  $(".navg").css("display", "flex");
}

function pegaValorInputs() {
  nome = $("#nomeEstagiario").val().toLowerCase();
  cidade = $("#cidadeEstagiario").val();
  inicial = $("#dataIni").val();
  final = $("#dataFim").val();
  $("#proximo").css({ "pointer-events": "all" });
}

function trocaPag() {
  paginaAtual = 0;
  geraTabela(0);
  $("#proximo")
    .off("click")
    .on("click", function () {
      paginacaoInicial++;
      paginacaoFinal++;
      if (paginaAtual <= qtdPagina - 1) {
        paginaAtual++;
        geraTabela(paginaAtual);
        console.log(paginaAtual);
        if (paginaAtual >= qtdPagina - 1) {
          $("#proximo").css({ "pointer-events": "none", color: "white" });
        }
      }
      $("#anterior").css({
        display: "flex",
        color: "black",
        "pointer-events": "all",
      });
      numerosPaginacao();
    });

  $("#anterior")
    .off("click")
    .on("click", function () {
      paginacaoInicial--;
      paginacaoFinal--;
      if (paginaAtual >= 0) {
        paginaAtual--;
        geraTabela(paginaAtual);
        console.log(paginaAtual);
        if (paginaAtual == 0) {
          $("#anterior").css({ "pointer-events": "none", color: "white" });
        }
      }
      $("#proximo").css({
        display: "flex",
        color: "black",
        "pointer-events": "all",
      });
      numerosPaginacao();
    });
  if (quant % 10 !== 0) {
    paginas[qtdPagina] = resultado.slice(minimo, quant);
  }
}
