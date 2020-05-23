console.log("Ejecutando JS...");

//-- Obtener el objeto canvas
const canvas = document.getElementById("canvas");

//-- Sus dimensiones las hemos fijado en el fichero
//-- HTML. Las imprimimos en la consola
console.log(`canvas: Anchura: ${canvas.width}, Altura: ${canvas.height}`);

//-- Obtener el contexto para pintar en el canvas
const ctx = canvas.getContext("2d");

//-- Obtener Sonidos
const sonido_raqueta = new Audio("pong-raqueta.mp3");
const sonido_rebote = new Audio("pong-rebote.mp3");
const sonido_tanto = new Audio("pong-tanto.mp3");
const sonido_mover = new Audio("Mover.mp3");
const sonido_error = new Audio("Error.mp3");
const sonido_start = new Audio("Start.mp3");
const sonido_victoria = new Audio("victoria.mp3");
const sonido_derrota = new Audio("derrota.mp3");
const sonido_special = new Audio("special.mp3");
//-- límite de máxima puntuación
const MAX_PUNTUACION = 5;

//-- Estados del juego
const ESTADO = {
  SAQUE: 1,
  JUGANDO: 2,
  FINISH: 3,
  MENU1: 4,
  MENU2: 5,
  CONTROLS: 6,
  SAQUE1: 7,
  JUGANDO1: 8,
  FINISH1: 9,
}

//-- Variable de estado
//-- Arrancamos desde el estado inicial de menu
let estado = ESTADO.MENU1;
//-- Iniciamos marcadores
let marcador_izq = 0;
let marcador_dcha = 0;
let estado_anterior;
//-Variables del cronometro
let minutos2 = 0;
let minutos1 = 0;
let segundos2 = 0;
let segundos1 = 0;
let centesimas2 = 0;
let centesimas1 = 0;

function draw() {
  //------ Dibujar el tanteo
  if (estado != ESTADO.MENU1 && estado != ESTADO.MENU2 && estado != ESTADO.CONTROLS){
    ctx.font = "100px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(marcador_dcha, 200, 80);
    ctx.fillText(marcador_izq, 340, 80);
  }


  //----- Dibujar la Bola
  //-- Solo en el estado de jugando
  if (estado == ESTADO.JUGANDO || estado == ESTADO.JUGANDO1) {
    bola.draw();
  }

  if (estado == ESTADO.SAQUE || estado == ESTADO.JUGANDO || estado == ESTADO.SAQUE1 || estado == ESTADO.JUGANDO1){
    //-- Dibujar las raquetas
    raqI.draw();
    if (estado == ESTADO.SAQUE || estado == ESTADO.JUGANDO){
      raqD.draw();
    }else{
      raqCPU.draw();
    }
    //--Dibujar el cronómetro
    ctx.font = "30px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText("Time:", 210, 370);
    ctx.fillText(minutos2, 320, 370);
    ctx.fillText(minutos1, 340, 370);
    ctx.fillText(":",360, 370);
    ctx.fillText(segundos2, 370, 370);
    ctx.fillText(segundos1, 390, 370);
    ctx.fillText(":",410, 370);
    ctx.fillText(centesimas2, 420, 370);


    //-- Dibujar la red
    ctx.beginPath();

    //-- Estilo de la linea: discontinua
    //-- Trazos de 10 pixeles, y 10 de separacion
    ctx.setLineDash([10, 10]);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    //-- Punto superior de la linea. Su coordenada x está en la mitad
    //-- del canvas
    ctx.moveTo(canvas.width/2, 0);

    //-- Dibujar hasta el punto inferior
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
  }

  //--Mensaje final
  if (estado == ESTADO.FINISH || estado == ESTADO.FINISH1) {
    ctx.font = "40px Arial";
    ctx.fillStyle = "yellow";
    if (marcador_dcha == MAX_PUNTUACION){
      ctx.fillText("Player 1 wins", 180, 200);
    } else {
      if (estado == ESTADO.FINISH){
        ctx.fillText("Player 2 wins", 180, 200);
      }else{
        ctx.fillText("CPU wins", 220, 200);
      }
    }
  }

  //-- Dibujar el texto de sacar
  if (estado == ESTADO.SAQUE || estado == ESTADO.SAQUE1) {
    ctx.font = "40px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText("Saca!", 30, 350);
  }

  //-- Dibujar menu inicial
  if (estado == ESTADO.MENU1 || estado == ESTADO.MENU2) {
    ctx.font = "80px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText("Pong!", 210, 90);
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("[h]", 50, 200);
    ctx.fillText("1  Player", 240, 200);
    ctx.fillText("[b]", 50, 260);
    ctx.fillText("2  Players", 240, 260);
    if (estado == ESTADO.MENU1){
      ctx.fillText(">", 160, 200);
    }else{
      ctx.fillText(">", 160, 260);
    }
  }
  //--Panel de controles
  if (estado == ESTADO.CONTROLS){
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Controls", 220, 40);
    ctx.font = "20px Arial";
    ctx.fillText("s  -----  Service", 120, 90);
    ctx.fillText("1  Player:", 60, 120);
    ctx.fillText("q   -----  Up", 120, 150);
    ctx.fillText("a   -----  Down", 120, 180);
    ctx.fillText("2  Player:", 60, 210);
    ctx.fillText("q   -----  Up Player 1", 120, 240);
    ctx.fillText("a   -----  Down Player 1", 120, 270);
    ctx.fillText("p   -----  Up Player 2", 120, 320);
    ctx.fillText("l   -----  Down Player 2", 120, 350);
    ctx.fillText("Press r to return", 390, 370);
  }
}

