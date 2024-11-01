const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'];

cards.sort(() => 0.5 - Math.random());

let i = 0;
cards.forEach(carta => {
    $('#container').append(`<div id="cart${i++}" class="carta">${carta}</div>`);
});

function wait(ms) {
    let start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

let pontuacao = 0;
let tentativa = 0;
let sequencia = 0;
let array = [];
let id = [];
let corretos = [];

function jogo() {
    document.addEventListener("click", function (event) {
        if ($(event.target).hasClass("carta")) {
            if (array.length < 2) {
                array.push(event.target.innerText);
                id.push(event.target.id);

                $('#' + id[0]).css({ 'background': 'white', 'color': 'black' });
                $('#' + id[1]).css({ 'background': 'white', 'color': 'black' });
                
                if (array.length === 2) {
                    tentativa++;
                    if (array[0] == array[1] && id[0] != id[1]) {
                        corretos.push(id);
                        $("#cond").text("Você acertou, continue assim!!!");
                        $('#' + corretos[pontuacao][0]).css({ 'pointer-events': 'none', 'background': 'rgb(74, 192, 100)' });
                        $('#' + corretos[pontuacao][1]).css({ 'pointer-events': 'none', 'background': 'rgb(74, 192, 100)' });
                        pontuacao++;
                        sequencia++;
                        $("#pontuacao").text("Pontuação: " + pontuacao);
                        $("#sequencia").text("Sequência: " + sequencia);
                        $("#tentativa").text("Tentativas: " + tentativa);
                    } else if (array[0] == array[1] && id[0] == id[1]) {
                        $('#' + id[0]).css({ 'background': 'yellow', 'color': 'black' });
                        $("#cond").text("Não escolha a mesma carta!!!");
                        $("#tentativa").text("Tentativas: " + tentativa);
                        setTimeout(escondeCartas, 250);
                        setTimeout(mantemCorretos, 251);
                    } else {
                        $('#' + id[0]).css({ 'background': 'red', 'color': 'black' });
                        $('#' + id[1]).css({ 'background': 'red', 'color': 'black' });
                        sequencia = 0;
                        $("#sequencia").text("Sequência: " + sequencia);
                        $("#tentativa").text("Tentativas: " + tentativa);
                        $("#cond").text("Você errou... Tente novamente");
                        setTimeout(escondeCartas, 250);
                        setTimeout(mantemCorretos, 251);
                    }

                    id = [];
                    array = [];
                    

                    if (tentativa <= 8) {
                        $("#tentativa").css({
                            'padding': '10px',
                            'background': 'rgb(74, 192, 100)',
                            'border-radius': '10px'
                        });
                    } else if (tentativa > 8 && tentativa <= 12) {
                        $("#tentativa").css({
                            'padding': '10px',
                            'background': 'yellow',
                            'border-radius': '10px'
                        });
                    } else {
                        $("#tentativa").css({
                            'padding': '10px',
                            'background': 'red',
                            'border-radius': '10px',
                        });
                    }

                }
            }
        }
        if (pontuacao == 6 && tentativa <= 8) {
            $("#cond").text("Parabéns, que memória excelente!!!");
        } else if (pontuacao == 6 && tentativa > 8 && tentativa <= 12) {
            $("#cond").text("Parabéns, acertou todos os pares com algumas tentativas!");
        } else if (pontuacao == 6 && tentativa > 12) {
            $("#cond").text("Que memória ruim, treine mais!!!");
        }
        $("#vit").text("Jogar novamente");
    });
};

function escondeCartas() {
    $(".carta").css({ 'background': '#949278', 'color': 'transparent', 'pointer-events': 'all' });
};

function mantemCorretos() {
    for (let p = 0; p < corretos.length; p++) {
        for (let u = 0; u < corretos.length * 2; u++) {
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