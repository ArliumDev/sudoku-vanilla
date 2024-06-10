const board = document.getElementById('board');
const keys = document.getElementById('keys');
let cell;
let key;
let selected;

// Esto hace un array de 9 índices, los cuales a su vez son un array de 9 índices.

const boardArr = Array(9)
  .fill(null)
  .map(() => Array(9).fill(null));

// Función que genera el tablero de juego con botones por casillas de manera automática y repetida hasta cumplir las 81 casillas del tablero, asignándoles un ID a cada una, y un Event Listener que toma como parámetro una función que dibuja el número en la casilla.

const createGameTable = () => {
  for (let i = 0; i < 81; i++) {
    cell = document.createElement('button');
    cell.classList.add('cell');
    cell.setAttribute('id', [i]);
    cell.addEventListener('click', drawNumber);
    board.appendChild(cell);
  }
};

// Función que genera los botones de manera automática y repetida hasta cumplir con los 9 valores posibles para decidir qué número queremos dibujar en la casilla, asignándoles un ID a cada uno, y un Event Listener que toma como parámetro una función que guarda el número seleccionado para dibujarlo en la casilla que cliquemos.

const createGameKeys = () => {
  for (let i = 1; i < 10; i++) {
    key = document.createElement('button');
    key.classList.add('key');
    key.setAttribute('value', [i]);
    key.addEventListener('click', selectNumber);
    key.innerText = [i];
    keys.appendChild(key);
  }
};

// Función que guarda en una variable el valor del número seleccionado para dibujarlo en la casilla que cliquemos en el tablero.

const selectNumber = (e) => {
  selected = parseInt(e.target.value);
};

// Función que dibuja el número en la casilla que cliquemos. Recoge el disparador de evento y lo asocia a una variable 'drawCell' para usarla más tarde, y dos fórmulas asociadas a las variables 'rowIndex' y 'colIndex' que calculan el índice de fila y columna respectivamente.

const drawNumber = (e) => {
  const drawCell = e.target;
  const rowIndex = Math.floor(drawCell.id / 9);
  const colIndex = drawCell.id % 9;

  // Chequea que el número seleccionado a dibujar en el tablero no se encuentre ya en la fila de la celda donde queremos dibujarlo.

  for (let i = 0; i < boardArr.length; i++) {
    if (boardArr[i][colIndex] === selected) {
      console.log('El número ya está en columna');
      console.log(boardArr[i][colIndex]);
      return;
    }
  }
  // Chequea que el número seleccionado a dibujar en el tablero no se encuentre ya en la columna de la celda donde queremos dibujarlo.

  for (let i = 0; i < boardArr.length; i++) {
    if (boardArr[rowIndex][i] === selected) {
      console.log('El número ya está en fila');
      console.log(boardArr[rowIndex][i]);
      return;
    }
  }

  // Bucle for anidado que recorre los índices de los subarrays de boardArr. Si el ID de 'drawCell' es igual al resultado de la fórmula para calcular la posición actual en el array 2D (boardArr) a partir de 'drawCell.id', se dibuja el el número que seleccionamos anteriormente para dibujar, y se añade a la posición calculada del array 2D (boardArr)

  /* 
  i * boardArr[i].length + j calcula la posición del actual en el array 2D como sigue:
  
  1. Multiplica el index de fila 'i' por el número de elementos en la fila actual ('boardArr[i].length')
  2. Agrega el index de columna 'j' a la posición calculada en el paso anterior
  */

  for (let i = 0; i < boardArr.length; i++) {
    for (let j = 0; j < boardArr[i].length; j++) {
      if (parseInt(drawCell.id) === i * boardArr[i].length + j) {
        drawCell.innerText = selected;
        boardArr[i][j] = parseInt(drawCell.innerText);
        console.log(boardArr);
        return;
      }
    }
  }
};

createGameTable();
createGameKeys();
