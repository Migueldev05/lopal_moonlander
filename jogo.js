// Moonlander;
// Tiago Alves da Silva (https://github.com/DarkusStorm);
// 28/03/25;
// Versão 0.1.0.

/** @type {HTMLCanvasElement} */

// Modelagem de Dados:
let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");


let moduloLunar = {
    posicao: {
        x: 400,
        y: 100
    },
    angulo: 0,
    largura: 20,
    altura: 20,
    cor: "lightgray",
    motorLigado: false,
    velocidade: {
        x: 0,
        y: 0
    },
    combustível: 1000
}

// Visualização:
function desenharModuloLunar() {
    contexto.save();
    // Salva o contexto atual, visto que será alterado deopis.
    contexto.beginPath();
    contexto.translate(moduloLunar.posicao.x, moduloLunar.posicao.y);
    contexto.rotate(moduloLunar.angulo);
    contexto.rect(moduloLunar.largura * -0.5, moduloLunar.altura * -0.5, moduloLunar.largura, moduloLunar.altura);
    contexto.fillStyle = moduloLunar.cor;
    contexto.fill();
    contexto.closePath();

    if (moduloLunar.motorLigado) {
        desenharChama();
    }

    contexto.restore();
    // Restaura o contexto salvo.
}


function desenharChama() {
    contexto.beginPath();
    contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5);
    // Determina o tamanho da chama.
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 35);
    contexto.lineTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.closePath();
    contexto.fillStyle = "orange";
    contexto.fill();
}

function mostrarVelocidade() {
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let velocidade = `Velocidade: ${(10 * moduloLunar.velocidade.y).toFixed(1)}`;
    contexto.fillText(velocidade, 100, 60);
}
function mostrarCombustível() {
    contexto.font = "bold18px Arial"
    contexto.textAlign = "center";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let combustível = `Combustível: ${(moduloLunar.combustível).toFixed(1)}`;
    contexto.fillText(combustível, 100, 80);
}

function desenhar() {
    // Limpa o que há na tela.
    contexto.clearRect(0, 0, canvas.width, canvas.height);

    // Devem estar nessa ordem.
    atracaoGravitacional();
    mostrarVelocidade();
    mostrarCombustível();
    desenharModuloLunar();
    // "RequestAnimationFrame" repete a execução da função "desenhar" a cada quadro.
    if(moduloLunar.posicao.y >= 600){
        if(moduloLunar.velocidade.y >= 1.5){
        return alert("Você morreu de queda!");
        }else{
        return alert("Você conseguiu pousar!");
        }
    }
    requestAnimationFrame(desenhar);
    
}

// Seção de Controle:

// O programa compreende como "motorLigado" quando a tecla para cima está pressionada.
document.addEventListener("keydown", teclaPressionada);
function teclaPressionada(evento) {
    if (evento.keyCode == 38) {
        moduloLunar.motorLigado = true;
    }
}
// O programa compreende como "motorLigado = false" quando a tecla de seta para cima não está pressionada.
document.addEventListener("keyup", teclaSolta);
function teclaSolta(evento) {
    if (evento.keyCode == 38) {
        moduloLunar.motorLigado = false;
    }
}

let gravidade = 0.03;
function atracaoGravitacional() {
    moduloLunar.velocidade.y += gravidade;
    moduloLunar.posicao.x += moduloLunar.velocidade.x;
    moduloLunar.posicao.y += moduloLunar.velocidade.y;
    if (moduloLunar.motorLigado) {
        if (moduloLunar.combustível > 0) {
            moduloLunar.velocidade.y -= 0.040;
            moduloLunar.combustível -= 1;
        } else {
            moduloLunar.motorLigado = false;
            moduloLunar.combustível = 0;
        }
    }
   
}


    
desenhar();