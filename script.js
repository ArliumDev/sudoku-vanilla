const board = document.getElementById('board');
const keys = document.getElementById('keys');
const lastMove = [];
const tableStatus = Array(81).fill(null);
const tableNotes = Array(81).fill(null);
let selected = '';
let cell;
let erase = false;
let notes = false;

// Función que crea las casillas del tablero y las keys de los números para rellenar este.

const createGameTable = () => {
  for (let i = 0; i < 81; i++) {
    cell = document.createElement('button');
    cell.classList.add('cell');
    cell.setAttribute('id', [i]);
    cell.addEventListener('click', drawNumber);
    cell.addEventListener('click', eraser);
    board.appendChild(cell);
  }
  for (let i = 1; i < 10; i++) {
    let key = document.createElement('button');
    key.onclick = selectNumber;
    key.innerText = [i];
    key.setAttribute('value', [i]);
    key.classList.add('key');
    keys.appendChild(key);
  }
};

// Funciones para utilizar el valor de las keys y dibujar el mismo en la casilla del tablero que se clique.

const selectNumber = (e) => {
  selected = e.target.value;
};

/* 

- El primer bloque comprueba que haya alguna key seleccionada, que las anotaciones estén desactivadas y que el erase esté desactivado, quitando la clase 'notes' del valor a dibujar, dibujando el valor en la casilla clicada, y añadiendo ese cambio a la posición correspondiente del array 'tableStatus'

- El segundo bloque comprueba que haya alguna key seleccionada, que las anotaciones estén activadas y que el erase esté desactivado, añadiendo la clase 'notes' al valor a dibujar, dibujando el valor en la casilla clicada con un estilo definido para diferenciar que es una anotación, y añadiendo ese cambio a la posición correspondiente del array 'tableNotes'

- El tercer y último bloque simplemente retorna al no cumplirse ninguna de las anteriores condiciones, haciendo que no se escriba nada


*/

const drawNumber = (e) => {
  if (selected !== '' && notes == false && erase == false) {
    e.target.classList.remove('notes');
    e.target.innerText = selected;
    tableStatus[e.target.id] = selected;
    console.log(tableStatus);
    lastMove.push({ number: selected, id: e.target.id });
  } else if (selected !== '' && notes == true && erase == false) {
    e.target.classList.add('notes');
    e.target.innerText = selected;
    tableNotes[e.target.id] = selected;
    lastMove.push({ number: selected, id: e.target.id });
    console.log(tableNotes);
  } else {
    return;
  }
};

// Funciones toggle. 'isEraserOn' hace toggle al eraser, y 'isNotesOn' hace toggle a las anotaciones

const isEraserOn = () => {
  erase = !erase;
  console.log(erase);
};

const isNotesOn = () => {
  notes = !notes;
  console.log(notes);
};

// TODO: Arreglar bug con la función de eraser y undo. Mirar notas.

// Funciones de eraser y undo. La primera activa el eraser y borra el número de la casilla donde se clique. La segunda deshace el último movimiento realizado en el tablero.

const eraser = (e) => {
  if (erase == false) {
    console.log("I can't erase");
    return;
  }
  if (e.target.classList.contains('notes')) {
    e.target.innerText = '';
    tableNotes[e.target.id] = null;
    console.log(tableNotes);
  }
   else {
    console.log('I can erase');
    e.target.innerText = '';
    tableStatus[e.target.id] = null;
    console.log(tableNotes);
  }
};

const undo = () => {
  if (lastMove.length > 0) {
    const lastAdd = lastMove.pop();
    const cell = document.querySelector(`button[id="${lastAdd.id}"]`);
    cell.innerText = '';
    console.log(lastMove);
    console.log(tableNotes);
  }
};

// Llamada a la función de creación del tablero y las keys

createGameTable();
