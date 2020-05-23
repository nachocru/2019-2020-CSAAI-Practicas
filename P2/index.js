console.log("Ejecutando JS");

//-- Estados de la calculadora
const ESTADO = {
  INIT: 0,
  OP1: 1,
  OPERATION: 2,
  OP2: 3,
  OPERATED: 4,
}

let estado = ESTADO.INIT;
let ans = "0";
let digitos = document.getElementsByClassName("cdigito");
let operaciones = document.getElementsByClassName("operacion");
let specials = document.getElementsByClassName("special");

for (i = 0; i<digitos.length; i++) {

    digitos[i].onclick = (ev) =>{
      if (estado == ESTADO.INIT) {
        estado = ESTADO.OP1;
        } else if (estado == ESTADO.OPERATION) {
        estado = ESTADO.OP2;
      } else if (estado == ESTADO.OPERATED) {
        display.innerHTML = "0";
        estado = ESTADO.OP1;
      }
    digito(ev.target);
  }
}

for (i = 0; i<specials.length; i++) {
  specials[i].onclick = (ev) =>{
    if (estado == ESTADO.INIT) {
      null;
    } else if (estado == ESTADO.OPERATION) {
      null;
    } else if (estado == ESTADO.OPERATED) {
      display.innerHTML = "0";
      estado = ESTADO.INIT;
    } else if (estado == ESTADO.OP1 || estado == ESTADO.OP2){
      digito(ev.target);
    }
  }
}


for (i = 0; i<operaciones.length; i++) {
  operaciones[i].onclick = (ev) =>{
    if (estado == ESTADO.INIT) {
      estado = ESTADO.INIT; // No se puede operar sin operandos
    } else if (estado == ESTADO.OP1 || estado == ESTADO.OP2) {
      digito(ev.target); // Estado de operacion
      estado = ESTADO.OPERATION;
    } else if (estado == ESTADO.OPERATED) {
      digito(ev.target); // Toma el valor del resultado como nuevo operando 1
      estado = ESTADO.OPERATION;
    }
  }
}

function digito(boton)
{
  if (display.innerHTML=="0") {
    display.innerHTML = boton.value;
  } else {
    display.innerHTML += boton.value;
  }

}


//-- Evaluar la expresion
igual.onclick = () => {
  if (estado == ESTADO.INIT) {
    estado = ESTADO.INIT; // No se ha iniciado la operacion aun
  } else if (estado == ESTADO.OP1 || estado == ESTADO.OP2) {
    estado = ESTADO.INIT; // Operacion realizada con éxito
    display.innerHTML = eval(display.innerHTML);
    ans = display.innerHTML;
    estado = ESTADO.OPERATED;
  } else if (estado == ESTADO.OPERATION) {
    null; // No se puede operar cuando tenemos una operacion sin operandos
  }
}

//-- Poner a cero la expresion
clear.onclick = () => {
  estado = ESTADO.INIT;
  display.innerHTML = "0";
}

//-- Tecla ANS
testANS.onclick = () => {
  if (ans == 0 && estado == ESTADO.INIT){
    display.innerHTML = "0";
    estado = ESTADO.INIT;
  }else{
    if (estado == ESTADO.OPERATED) {
      display.innerHTML = ans;
    } else if (estado == ESTADO.INIT){
      display.innerHTML = ans;
    } else {
      display.innerHTML += ans;
    }
    estado = ESTADO.OP1;
  }
}

//-- Tecla DEL
testDEL.onclick = () => {
    if (display.innerHTML.length == 1) {
      display.innerHTML = "0";
      estado = ESTADO.INIT
    } else {
      display.innerHTML = display.innerHTML.substring(0, display.innerHTML.length - 1);
      if (estado == ESTADO.OPERATION){
        estado = ESTADO.OP1;
      }
    }
}
