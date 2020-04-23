console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');
const Grises = document.getElementById("Grises");
const Colores = document.getElementById("Colores");
var estado = "colores";

//-- Acceso al deslizador
const deslizador_R = document.getElementById('deslizador_R');

//-- Valor del deslizador
const range_value_R = document.getElementById('range_value_R');

//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  console.log("Imagen lista...");
};

Grises.onclick = () => {
  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  estado = "grises";
  ctx.drawImage(img, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    brillo = (3 * data[i] + 4 * (data[i+1]) + (data[i+2]))/8
    data[i] = brillo;
    data[i+1] = brillo;
    data[i+2] = brillo;
  }
  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);

}

Colores.onclick = () => {
  estado = "colores";
  ctx.putImageData(transformar_R(), 0, 0);
}

//-- Funcion de retrollamada del deslizador
deslizador_R.oninput = () => {
  if (estado == "colores"){
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(transformar_R(), 0, 0);

  }
}
function transformar_R() {
  //-- Mostrar el nuevo valor del deslizador
  range_value_R.innerHTML = deslizador_R.value;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Obtener el umbral de rojo del desliador
  umbral = deslizador_R.value

  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbral)
      data[i] = umbral;
  }

  //-- Poner la imagen modificada en el canvas
  return imgData;

}
console.log("Fin...");
