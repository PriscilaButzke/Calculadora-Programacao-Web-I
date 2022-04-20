'use strict';

const display = document.getElementById('display');
const display2 = document.getElementById('display2');
const numeros = document.querySelectorAll('[id*=tecla]'); //busca todos as id com a palavra tecla
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
var operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

const calcular = () => {

    if (operacaoPendente()) {
        novoNumero = true;
        const numeroAtual = parseFloat(display.textContent.replace(',', '.'));
        atualizarDisplay2("=");
        if (operador == "mod") {
            var resultado = eval(`${numeroAnterior} % ${numeroAtual}`);
            atualizarDisplay(resultado);
            atualizarDisplay2(resultado);
        } else if (operador == "^") {
            var resultado = eval(`${Math.pow(numeroAnterior,numeroAtual)}`);
            atualizarDisplay(resultado);
            atualizarDisplay2(resultado);
        } else {
            if (numeroAtual == 0 && operador == "/") {
                atualizarDisplay("Não é possível dividir por zero");
                limparDisplay2();
            } else {
                var resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
                atualizarDisplay(resultado);
                atualizarDisplay2(resultado);

            }
        }
    }
}

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    } else {
        display.textContent += texto.toLocaleString('BR');
    }
}

const inserirNumero = (evento) => {
    atualizarDisplay(evento.target.textContent);
    atualizarDisplay2(evento.target.textContent);
}

numeros.forEach(numero => numero.addEventListener('click', inserirNumero));


const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',', '.'));
        atualizarDisplay2(operador)
    }
}

operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

const ativarIgual = () => {
    calcular();
    operador = undefined;
}

document.getElementById('igual').addEventListener('click', ativarIgual);

const limparDisplay = () => {

    display.textContent = '';
    display2.textContent = '';
}

const limparDisplay2 = () => {
    display2.textContent = '';
}


document.getElementById('limparDisplay').addEventListener('click', limparDisplay);


const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}

document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

const removerUltimoNumero = () => {
    display.textContent = display.textContent.slice(0, -1);
    display2.textContent = display2.textContent.slice(0, -1);
}
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {
    novoNumero = true
    atualizarDisplay(display.textContent * -1);
    atualizarDisplay2(display2.textContent * -1);

}

document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDecimal = () => {
    display.textContent.indexOf(',') !== -1;
    display2.textContent.indexOf(',') !== -1;
}
const existeValor = () =>{
    display.textContent.length > 0;
    display2.textContent.length > 0;
} 

//Verifica se o display contém uma ",", caso nao contenha torna o número decimal incluindo a ",".
const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (existeValor()) {
            atualizarDisplay(',');
            atualizarDisplay2(',');

        } else {
            atualizarDisplay('0,');
            atualizarDisplay2('0,');

        }
    }
}

document.getElementById('decimal').addEventListener('click', inserirDecimal);

const mapaTeclado = {
    '00': 'tecla00',
    '0': 'tecla0',
    '1': 'tecla1',
    '2': 'tecla2',
    '3': 'tecla3',
    '4': 'tecla4',
    '5': 'tecla5',
    '6': 'tecla6',
    '7': 'tecla7',
    '8': 'tecla8',
    '9': 'tecla9',
    '/': 'operadorDividir',
    '*': 'operadorMultiplicar',
    '-': 'operadorSubtrair',
    '+': 'operadorAdicionar',
    'Enter': 'igual',
    '=': 'igual',
    '%': 'operadorMod',
    '**': 'operadorPotencia',
    'Backspace': 'backspace',
    'c': 'limparDisplay',
    'Escape': 'limparCalculo',
    ',': 'decimal'
}

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida())
        document.getElementById(mapaTeclado[tecla]).click();
}
document.addEventListener('keydown', mapearTeclado); //keydown: o evento ocorre quando a tecla é pressionada

const atualizarDisplay2 = (texto) => {
    display2.textContent += texto.toLocaleString('BR');
}