function animacion(){
  //-- Actualizar las posiciones de los objetos móviles
  //-- Actualizar las raqueta con la velocidad actual
  raqI.update();
  raqD.update();
  raqCPU.update();

  //-- Comprobar si la bola ha alcanzado el límite derecho
  //-- Si es así, se cambia de signo la velocidad, para
  // que "rebote" y vaya en el sentido opuesto
  if (bola.x >= canvas.width) {
    if (estado == ESTADO.JUGANDO){
      estado = ESTADO.SAQUE;
    }else{
      estado = ESTADO.SAQUE1;
      raqCPU.height = 320;
      raqCPU.x = 540;
      raqCPU.y = 40;
    }
    bola.x_ini = 500;
    bola.init();
    detenerse();
    console.log("Tanto!!!!");
    marcador_dcha += 1;
    //-- Reproducir sonido
    if (marcador_dcha == MAX_PUNTUACION){
      if (estado == ESTADO.JUGANDO){
        estado = ESTADO.FINISH;
      }else {
        estado = ESTADO.FINISH1;
      }
      sonido_victoria.currentTime = 0;
      sonido_victoria.play();
    } else{
      sonido_tanto.currentTime = 0;
      sonido_tanto.play();
    }
  }

  //-- Comprobar si la bola ha alcanzado el límite inferior o superior
  //-- Si es así, se cambia de signo la velocidad, para
  // que "rebote" y vaya en el sentido opuesto
  if (bola.y >= canvas.height || bola.y <= 0) {
    //-- Hay colisión. Cambiar el signo de la bola
    bola.vy = bola.vy * -1;
    //-- Reproducir sonido
    sonido_rebote.currentTime = 0;
    sonido_rebote.play();
  }

  //-- Si llega al límite izquierdo, hemos perdido
  //-- pasamos al estado de SAQUE
  if (bola.x <= bola.size) {
    if (estado == ESTADO.JUGANDO){
      estado = ESTADO.SAQUE;
    }else{
      estado = ESTADO.SAQUE1;
      raqCPU.height = 320;
      raqCPU.x = 540;
      raqCPU.y = 40;
    }
    bola.x_ini = 100;
    bola.init();
    detenerse();
    console.log("Tanto!!!!");
    marcador_izq += 1;
    //-- Reproducir sonido
    if (marcador_izq == MAX_PUNTUACION){
      if (estado == ESTADO.SAQUE){
        estado = ESTADO.FINISH;
        sonido_victoria.currentTime = 0;
        sonido_victoria.play();
      }else {
        estado = ESTADO.FINISH1;
        sonido_derrota.currentTime = 0;
        sonido_derrota.play();
      }
    } else{
      sonido_tanto.currentTime = 0;
      sonido_tanto.play();
    }
  }

  // Comprobar que las raquetas no se salgan del canvas
  if (raqI.y >= canvas.height-raqI.height){
    raqI.y = canvas.height-raqI.height;
  }

  if (raqI.y <= 0){
    raqI.y = 0;
  }

  if (raqD.y >= canvas.height-raqD.height){
    raqD.y = canvas.height-raqD.height;
  }

  if (raqD.y <= 0){
    raqD.y = 0;
  }

  if (raqCPU.y >= canvas.height-raqCPU.height){
    raqCPU.v = -raqCPU.v;
  }

  if (raqCPU.y <= 0){
    raqCPU.v = -raqCPU.v;
  }


// Configuración de los tramos de la raqueta izquierda
let tramo0 = raqI.y;
let tramo1 = raqI.y + raqI.height/4;
let tramo2 = raqI.y + 2*(raqI.height/4);
let tramo3 = raqI.y + 3*(raqI.height/4);
let tramo4 = raqI.y + raqI.height;

  //-- Comprobar si hay colisión con la raqueta izquierda y en qué parte

  if (bola.x >= raqI.x && bola.x <=(raqI.x + raqI.width)){
    if(bola.y >= tramo0 && bola.y <=tramo1){
      bola.vy = -5;
    }else if(bola.y >= tramo3 && bola.y <=tramo4){
      bola.vy = 5;
    }else if(bola.y >= tramo1 && bola.y <=tramo2){
      bola.vy = -2;
    }else if(bola.y >= tramo2 && bola.y <=tramo3){
      bola.vy = 2;
    }

    if(bola.y >= tramo0 && bola.y <=tramo4){
      if(raqI.v != 0){
        bola.vy = raqI.v;
      }
      if(bola.vx == -7){
        bola.vx = -bola.vx_ini;
      }
      random_shot = getRandomArbitrary(0, 5);
      if(random_shot >= 4){ // super tiro
        bola.vx = 7;
        sonido_special.currentTime = 0;
        sonido_special.play();
      }else {
        bola.vx = bola.vx * -1;
        sonido_raqueta.currentTime = 0;
        sonido_raqueta.play();
      }
    }
  }

  // Configuración de los tramos de la raqueta derecha
  let tramo0_D = raqD.y;
  let tramo1_D = raqD.y + raqD.height/4;
  let tramo2_D = raqD.y + 2*(raqD.height/4);
  let tramo3_D = raqD.y + 3*(raqD.height/4);
  let tramo4_D = raqD.y + raqD.height;

  //-- Comprobar si hay colisión con la raqueta derecha y en qué parte
  if (estado == ESTADO.JUGANDO){
    if (bola.x >= raqD.x && bola.x <=(raqD.x + raqD.width)){
      if(bola.y >= tramo0_D && bola.y <=tramo1_D){
        bola.vy = -5;
      }else if(bola.y >= tramo3_D && bola.y <=tramo4_D){
        bola.vy = 5;
      }else if(bola.y >= tramo1_D && bola.y <=tramo2_D){
        bola.vy = -2;
      }else if(bola.y >= tramo2_D && bola.y <=tramo3_D){
        bola.vy = 2;
      }

      if(bola.y >= tramo0_D && bola.y <=tramo4_D){
        if(raqD.v != 0){
          bola.vy = raqD.v;
        }
        random_shot = getRandomArbitrary(0, 5);
        if(random_shot >= 4){ // super tiro
          bola.vx = -7;
          sonido_special.currentTime = 0;
          sonido_special.play();
        }else {
          bola.vx = bola.vx * -1;
          sonido_raqueta.currentTime = 0;
          sonido_raqueta.play();
        }
        //-- Reproducir sonido
        sonido_raqueta.currentTime = 0;
        sonido_raqueta.play();
      }
    }
  }

  //-- Comprobar si hay colisión con la raqueta CPU
  if (estado == ESTADO.JUGANDO1){
    if (bola.x >= raqCPU.x && bola.x <=(raqCPU.x + raqCPU.width)){
      if(bola.y >= raqCPU.y && bola.y <= raqCPU.y + raqCPU.height){
          bola.vy = raqCPU.v;
          if(bola.vx == 7){
            bola.vx = bola.vx_ini;
          }
          random_shot = getRandomArbitrary(0, 5);
          if(random_shot >= 4){ // super tiro
            bola.vx = -7;
            sonido_special.currentTime = 0;
            sonido_special.play();
          }else {
            bola.vx = bola.vx * -1;
            sonido_raqueta.currentTime = 0;
            sonido_raqueta.play();
          }
          //-- Hacemos la raqueta CPU más pequeña
          raqCPU.height -= 10;
          //-- Reproducir sonido
          sonido_raqueta.currentTime = 0;
          sonido_raqueta.play();
      }
    }
  }

  //-- Actualizar coordenada x de la bola, en funcion de
  //-- su velocidad
  bola.update()

  //-- Borrar la pantalla
  ctx.clearRect(0,0, canvas.width, canvas.height);

  //-- Dibujar el nuevo frame
  draw();
  window.requestAnimationFrame(animacion);
}

  var cronometro;

  function detenerse(){
    clearInterval(cronometro);
  }

  function carga(){
    cronometro = setInterval(
    function(){
      if(centesimas1==10){
        centesimas1=0;
        centesimas2++;
        if(centesimas2==6){
          centesimas2=0;
          segundos1++;
          if(segundos1==10){
            segundos1=0;
            segundos2++;
            if(segundos2==6){
              segundos2=0;
              minutos1++;
              if(minutos1==10){
                minutos1=0;
                minutos2++;
              }
            }
          }
        }
      }
      centesimas1++;
    },10);
  }

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

