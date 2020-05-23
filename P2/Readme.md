# Práctica 2
En esta práctica hemos implementado una calculadora:
En cuanto al funcionamiento, la calculadora funciona como una calculadora normal,
realizando odo tipo de operaciones y controlando algunos errores. Internamente
la calculadora funciona mediante una máquina de estados que evalúa si estamos en
una situación inicial, en algún operando, en algún símbolo de operación o en un resultado.
A continuación voy a explicar el control de algunos errores contemplados en la calculadora:

- Si se encuentra en su posición inicial, muestra un 0 por pantalla, y no se añadirá
nada si lo primero que pulsamos es otro 0, un punto, la tecla ans o cualquiera de
las operaciones (ya que no se puede operar algo cuando no hay elementos).
- Con la tecla "Del" somos capaces de borrar el último dígito escrito, ya sea un número,
algún símbolo de operación (pasando al estado de operando), e incluso permite eliminar
dígitos en un resultado. Además si borramos todos los elementos que había en el display
la máquina de estados se sitúa en su posición inicial.
- La tecla "AC" nos permite borrar el contenido que hubiera por pantalla, volviendo a
nuestro estado inicial.
- La tecla "ans" nos guarda el último resultado de operación. Inicialmente está a 0, y
a partir de la primera operación que realicemos tomará el valor del resultado. Se puede
hacer uso de la tecla "ans" como si fuera la tecla de cualquier otro dígito, pero con valor
de la última operación realizada.
- No podemos poner varios símbolos de operaciones seguidos, lo cual daría lugar a error.
Es decir, si tenemos un símbolo +, lo próximo que se debe pulsar debería ser un número.
- Se pueden concatenar operaciones, es decir, cuando hacemos un cálculo y pulsamos al =
nos mostrará el resultado por pantalla. Si inmediatamente después de obtener un resultado
pulsamos un número, este número sobreescribe al resultado (que pasa a estar en la tecla ans),
pero si con el resultado en pantalla pulsamos algún símbolo de operación como +, -, etc,
el resultado anterior pasará a ser el operando 1 de la operación pulsada.
- No se permite evaluar una operación con la tecla = si no hay al menos 2 operandos separados
por un símbolo de operación.

Por último vamos a comentar el estilo que hemos seguido para la práctica. Hemos implementado
mediante css un estilo basado en botones, cada uno con unas características de colores, rellenos,
tipología y color de las letras, redondeo de los bordes y sombreado específicos. De igual manera
hemos modificado el display principal de la calculadora (donde mostramos las operaciones) aportando
unas características estéticas específicas, con el objetivo de simular en la manera de lo posible
el aspecto de una calculadora real. Mencionar también que hemos añadido una imagen de fondo
para dar más ambientación al contexto de la práctica.
