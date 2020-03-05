console.log("Ejecutando JS");

//-- Estados de la calculadora
const ESTADO = {
  INIT: 0,
  OP1: 1,
  OPERATION: 2,
  OP2_INIT: 3,
  OP2: 4,
}
let estado = ESTADO.INIT;
let digitos = document.getElementsByClassName("cdigito");
let operaciones = document.getElementsByClassName("operacion");
for (i = 0; i<digitos.length; i++) {

    digitos[i].onclick = (ev) =>{
      if (estado == ESTADO.INIT) {
        console.log("entro");
        estado = ESTADO.OP1;
        } else if (estado == ESTADO.OPERATION) {
          console.log("Op 2");
        estado = ESTADO.OP2;
        }
    digito(ev.target);
    }
}

for (i = 0; i<operaciones.length; i++) {
  operaciones[i].onclick = (ev) =>{
    if (estado == ESTADO.INIT) {
      console.log("incorrecto");
      estado = ESTADO.INIT;
    } else if (estado == ESTADO.OP1 || estado == ESTADO.OP2) {
      console.log("OPERACION");
      digito(ev.target);
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
    console.log("No puedo evaluar");
    estado = ESTADO.INIT;
  } else if (estado == ESTADO.OP1 || estado == ESTADO.OP2) {
    console.log("OPERACION realizada");
    display.innerHTML = eval(display.innerHTML);
    estado = ESTADO.INIT;
  } else if (estado == ESTADO.OPERATION) {
    console.log("No puedo evaluar")
  }

}

//-- Poner a cero la expresion
clear.onclick = () => {
  display.innerHTML = "0";
}
