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
for (i = 0; i<digitos.length; i++) {

    digitos[i].onclick = (ev) =>{
      if (estado == ESTADO.INIT) {
        console.log("entro");
        estado = ESTADO.OP1;
        } else if (estado == ESTADO.OPERATION) {
          console.log("Op 2");
        estado = ESTADO.OP2;
      } else if (estado == ESTADO.OPERATED) {
        display.innerHTML = "0";
        estado = ESTADO.OP1;
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
    } else if (estado == ESTADO.OPERATED) {
      display.innerHTML = "0";
      estado = ESTADO.INIT;
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
    console.log("OPERACION realizada")
    estado = ESTADO.INIT;
    display.innerHTML = eval(display.innerHTML);
    ans = display.innerHTML;
    estado = ESTADO.OPERATED;
  } else if (estado == ESTADO.OPERATION) {
    console.log("No puedo evaluar")
  }

}

//-- Poner a cero la expresion
clear.onclick = () => {
  estado = ESTADO.INIT;
  display.innerHTML = "0";
}

//-- Tecla ANS
testANS.onclick = () => {
  if (estado == ESTADO.OPERATED) {
    display.innerHTML = ans;
  } else {
    display.innerHTML += ans;
  }
  estado = ESTADO.OP1;
  }

//-- Tecla DEL
testDEL.onclick = () => {
  if (estado == ESTADO.OPERATED) {
    display.innerHTML = "0";
  } else {
    if (display.innerHTML.length == 1) {
      display.innerHTML = "0";
    } else {
      console.log(display.innerHTML.length);
      display.innerHTML = display.innerHTML.substring(0, display.innerHTML.length - 1);
    }
  }
}