bola = new Bola(ctx); //--Creamos la bola

//-- Crear las raquetas
const raqI = new Raqueta(ctx);
const raqD = new Raqueta(ctx);
const raqCPU = new Raqueta(ctx);
raqCPU.height = 320;

//-- Cambiar las coordenadas de las raquetas derecha y CPU
raqD.x_ini = 540;
raqD.y_ini = 300;
raqCPU.x_ini = 540;
raqCPU.y_ini = 40;
raqD.init();
raqCPU.init();



//-- Arrancar la animación
animacion()

//-- Retrollamada de las teclas
window.onkeydown = (e) => {

  //-- En el estado inicial no se
  //-- hace caso de las teclas
  if (estado == ESTADO.FINISH)
    return;

  switch (e.key) {
    case "a":
      raqI.v = raqI.v_ini;
      break;
    case "q":
      raqI.v = raqI.v_ini * -1;
      break;
    case "l":
      raqD.v = raqD.v_ini;
      break;
    case "p":
      raqD.v = raqD.v_ini * -1;
      break;
    case "r":
      if(estado == ESTADO.CONTROLS){
        estado = estado_anterior;
        sonido_error.currentTime = 0;
        sonido_error.play();
      }
      break;
    case "b":
      if (estado == ESTADO.MENU1) {
        estado = ESTADO.MENU2;
        sonido_mover.currentTime = 0;
        sonido_mover.play();
      }else if (estado == ESTADO.MENU2) {
        estado = ESTADO.MENU2;
        sonido_error.currentTime = 0;
        sonido_error.play();
      }
      break
    case "h":
      if (estado == ESTADO.MENU2) {
        estado = ESTADO.MENU1;
        sonido_mover.currentTime = 0;
        sonido_mover.play();
      }else if (estado == ESTADO.MENU1) {
        estado = ESTADO.MENU1;
        sonido_error.currentTime = 0;
        sonido_error.play();
      }
      break
    case "s":
    //-- El saque solo funciona en el estado de SAQUE
    if (estado == ESTADO.SAQUE || estado == ESTADO.SAQUE1) {
      carga();
      //-- Reproducir sonido
      sonido_raqueta.currentTime = 0;
      sonido_raqueta.play();

      //-- Llevar bola a su posicion incicial
      bola.init();

      random_angle = getRandomArbitrary(-5, 5);
      bola.vy = random_angle;
      bola.vx_init = getRandomArbitrary(2, 4);
      //-- Darle velocidad
      if(bola.x == 100){
        bola.vx = bola.vx_init;
      }else{
        bola.vx = -bola.vx_init;
      }
      //-- Cambiar al estado de jugando!
      if(estado == ESTADO.SAQUE){
        estado = ESTADO.JUGANDO;
      }else if (estado == ESTADO.SAQUE1){
        estado = ESTADO.JUGANDO1;
      }

      return false;
    }
  default:
  }
}

