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
        x: Math.random() * 600,
        y: Math.random() * 100,
    },
    angulo: -Math .PI/2,
    largura: 20,
    altura: 20,
    cor: "lightgray",
    motorLigado: false,
    velocidade: {
        x: 1,
        y: 0
    },
    combustível: 1000,
    rotacaoAntiHorario: false,
    rotacaoHorario: false
}

let estrelas =[];
for( let i = 0; i < 500; i++){
    estrelas [i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        raio: Math.sqrt(Math.random() * 2),
        transparencia: 1.0,
        diminuicao: true,
        razaoDeCintilacao: Math.random() * 0.05
    };
}

function desenharEstrelas(){
    for ( let i = 0 ; i < estrelas.length; i++ ){
        let estrela = estrelas[i];
        contexto.beginPath();
        contexto.arc(estrela.x, estrela.y, estrela.raio, 0, 2 * Math.PI);
        contexto.closePath();
        contexto.fillStyle = "rgba (255, 255, 255, " + estrela.transprencia + ")";
        contexto.fill();
        contexto.restore();
    }
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
    contexto.font = "bold18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let combustível = `Combustível: ${(moduloLunar.combustível / 10).toFixed(1)}%`;
    contexto.fillText(combustível, 100, 80);
}

function mostrarAngulo(){
    contexto.font = "bold18 Arial";
    contexto.textAlign = "center";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let angulo = `Ângulo: ${(10 * moduloLunar.angulo).toFixed(1)}`;
    contexto.fillText(angulo, 100, 120);
}
function mostrarAltitude(){
    contexto.font = "bold18 Arial";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    let altitude = `Altitude: ${(600 - moduloLunar.posicao.y).toFixed(1)}`;
    contexto.fillText(altitude, 400, 60 );
}



function desenhar() {
    // Limpa o que há na tela.
    contexto.clearRect(0, 0, canvas.width, canvas.height);

    // Devem estar nessa ordem.
    atracaoGravitacional();
    mostrarVelocidade();
    mostrarCombustível();
    mostrarAngulo();
    mostrarAltitude();
    desenharModuloLunar();
    // "RequestAnimationFrame" repete a execução da função "desenhar" a cada quadro.
    if(moduloLunar.posicao.y >= (canvas.height - 1.5 * moduloLunar.altura)){
        if(moduloLunar.velocidade.y >= 1.5 ||
           moduloLunar.velocidade.x != 0 ||
           5 < moduloLunar.angulo ||
           moduloLunar.angulo < -5
        )
        {

        contexto.font = "bold 40px Calibri";
        contexto.textAlign = "center";
        contexto.textBaseLine = "middle";
        contexto.fillStyle = "red";
        return contexto.fillText("Você morreu de queda!", canvas.width/2, canvas.height/2 )
        }else{
        contexto.font = "bold 40px Calibri";
        contexto.textAlign = "center";
        contexto.textBaseLine = "middle";
        contexto.fillStyle = "green";
        return contexto.fillText("Você sobreviveu!", canvas.width/2, canvas.height/2 )
        }
    }
    requestAnimationFrame(desenhar);
    
}

// Seção de Controle:

// O programa compreende como "motorLigado" quando a tecla para cima está pressionada.
document.addEventListener("keydown", teclaPressionada);
function teclaPressionada(evento) {
    if (evento.keyCode == 38){
        moduloLunar.motorLigado = true;
    }
    if(evento.keyCode == 39){
        moduloLunar.rotacaoAntiHorario = true;

    }else if(evento.keyCode == 37){
        moduloLunar.rotacaoHorario = true;

    }
        
}
// O programa compreende como "motorLigado = false" quando a tecla de seta para cima não está pressionada.
document.addEventListener("keyup", teclaSolta);
function teclaSolta(evento) {
    if (evento.keyCode == 38) {
        moduloLunar.motorLigado = false;
    }
    if(evento.keyCode == 39){
       moduloLunar.rotacaoAntiHorario = false;
        
    }else if(evento.keyCode == 37){
       moduloLunar.rotacaoHorario = false;
    }
}

let gravidade = 0.03;
function atracaoGravitacional() {
    moduloLunar.velocidade.y += gravidade;
    moduloLunar.posicao.x += moduloLunar.velocidade.x;
    moduloLunar.posicao.y += moduloLunar.velocidade.y;
    if(moduloLunar.rotacaoAntiHorario){
        moduloLunar.angulo += Math.PI/180;
    }else if(moduloLunar.rotacaoHorario){
        moduloLunar.angulo -= Math.PI/180
    }
    if (moduloLunar.motorLigado) {
        if (moduloLunar.combustível > 0) {
            moduloLunar.velocidade.y -= 0.040;
            moduloLunar.combustível -= 1;
        } else {
            moduloLunar.motorLigado = false;
            moduloLunar.combustível = 0;
        }
    }
 if(moduloLunar.motorLigado){
    moduloLunar.velocidade.y -= 0.0115 * Math.cos(moduloLunar.angulo);
    moduloLunar.velocidade.x += 0.0115 * Math.sin(moduloLunar.angulo); 
 }  
}


    
desenhar();