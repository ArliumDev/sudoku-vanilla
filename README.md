# wipedBoardArr()

Hace un array de 9 índices, los cuales a su vez son un array de 9 índices. Usamos 'wipedBoardArr' como plantilla vacía con la que poder resetear el array cuando juguemos una nueva partida, y 'BoardArr' será el que gestione las partidas.

# wipeBoards()

Creamos una copia profunda del objeto usando JSON.parse(JSON.stringify(obj))
Aquí está el proceso paso a paso:

1. JSON.stringify(obj) convierte el objeto 'obj' en una cadena JSON
2. JSON.parse() convierte la cadena JSON de vuelta en un objeto

Este proceso crea una nueva instancia del objeto, sin compartir referencia con el original

Esto es para hacer una copia profunda del objeto wipedBoardArr, pues al usar el constructor
Array() y el método fill() se crean referencias a los mismos objetos en memoria, de manera que
métodos como slice() o el spread operator no nos sirven.

Necesitamos hacer stringify al objeto y luego parse porque JSON.parse() solo puede parsear
cadenas JSON, no objetos. Cuando hacemos JSON.stringify(obj), estamos convirtiendo el objeto obj
en una cadena JSON. Esta cadena JSON es una representación textual del objeto, que puede ser
almacenada o enviada a través de una red. Luego, cuando hacemos JSON.parse(JSON.stringify(obj)),
estamos convirtiendo la cadena JSON de vuelta en un objeto. Este proceso crea una nueva instancia
del objeto, sin compartir referencia con el objeto original. Este proceso es necesario porque
JSON.parse() solo puede parsear cadenas JSON, no objetos. Si intentamos pasar un objeto directamente
a JSON.parse(), se producirá un error.

# createGameTable()

Función que genera el tablero de juego con botones
por casillas de manera automática y repetida hasta
cumplir las 81 casillas del tablero, asignándoles
un ID a cada una, y un Event Listener que toma como
parámetro una función que dibuja el número en la
casilla correspondiente.

# createGameKeys()

Función que genera los botones de manera automática
y repetida hasta cumplir con los 9 valores posibles
para decidir qué número queremos dibujar en la
casilla, asignándoles un ID a cada uno,
y un Event Listener que toma como parámetro
una función que guarda el número seleccionado
para dibujarlo en la casilla que cliquemos.x

# selectNumber()

Función que guarda en una variable el valor del
número seleccionado para dibujarlo en la casilla
que cliquemos en el tablero.

# drawNumber()

Función que dibuja el número en la casilla que
cliquemos. Recoge el disparador de evento y
lo asocia a una variable 'drawCell' para usarla
más tarde, y dos fórmulas asociadas a las variables
'rowIndex' y 'colIndex' que calculan el índice de
fila y columna respectivamente.

# for (let i = 0; i < boardArr.length; i++) [...]

Chequea que el número seleccionado a dibujar en
el tablero no se encuentre ya en la fila de
la celda donde queremos dibujarlo.

# for (let i = 0; i < boardArr.length; i++) [...]

Chequea que el número seleccionado a dibujar en
el tablero no se encuentre ya en la columna de
la celda donde queremos dibujarlo.

# if (!eraser && note == false && selected !== undefined) [...]

Bucle for anidado que recorre los índices de los
subarrays de boardArr. Si el ID de 'drawCell'
es igual al resultado de la fórmula para calcular
la posición actual en el array 2D (boardArr)
a partir de 'drawCell.id', se dibuja el número
que seleccionamos anteriormente para dibujar,
y se añade a la posición calculada del
array 2D (boardArr).

i \* boardArr[i].length + j calcula la posición del
actual en el array 2D como sigue:

1. Multiplica el index de fila 'i' por el número de elementos en la fila actual('boardArr[i].length').
2. Agrega el index de columna 'j' a la posicióncalculada en el paso anterior.

# undo()

Función que gestiona el deshacer movimientos.

Iguala una constante 'undoChanges' al resultado de realizar 'pop' al array 'gameHistory', quien lleva la cuenta de los movimientos realizados y los valores previos a cada uno.

Comprueba si 'undoChanges' contiene algún valor, y busca el elemento en el HTML mediante el ID que coincida con 'undoChanges.cellId'. Calcula la posición en fila y columna de la celda en el array, como visto anteriormente.

Si 'undoChanges.type' es 'move' o 'eraseWrite', en la posición del array calculada anteriormente va a poner el valor si existe en 'undoChanges.value', si no, pone null; remueve la clase 'notes' si la llegara a tener, y agrega el valor de 'undoChanges.value' al 'drawCell.innerText.

Y lo propio si 'undoChanges.type' es 'note' o 'eraseNote'

# newGame()

Por el momento, limpia el tablero y los array 'boardArr' y 'notesBoardArr'.

