const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'];

cards.sort(() => 0.5 - Math.random());

var i = 0;
cards.forEach(carta => {
    $('#container').append(`<div id="cart${i++}" class="carta">${carta}</div>`);
});

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

var pontuacao = 0;
var tent = 0;
var seq = 0;
var arr = [];
var id = [];
var corretos = [];

function jogo() {
    document.addEventListener("click", function (event) {
        if ($(event.target).hasClass("carta")) {
            if (arr.length < 2) {
                arr.push(event.target.innerText);
                id.push(event.target.id);

                $('#' + id[0]).css({ 'background': 'white', 'color': 'black' });
                $('#' + id[1]).css({ 'background': 'white', 'color': 'black' });


                if (arr.length === 2) {

                    if (arr[0] == arr[1] && id[0] != id[1]) {
                        corretos.push(id);
                        $("#cond").text("Você acertou, continue assim!!!");
                        $('#' + corretos[pontuacao][0]).css({ 'pointer-events': 'none', 'background': 'rgb(74, 192, 100)' });
                        $('#' + corretos[pontuacao][1]).css({ 'pointer-events': 'none', 'background': 'rgb(74, 192, 100)' });
                        pontuacao++;
                        tent++;
                        seq++;
                        $("#pont").text("Pontuação: " + pontuacao);
                        $("#seq").text("Sequência: " + seq);
                        $("#tent").text("Tentativas: " + tent);
                    }else if(arr[0] == arr[1] && id[0] == id[1]){
                        $('#' + id[0]).css({ 'background': 'yellow', 'color': 'black' });
                        $('#' + id[1]).css({ 'background': 'yellow', 'color': 'black' });
                        $("#cond").text("Não escolha a mesma carta!!!");
                        setTimeout(escondeCartas, 250);
                    } else {
                        $('#' + id[0]).css({ 'background': 'red', 'color': 'black' });
                        $('#' + id[1]).css({ 'background': 'red', 'color': 'black' });
                        tent++;
                        seq = 0;
                        $("#seq").text("Sequência: " + seq);
                        $("#tent").text("Tentativas: " + tent);
                        $("#cond").text("Você errou... Tente novamente");
                        setTimeout(escondeCartas, 250);
                        setTimeout(mantemCorretos,251);
                        
                    }

                    id = [];
                    arr = [];

                    if(tent <= 8){
                        $("#tent").css({
                            'padding':'10px',
                            'background':'rgb(74, 192, 100)',
                            'border-radius': '10px'
                        });
                    }else if(tent > 8 && tent <= 12){
                        $("#tent").css({
                            'padding':'10px',
                            'background':'yellow',
                            'border-radius':'10px'
                        });
                    }else{
                        $("#tent").css({
                            'padding':'10px',
                            'background':'red',
                            'border-radius':'10px',
                        });
                    }
                    
                }
            }
        }
        if (pontuacao == 6 && tent <= 8)  {
            $("#cond").text("Parabéns, que memória excelente!!!");
            $("#vit").text("Jogar novamente");
        }else if (pontuacao == 6 && tent > 8 && tent <= 12){
            $("#cond").text("Parabéns, acertou todos os pares com algumas tentativas!");
            $("#vit").text("Jogar novamente");
        } else{
            $("#cond").text("Que memória ruim, treine mais!!!");
            $("#vit").text("Jogar novamente");
        }
    });
};


function escondeCartas() {
    $(".carta").css({ 'background': '#949278', 'color': 'transparent' });
};

function mantemCorretos() {

    for (var p = 0; p < corretos.length; p++) {
        for (var u = 0; u < corretos.length * 2; u++) {
            $('#' + corretos[p][u]).css({ 'background': 'rgb(74, 192, 100)', 'color': 'black' });
        }
    }

}

//Jogo

setTimeout(escondeCartas, 1000);

jogo();



// reset
$(".reset").on("click", function () {
    location.reload();
});
