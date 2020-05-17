console.log("Ejecutando JS...");

//----- Obtener elemento de video y configurarlo
const videoMain = document.getElementById("videoMain")
videoMain.width=400;  //-- Tamaño de la pantalla de video
videoMain.height=200;
const video1 = document.getElementById("video1")
video1.width=200;  //-- Tamaño de la pantalla de video
video1.height=100;
const video2 = document.getElementById("video2")
video2.width=200;  //-- Tamaño de la pantalla de video
video2.height=100;
const video3 = document.getElementById("video3")
video3.width=200;  //-- Tamaño de la pantalla de video
video3.height=100;
const video4 = document.getElementById("video4")
video4.width=200;  //-- Tamaño de la imagen
video4.height=100;

var manual = false;
var controlador = 1;

var automatic;
var video_bucle;

var video_sel = 1;
var bucle = false;
var inicio_bucle = 0;

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
videoMain.poster="https://github.com/nachocru/2019-2020-CSAAI-Practicas/raw/master/P4/Inicio.jpg";
videoMain.poster.width=400;
videoMain.poster.height=200;
video1.src="https://github.com/nachocru/Mis_recursos/raw/master/Video1.mp4"
video2.src="https://github.com/nachocru/Mis_recursos/raw/master/Video2.mp4"
video3.src="https://github.com/nachocru/Mis_recursos/raw/master/Video3.mp4"
video4.src="https://github.com/nachocru/Mis_recursos/raw/master/Video4.mp4"


//-- Obtener los botones
const play1 = document.getElementById("Video1")
const play2 = document.getElementById("Video2")
const play3 = document.getElementById("Video3")
const play4 = document.getElementById("Video4")
const iniciarNormal = document.getElementById("Inicio1")
const iniciarAutomatico = document.getElementById("Inicio2")
const iniciarBucle = document.getElementById("Inicio3")
const sel_imagen = document.getElementById("Imagen")

//-- Función de retrollamada del botón de ver
iniciarNormal.onclick = () => {
  console.log("Click iniciar Normal");
  window.clearInterval(automatic); // Paramos el modo automático si lo hubiera
  window.clearInterval(video_bucle); // Paramos el modo bucle si lo hubiera
  video1.play();
  video2.play();
  video3.play();
  video4.play();
  bucle = false;
  manual = true;
};

function contador() {
  if ( controlador == 1){
    console.log("Click vídeo 1");
    videoMain.src = video1.src;
    videoMain.currentTime = video1.currentTime;
    videoMain.play();
    controlador = 2;
  } else if(controlador == 2){
    console.log("Click vídeo 2");
    videoMain.src = video2.src;
    videoMain.currentTime = video2.currentTime;
    videoMain.play();
    controlador = 3;
  } else {
    console.log("Click vídeo 3");
    videoMain.src = video3.src;
    videoMain.currentTime = video3.currentTime;
    videoMain.play();
    controlador = 1;
  }

}

iniciarAutomatico.onclick = () => {
  // En proceso
  window.clearInterval(video_bucle); // Paramos el modo bucle si lo hubiera
  manual = false; // Deshabilitamos la opción de cambiar de vídeos
  console.log("Click iniciar Automático");
  video1.play();
  video2.play();
  video3.play();
  video4.play();
  contador();
  automatic = window.setInterval('contador()',10000);
};

iniciarBucle.onclick = () => {
  console.log("Click iniciar Bucle");
  window.clearInterval(automatic); // Paramos el modo automático si lo hubiera
  window.clearInterval(video_bucle);
  video1.play();
  video2.play();
  video3.play();
  video4.play();
  bucle = true;
  manual = true;
  inicio_bucle = videoMain.currentTime;
  contador2();
  video_bucle = window.setInterval('contador2()',10000);
};

function contador2() {
  if (video_sel == 1){
    videoMain.src = video1.src;
  }else if (video_sel == 2){
    videoMain.src = video2.src;
  }else if (video_sel == 3){
    videoMain.src = video3.src;
  }
  videoMain.currentTime = inicio_bucle;
  videoMain.play();
}

play1.onclick = () => {
  if (manual == true){
    video_sel = 1;
    console.log("Click vídeo 1");
    if (bucle == true){
      window.clearInterval(video_bucle);
      inicio_bucle = video1.currentTime;
      video_bucle = window.setInterval('contador2()',10000);
    } else {
      videoMain.src = video1.src;
      videoMain.currentTime = video1.currentTime;
      videoMain.play();
    }
  }
};


play2.onclick = () => {
  if (manual == true){
    video_sel = 2;
    console.log("Click vídeo 2");
    if (bucle == true){
      window.clearInterval(video_bucle);
      inicio_bucle = video2.currentTime;
      video_bucle = window.setInterval('contador2()',10000);
    } else {
      videoMain.src = video2.src;
      videoMain.currentTime = video2.currentTime;
      videoMain.play();
    }
  }
};
play3.onclick = () => {
  if (manual == true){
    video_sel = 3;
    console.log("Click vídeo 3");
    if (bucle == true){
      window.clearInterval(video_bucle);
      inicio_bucle = video3.currentTime;
      video_bucle = window.setInterval('contador2()',10000);
    } else {
      videoMain.src = video3.src;
      videoMain.currentTime = video3.currentTime;
      videoMain.play();
    }
  }
};

play4.onclick = () => {
  console.log("Emision en pruebas");
  window.clearInterval(automatic); // Paramos el modo automático si lo hubiera
  window.clearInterval(video_bucle); // Paramos el modo bucle si lo hubiera
  video1.play();
  video2.play();
  video3.play();
  video4.play();
  videoMain.src = video4.src;
  videoMain.currentTime = video4.currentTime;
  videoMain.play();
  manual = true;
  bucle = false;
}
//-- Funcion de retrollamada del boton de parar
//stop.onclick = () => {
  //videoMain.pause();

  //-- Quitar la fuente de video, para que se muestre la
  //-- imagen definida en el atributo poster
  //videoMain.src=null;
//}
