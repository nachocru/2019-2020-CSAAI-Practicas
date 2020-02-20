console.log("Ejecutando JS");

const test = document.getElementById('test')

test.onclick = () => {
  console.log("Click");

  if (test.style.backgroundColor=="") {
    test.style.backgroundColor = "yellow";
  } //con una unica linea de ejeccion no hace falta poner {}

  else {
    test.style.backgroundColor="";
  }
}
