const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const size = 30

const cobra = [
    {x:0, y:0}
]

const comida = {
    x: 90,
    y: 90,
    color:"yellow"
}

const drawComida = () => {
    
    const {x, y, color} = food

    ctx.shadowColor= color
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)

}

const drawCobra = () => {
    ctx.fillStyle = "grey"

    cobra.forEach((position, index) => {
        if(index == cobra.length - 1){
            ctx.fillStyle = "white"
        }

        ctx.fillRect(position.x, position.y, size, size)
    })
}

let direcao

const moveCobra = () => {
    if(!direcao) return
    const cabeca = cobra[cobra.length - 1];

    cobra.shift()

    if (direcao == "right"){
        cobra.push({ x: cabeca.x + size, y: cabeca.y })
    }
    if (direcao == "left"){
        cobra.push({ x: cabeca.x - size, y: cabeca.y })
    }
    if (direcao == "down"){
        cobra.push({ x: cabeca.x, y: cabeca.y + size})
    }
    if (direcao == "up"){
        cobra.push({ x: cabeca.x, y: cabeca.y - size })
    }
}

document.addEventListener("keydown", ({key}) => {
    if (key == "ArrowRight" && direcao != "left"){
        direcao = "right"
    }
    if (key == "ArrowLeft" && direcao != "right"){
        direcao = "left"
    }
    if (key == "ArrowDown" && direcao != "up"){
        direcao = "down"
    }
    if (key == "ArrowUp" && direcao != "down"){
        direcao = "up"
    }
})

setInterval(() => {
    ctx.clearRect(0, 0, 600, 600)
    drawCobra()

    moveCobra() 
}, 300);