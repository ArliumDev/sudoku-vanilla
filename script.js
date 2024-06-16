const board = document.getElementById('board');
const keys = document.getElementById('keys');
const eraserButton = document.getElementById("eraser");
const notesButton = document.getElementById("notes");
let cell;
let key;
let selected;
let assistant = false;
let eraser = false;
let note = false;
let lastMovementArr = [];

/* 
  Esto hace un array de 9 índices, los cuales a su vez
  son un array de 9 índices. Usamos 'wipedBoardArr' 
  como plantilla vacía con la que poder resetear el 
  array cuando juguemos una nueva partida, 
  y 'BoardArr' será el que gestione las partidas.
*/

const wipedBoardArr = Array(9)
  .fill(null)
  .map(() => Array(9).fill(null));

/* 
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
*/

const boardArr = JSON.parse(JSON.stringify(wipedBoardArr));
const notesBoardArr = JSON.parse(JSON.stringify(wipedBoardArr));

/* 
  Función que genera el tablero de juego con botones 
  por casillas de manera automática y repetida hasta 
  cumplir las 81 casillas del tablero, asignándoles 
  un ID a cada una, y un Event Listener que toma como 
  parámetro una función que dibuja el número en la 
  casilla correspondiente; también genera los 9 
  botones de números a escribir en el tablero de 
  la misma manera que las casillas mencionadas.
*/

const createTable = (cell, boardDiv, key, keysDiv) => {
  for (let i = 0; i < 81; i++) {
    cell = document.createElement('button');
    cell.classList.add('cell');
    cell.setAttribute('id', [i]);
    cell.addEventListener('click', drawNumber);
    cell.addEventListener('click', erase);
    cell.addEventListener('click', notes);
    boardDiv.appendChild(cell);
  }

  for (let j = 1; j < 10; j++) {
    key = document.createElement('button');
    key.classList.add('key');
    key.setAttribute('value', [j]);
    key.addEventListener('click', selectNumber);
    key.innerText = [j];
    keysDiv.appendChild(key);
  }
}

/* 
  Función que guarda en una variable el valor del 
  número seleccionado para dibujarlo en la casilla 
  que cliquemos en el tablero.
*/

const selectNumber = (e) => {
  selected = parseInt(e.target.value);
};

/* 
  Función que gestiona el toggle del 'Assist Mode', 
  modo que ayuda al jugador a no repetir un número 
  ya existente en fila y/o columna.
*/

const assistMode = () => {
  assistant = !assistant;
  assistant ? console.log('Estoy activo') : console.log('Estoy out');
};

/*
  Función que dibuja el número en la casilla que 
  cliquemos. Recoge el disparador de evento y 
  lo asocia a una variable 'drawCell' para usarla
  más tarde, y dos fórmulas asociadas a las variables
  'rowIndex' y 'colIndex' que calculan el índice de 
  fila y columna respectivamente.
*/

const drawNumber = (e) => {
  const drawCell = e.target;

  if (assistant) {
    const rowIndex = Math.floor(drawCell.id / 9);
    const colIndex = drawCell.id % 9;

    /*
      Chequea que el número seleccionado a dibujar en 
      el tablero no se encuentre ya en la fila de 
      la celda donde queremos dibujarlo.
    */

    for (let i = 0; i < boardArr.length; i++) {
      if (boardArr[i][colIndex] === selected) {
        console.log('El número ya está en columna');
        console.log(boardArr);
        return;
      }
    }

    /* 
      Chequea que el número seleccionado a dibujar en 
      el tablero no se encuentre ya en la columna de 
      la celda donde queremos dibujarlo.
    */

    for (let i = 0; i < boardArr.length; i++) {
      if (boardArr[rowIndex][i] === selected) {
        console.log('El número ya está en fila');
        console.log(boardArr);
        return;
      }
    }
  }

  /* 
    Bucle for anidado que recorre los índices de los 
    subarrays de boardArr. Si el ID de 'drawCell' 
    es igual al resultado de la fórmula para calcular 
    la posición actual en el array 2D (boardArr) 
    a partir de 'drawCell.id', se dibuja el número 
    que seleccionamos anteriormente para dibujar, 
    y se añade a la posición calculada del 
    array 2D (boardArr).
  */

  /* 
  i * boardArr[i].length + j calcula la posición del 
  actual en el array 2D como sigue:
  
  1. Multiplica el index de fila 'i' por el número de 
  elementos en la fila actual ('boardArr[i].length').
  2. Agrega el index de columna 'j' a la posición 
  calculada en el paso anterior.
  */

  if (!eraser && !note && selected !== undefined) {
    for (let i = 0; i < boardArr.length; i++) {
      for (let j = 0; j < boardArr[i].length; j++) {
        if (parseInt(drawCell.id) === i * boardArr[i].length + j) {
          drawCell.classList.remove('notes');
          drawCell.innerText = selected;
          boardArr[i][j] = parseInt(selected);
          lastMovementArr.push({ cellId: parseInt(drawCell.id), number: selected });
          console.log(boardArr);
          return;
        }
      }
    }
  }
};

const undo = () => {
  // TODO: Cambiar 'drawCell.id' por el argumento correspondiente
  // const rowIndex = Math.floor(drawCell.id / 9);
  // const colIndex = drawCell.id % 9;
  lastMovementArr.pop();
};

const erase = (e) => {
  const drawCell = e.target;

  if (eraser) {
    for (let i = 0; i < boardArr.length; i++) {
      for (let j = 0; j < boardArr[i].length; j++) {
        if (parseInt(drawCell.id) === i * boardArr[i].length + j) {
          drawCell.innerText = '';
          boardArr[i][j] = null;
          console.log(boardArr);
          return;
        }
      }
    }
    for (let k = 0; k < notesBoardArr.length; k++) {
      for (let l = 0; l < notesBoardArr.length; l++) {
        if (parseInt(drawCell.id) === k * notesBoardArr.length + l) {
          drawCell.innerText = '';
          notesBoardArr[k][l] = null;
          console.log(notesBoardArr);
          return;
        }
      }
    }
  }
};

const notes = (e) => {
  const drawCell = e.target;

  if (note && selected !== undefined) {
    for (let i = 0; i < notesBoardArr.length; i++) {
      for (let j = 0; j < notesBoardArr[i].length; j++) {
        if (parseInt(drawCell.id) === i * notesBoardArr[i].length + j) {
          drawCell.classList.add('notes');
          drawCell.innerText = selected;
          notesBoardArr[i][j] = parseInt(selected);
          lastMovementArr.push(parseInt(selected));
          console.log(notesBoardArr);
          return;
        }
      }
    }
  }
};

const isEraserOn = () => {
  eraser = !eraser;
  note = false;
  console.log("eraser es: " + eraser);
  console.log("note es: " + note);
};

const isNotesOn = () => {
  note = !note;
  eraser = false;
  console.log("note es: " + note);
  console.log("eraser es: " + eraser);
};

// const isFeatureOn = (e) => {
//   const feature = e.target;
//   switch (feature.id) {
//     case "notes":
//       note = !note;
//       eraser = false;
//       console.log("note es: " + note);
//       console.log("eraser es: " + eraser);
//       break;
//     case "eraser":
//       eraser = !eraser;
//       note = false;
//       console.log("eraser es: " + eraser);
//       console.log("note es: " + note);
//       break;
//   }
// }

createTable(cell, board, key, keys);