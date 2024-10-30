import { dados } from './dados.js';

let nome;
let cidade;
let dataini;
let datafim;;
let ordem = 2;
let quant = 0;
let resultado = [];
let pag = [{}];
let p;
let dez = 0;
let s = 1;
let d = 10;
datas();

function datas(){
  $('#dataIni').mask('0000-00-00');
  $('#dataFim').mask('0000-00-00');
}

$("#busca").on("click", function () {
  s = 1;
  d = 10;
  $(".navg").css("display" , "flex");
  $("#add").css("width" , "50px");
  $("#anterior").css("display" , "none");
  $("#proximo").css("display" , "flex");
  resultado = [];
  separaPag(0, 50);
  trocaPag(s, d);
  gera(s, d);
  $("#add").text(s + "-" + d);
});

function separaPag(l, v) {
  dez = 0;
  quant = 0;
  limpaTab();
  buscaEstagiario();

  for (p = l; p < dados.length; p++) {
    pag[p] = dados[p];
    Object.assign({}, pag);
  }

  for (p = l; p < v; p++) {
    if ((nome === '' || nome === pag[p].Nome) && (cidade === '' || cidade === pag[p].Cidade)
      && (dataini === '' || dataini === pag[p].DataInicio) && (datafim === '' || datafim === pag[p].DataFim)) {
      quant++;
      resultado[quant] = pag[p];
      $("#encontrado").css("display", "none");
      $(".containe").css("height" , "80vh");
      $(".tabelaResult").css("height" , "35vh");
    }
  }
  if (quant === 0) {
    $("#encontrado").css("display", "block");
    $(".containe").css("height" , "45vh");
    $(".tabelaResult").css("height" , "10vh");
  }
  gera();
  ordem = 2;
}

function gera(h, j) {
  dez = 0;
  quant = 0;
  limpaTab();
  buscaEstagiario();
  for (let o = h; o < resultado.length; o++) {
    if ((ordem === 1 && o <= j)) {
      $('#tab').append(`<td >${resultado[o].Codigo}</td>
       <td >${resultado[o].Nome}</td>
       <td >${resultado[o].Cidade}</td>
       <td >${resultado[o].DataInicio}</td>
       <td >${resultado[o].DataFim}</td>
       <td >${resultado[o].Cargo}</td>
       <td >${resultado[o].Responsavel}</td>
       <td >${resultado[o].Efetivo}</td>`);
      ordem = 2;
    } else if ((ordem === 2 && o <= j)) {
      $('#tab').append(`<th >${resultado[o].Codigo}</th>
       <th >${resultado[o].Nome}</th>
       <th >${resultado[o].Cidade}</th>
       <th >${resultado[o].DataInicio}</th>
       <th >${resultado[o].DataFim}</th>
       <th >${resultado[o].Cargo}</th>
       <th >${resultado[o].Responsavel}</th>
       <th >${resultado[o].Efetivo}</th>`);
      ordem = 1;
    }
  }
  ordem = 2;
  if (resultado.length < 10) {
    $('.navg').css("display", "none");
  } else {
    $('.navg').css("display", "flex");
  }
}

$("#limpa").on("click", function () {
  function limpaInputs() {
    $("input[data-name='entrada']").val('');
    $("select").val('');
  }
  limpaInputs();
});

function buscaEstagiario() {
  nome = $("#nomeEstagiario").val();
  cidade = $("#cidadeEstagiario").val();
  dataini = $('#dataIni').val();
  datafim =   $('#dataFim').val();
  $('#proximo').css({ "pointer-events": "all" });
}

function limpaTab() {
  $("#tab").remove();
  $(".tabelaResult").append(`<table id="tab"></table>`);
}

function trocaPag(s, d) {
  if (d <= pag.length) {
    $('#proximo').on("click", function () {
      if(d >= resultado.length - 11){
        $("#proximo").css("display" , "none");
        $("#add").css("margin-left" , "24px");
      }
      $('#anterior').css({"display" : "flex"});
      limpaTab();
      if (d === resultado.length) {
        d = d;
        $("#add").text(s+1 + "-" + d);
        gera(s + 1, d)
      }
      else if (d < resultado.length ) {
        d += 10;
        s = d - 10;
        $("#add").text(s+1 + "-" + d);
        gera(s + 1, d);
        if (d >= resultado.length) {
          limpaTab();
          d = resultado.length - 1;
          if(s === d ){
            s = s - 10;
          }else{
            s = s;
          }
          $("#add").text(s+1 + "-" + d);
          gera(s + 1, d)
        }
      }
    }
    )
  }

  if (s >= 0) {
    $('#anterior').on("click", function () {
      if(s <= 11){
        $("#anterior").css("display" , "none");
        $("#add").css("margin-left" , "24px");
      }
      $("#add").css("margin-left" , "0px");
      limpaTab();
      $("#proximo").css("display" , "flex")
      $("#add").css("width" , "50px");
      if (s === 0 || s < 0) {
        s === 0;
        d === 10;
        $("#add").text(s+1 + "-" + d);
        gera(s + 1, d)
      } else if( d % 10 == 0) {
        s -= 10;
        d -= 10;
        $("#add").text(s+1 + "-" + d);
        gera(s + 1, d);
      } else {
        s = 0;
        d = 10;
        $("#add").text(s+1 + "-" + d);
        gera(s + 1, d);   
      }
    });
  }
}
