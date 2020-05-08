# Práctica 5
En esta práctica hemos implementado diferentes funciones
y filtros para modificar una imagen.
En primer lugar disponemos de 2 imágenes originales y podremos seleccionar
cuál de ellas modificar pulsando el botón correspondiente de cada foto.
Es decir, si pulsamos el botón "Seleccionar imagen 1", esta imagen se
mostrará en el canvas de imagen manipulada y será la que modificaremos
pulsando en las diferentes opciones. Lo mismo ocurre con la imagen 2.
En cualquier momento podemos cambiar de imagen y esta se mostrará
en su forma original.
A continuación disponemos de varias opciones para modificar las imágenes:
- Grises: Toma la imagen que estuviera en el canvas (ya sea la original
o con alguna otra modificación) y la pone en escala de grises.
- Colores: Muestra la imagen original y permite modificar cada uno de los
valores de sus componentes RGB en función de los umbrales que presenten los
deslizadores. Es decir, si el deslizador de la componente R está en 100,
ningún píxel podrá superar ese umbral 100 en su componente R.
Los deslizadores solo funcionan cuando esta opción está seleccionada.
- Especular: Muestra la imagen en forma de espejo.
- Invertir: Invierte los píxeles de la imagen de manera que la esquina
superior izquierda pasa a ser la esquina inferior derecha.
- Negativo: Muestra la imagen original con sus componentes de color RGB
en negativo. Esto es, el negativo de cada componente es su valor complementario
hasta llegar a 255 (rango de colores para 8 bits). Así, un valor R puro a 255,
pasará a ser un negro de valor 0.
- Vintage: Se le aplica un filtro Sepia a la imagen original mediante una
matriz de transformación,que produce el efecto visual de una imagen vintage.
