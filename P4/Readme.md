# Práctica 4
Para esta práctica hemos implementado un realizador de TV.
Cuando cargamos la práctica nos encontramos con un cuadrado
gande que será en el que emitamos el vídeo elegido. Por defecto aparece
una imagen estática, que se muestra cada vez que no hay un vídeo para reproducirse.
Debajo del cuadrado grande tenemos cada una de las fuentes de vídeo
que podremos ir seleccionando en función de las distintas opciones.
Inicialmente todas las previsualizaciones de los vídeos están paradas, y no se
muestra ningún vídeo en el cuadrado principal. Podemos hacer una de las siguientes
funciones apretando en su correspondiente botón:
- Iniciar modo normal: Esta es la opción principal del realizador. Cuando iniciamos
este modo, se activarán las previsualizaciones de las fuentes de vídeo y se habilitará
el poder seleccionar alguno de ellos para mostrarlo por la pantalla de vídeo en emisión.
Hasta que no seleccionamos algún vídeo no se muestra ninguno, aunque sí podemos ver las
previsualizaciones. El tiempo del vídeo principal coincide con el seleccionado.
- Iniciar modo automático: En este modo, a diferencia del anterior, no podremos
seleccionar el vídeo que queremos visualizar, sino que estos se irán alternando de
manera consecutiva ( vídeo 1, 2 y 3) cada 10 segundos. Si pulsamos en seleccionar
de cualquier vídeo, se ignorará y seguirá con el cambio automático. El tiempo del
vídeo seleccionado también coincide con el de su previsualización.
- Iniciar modo bucle: Este último modo lo que nos permite es repetir una secuencia de
cualquiera de los vídeos con duración de 10 segundos. Por defecto si pulsamos esta
opción al iniciar el programa se seleccionará el vídeo 1, pero podemos cambiar de
vídeo en cualquier momento seleccionando en su botón correspondiente. Eso sí, el cambio
de vídeo se evalúa cada 10 segundos, es decir, hasta que no transcurra ese tiempo no se
cambiará de vídeo si hemos seleccionado otro. Ejemplo: Selecciono el modo bucle y por
defecto se repetirá la secuencia del vídeo 1 del segundo 1 al 10. Justo en el segundo 3
pulso en el vídeo 2, por lo que transcurridos los 10 primeros segundos, se reproducirá
en bucle el vídeo 2 del segundo 3 al 13. En este modo el tiempo del vídeo en emisión
no coincide con los de las previsualizaciones, sino que se tiene en cuenta el momento en
el que se pulsó el click del vídeo.
- Emisión en pruebas: Por último hemos implementado un cuarto canal de vídeo que se puede
seleccionar en cualquier momento ( tanto al inicio como después de haber seleccionado cualquier
modo) que muestra una imagen estática de emisión en pruebas. Este modo nos devuelve por defecto
al modo normal, por lo que inmediatamente después de pulsar este canal, se puede seleccionar
cualquier otro como si estuviéramos en el modo normal. Si queremos volver al modo automático o
al modo bucle deberemos seleccionar en iniciar modo automático/bucle.
