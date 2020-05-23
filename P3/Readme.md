# Práctica 3
En esta práctica hemos implementado el videojuego retro Pong!
Lo primero que nos encontramos es la pantalla del juego junto con tres botones en
la parte inferior. Los botones tienen las siguientes funciones:
- Botón controls: Nos muestra una ventana con los controles básicos del juego, que
son la tecla s para el saque, las teclas q y a para mover la raqueta izquierda y las teclas
p y l para mover la raqueta derecha en el caso de 2 jugadores. Podemos acceder al menú controles
en cualquier momento, ya sea en la pantalla de inicio, o durante el juego. Para salir de
este menú debemos pulsar la tecla r.
- Botón Start: Cuando hayamos seleccionado el modo en el que queremos jugar, ya sea de 1
o 2 jugadores, debemos presionar este botón para iniciar el juego. Este botón sólo funcionará si
estamos en la pantalla de inicio.
- Botón Exit: Ese botón sirve para salir de la partida en cualquier momento, ya sea a mitad de
una partida o cuando esta ya ha finalizado y vemos el mensaje final, devolviéndonos de nuevo al
menú inicial e inicializando todas las variables que luego explicaremos como marcadores o el
tiempo de juego.

Para seleccionar un modo de juego, podemos pulsar la tecla b o h que, acompañándose de unos
sonidos de selección nos permitirán iniciar cualquiera de los modos.
A continuación se van a detallar algunos aspectos genéricos que se aplican a ambos
modos de juego, y luego se particularizará las implementaciones exclusivas de cada modo:

- Las raquetas están limitadas al espacio de la pantalla, es decir, si subimos la raqueta
hasta el límite superior o inferior esta se detendrá, quedando siempre visibles a los
jugadores.

- El primer saque lo realizará el jugador 1 (situado a la izquierda) y a partir de ahí
sacará el jugador que pierda el anterior punto, siempre con la tecla s.

- Tanto el ángulo como la velocidad de saque serán aleatorios dentro de un rango restringido,
lo que variará la dinámica del juego y la dificultad.

- Cuando se produce un gol, se actualizan los marcadores que se muestran en todo momento en
pantalla, hasta llegar al marcador tope establecido en 5 goles, aunque este parámetro se
puede variar en función de los gustos de los jugadores.

- Cuando alguno de los jugadores llega al número máximo de goles, el juego termina y se
muestra un mensaje y una música indicando el resultado final del juego y el ganador.

- Se considera gol cuando la pelota rebasa la raqueta de los jugadores.

- Si la pelota choca con la parte de arriba o abajo, rebota invirtiendo su ángulo.

- Si la pelota choca con las raquetas de los jugadores, la pelota se devuelve en sentido
contrario en función de si en el momento del golpe la raqueta estaba o no en movimiento:

- Si estaba en movimiento, se transmite a la pelota el mismo ángulo con el que se movía la raqueta.

- Si estaba estática, la raqueta se divide en 4 tramos y la pelota saldrá rebotada en función
de la parte de la raqueta con la que choque.

- De forma aleatoria, cualquier jugador puede producir un super-tiro, con una velocidad mayor
de lo habitual, lo que dificultará mucho la respuesta del rival. Este tiro viene acompañado de un
sonido especial.

- Se ha introducido un contador de tiempo que calcula el tiempo de partida, solo transcurre
durante el juego y se para antes de sacar. Si salimos del juego, se reinicia a 0.

Los distintos modos de juego implican las siguientes características:
- Modo un jugador: En este modo jugaremos contra la CPU, que se mueve de forma automática
con una velocidad constante. Cuando la raqueta de la CPU llega al límite superior o inferior
de la pantalla, simplemente invierte su movimiento provocando una transición constante.
La raqueta de la CPU tendrá un tamaño muy grande, pero cada vez que golpee la bola su tamaño
se reducirá un poco, dejando más esppacio libre para el paso de la bola y así poder anotar
un gol. Es posible que hagan falta varios rebotes para generar el hueco adecuado para marcar
el gol. Cuando se produce un gol indistintamente del jugador, vuelve a su estado inicial de tamaño.

- Modo dos jugadores: En este modo se podrán controlar de forma manual tanto la raqueta de la derecha
como la de la izquierda, de forma simulltánea por dos jugadores.

Se han implementado sonidos en todas las interacciones del juego, ya sea al seleccionar un modo de
juego en el menú inicial o el panel de controles, sonido de saque, rebote, gol, música de inicio de
partida y de final cuando alguno de los jugadores llega al límite de goles, e incluso una canción de
derrota si perdemos contra la CPU.

El estilo de la práctica se ha variado mediante tamaños de letra, colores u otras propiedades
que podemos visualizar durante el juego, que lo hace visualmente intuitivo y cómodo.

Internamente, la práctica funciona mediante una máquina de estados que controla en qué punto del
juego estamos, si en alguno de los mdos de juego, en su fase de saque, de juego, cuando
este ya ha acabado, o en alguno de los menús. También mencionar que para optimizar el proceso, los
códigos con las características de las raquetas y la bola se implementan en unos ficheros aparte. 