//-- Retrollamada de la liberacion de teclas
window.onkeyup = (e) => {
  if (e.key == "a" || e.key == "q"){
    //-- Quitar velocidad de la raqueta
    raqI.v = 0;
  }
  if (e.key == "p" || e.key == "l"){
    //-- Quitar velocidad de la raqueta
    raqD.v = 0;
  }
}

//-- Botón para ver los controles
const controls = document.getElementById("controls");

controls.onclick = () => {
  if (estado != ESTADO.CONTROLS){
    sonido_mover.currentTime = 0;
    sonido_mover.play();
    estado_anterior = estado;
    estado = ESTADO.CONTROLS;
  }
}
//-- Botón de arranque
const start = document.getElementById("start");

start.onclick = () => {
  raqD.init();
  raqI.init();
  raqCPU.init();

  if (estado == ESTADO.MENU1){
    raqCPU.v = raqCPU.v_ini;
    sonido_start.currentTime = 0;
    sonido_start.play();
    marcador_dcha = 0;
    marcador_izq = 0;
    estado = ESTADO.SAQUE1;
    console.log("SAQUE!");
    canvas.focus();
  }

  if (estado == ESTADO.MENU2){
    sonido_start.currentTime = 0;
    sonido_start.play();
    marcador_dcha = 0;
    marcador_izq = 0;
    estado = ESTADO.SAQUE;
    console.log("SAQUE!");
    canvas.focus();
  }
}

//-- Boton de stop
const stop = document.getElementById("stop");

stop.onclick = () => {
  //-- Volver al estado inicial
  detenerse();
  minutos1= 0;
  minutos2= 0;
  segundos1= 0;
  segundos2= 0;
  centesimas1= 0;
  centesimas2= 0;

  estado = ESTADO.MENU1;
  bola.init();
  start.disabled = false;
}
