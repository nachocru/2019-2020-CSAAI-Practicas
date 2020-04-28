console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');
const Grises = document.getElementById("Grises");
const Colores = document.getElementById("Colores");
const Especular = document.getElementById("Especular");
var estado = "colores";

//-- Acceso al deslizador
const deslizador_R = document.getElementById('deslizador_R');
const deslizador_G = document.getElementById('deslizador_G');
const deslizador_B = document.getElementById('deslizador_B');

//-- Valor del deslizador
const range_value_R = document.getElementById('range_value_R');
const range_value_G = document.getElementById('range_value_G');
const range_value_B = document.getElementById('range_value_B');

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
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  console.log("Imagen lista...");
};

Grises.onclick = () => {
  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  estado = "grises";
  ctx.drawImage(img, 0,0, canvas.width, canvas.height);

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
  ctx.putImageData(transformar(), 0, 0);

}
//-- Funcion de retrollamada del deslizador
deslizador_R.oninput = () => {
  if (estado == "colores"){
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(transformar(), 0, 0);

  }
}

deslizador_G.oninput = () => {
  if (estado == "colores"){
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(transformar(), 0, 0);

  }
}

deslizador_B.oninput = () => {
  if (estado == "colores"){
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(transformar(), 0, 0);

  }
}

Especular.onclick = () => {

  ctx.putImageData(especular(), 0, 0);

}

function transformar() {
  //-- Mostrar el nuevo valor del deslizador
  range_value_R.innerHTML = deslizador_R.value;
  range_value_G.innerHTML = deslizador_G.value;
  range_value_B.innerHTML = deslizador_B.value;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0, canvas.width, canvas.height);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Obtener el umbral de rojo del desliador
  umbral_R = deslizador_R.value
  umbral_G = deslizador_G.value
  umbral_B = deslizador_B.value
  console.log(data);
  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbral_R)
      data[i] = umbral_R;
    if (data[i+1] > umbral_G)
      data[i+1] = umbral_G;
    if (data[i+2] > umbral_B)
      data[i+2] = umbral_B;
  }
  //-- Poner la imagen modificada en el canvas
  return imgData;
}

function especular(){
  ctx.drawImage(img, 0,0, canvas.width, canvas.height);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data;
  let new_data = new Array(data.length);
  for (let i = 0; i < data.length/2; i+=4) {
    let temporal1 = data[i];
    let contrario1 = data.length - i;

    let temporal2 = data[i+1];
    let contrario2 = data.length - i + 1;

    let temporal3 = data[i+2];
    let contrario3 = data.length - i + 2;

    let temporal4 = data[i+3];
    let contrario4 = data.length - i + 3;

    data[i] = data[contrario1];
    data[contrario1] = temporal1;

    data[i+1] = data[contrario2];
    data[contrario2] = temporal2;

    data[i+2] = data[contrario3];
    data[contrario3] = temporal3;

    data[i+3] = data[contrario4];
    data[contrario4] = temporal4;

  }
  //-- Poner la imagen modificada en el canvas
  return imgData;

}
console.log("Fin...");
