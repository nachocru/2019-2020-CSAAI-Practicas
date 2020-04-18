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
var iniciado = false;
var controlador = 1;

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
videoMain.poster="https://github.com/myTeachingURJC/2019-2020-CSAAI/raw/master/L10/test.png";
video1.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4"
video2.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4"
video3.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4"


//-- Obtener los botones
const play1 = document.getElementById("Video1")
const play2 = document.getElementById("Video2")
const play3 = document.getElementById("Video3")
const iniciarNormal = document.getElementById("Inicio1")
const iniciarAutomatico = document.getElementById("Inicio2")

//-- Función de retrollamada del botón de ver
iniciarNormal.onclick = () => {
  console.log("Click iniciar Normal");
  video1.play();
  video2.play();
  video3.play();
  iniciado = true;
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
  console.log("Click iniciar Automático");
  video1.play();
  video2.play();
  video3.play();
  contador();
  window.setInterval('contador()',2000);
};

play1.onclick = () => {
  if (iniciado == true){
    console.log("Click vídeo 1");
    videoMain.src = video1.src;
    videoMain.currentTime = video1.currentTime;
    videoMain.play();
  }
};

play2.onclick = () => {
  if (iniciado == true){
    console.log("Click vídeo 2");
    videoMain.src = video2.src;
    videoMain.currentTime = video2.currentTime;
    videoMain.play();
  }
};
play3.onclick = () => {
  if (iniciado == true){
    console.log("Click vídeo 3");
    videoMain.src = video3.src;
    videoMain.currentTime = video3.currentTime;
    videoMain.play();
  }
};
//-- Funcion de retrollamada del boton de parar
//stop.onclick = () => {
  //videoMain.pause();

  //-- Quitar la fuente de video, para que se muestre la
  //-- imagen definida en el atributo poster
  //videoMain.src=null;
//}
