const board = document.getElementById('board');
const keys = document.getElementById('keys');
let selected;
let cell;
const lastMove = [];
let erase = false;

const createGameTable = () => {
  for (let i = 0; i < 81; i++) {
    cell = document.createElement('button');
    cell.onclick = drawNumber;
    cell.classList.add('cell');
    cell.setAttribute('value', [i]);
    board.appendChild(cell);
  }
  for (let i = 1; i < 10; i++) {
    let key = document.createElement('button');
    key.onclick = selectNumber;
    key.innerText = [i];
    key.classList.add('key');
    keys.appendChild(key);
  }
};

const isEraserOn = () => {
  erase = !erase;
  console.log(erase);
}

const drawNumber = (e) => {
  e.target.innerText = selected;
  lastMove.push(e.target.innerText);
  console.log(e.target.value);
  console.log(lastMove);
};

const selectNumber = (e) => {
  selected = e.target.innerText;
};

createGameTable();

const eraser = () => {

}

const undo = () => {
  lastMove.pop();
  console.log(lastMove);
}

// const table = Array(81).fill(null);
// const initialTable = 0;

// console.log(table);

/* La función de Erase será un toggle que responda tanto a darle click para activar y desactivar, como también al darle a cualquier otra tecla (que no celda). Planteamiento en caliente: Hacer un pop a la posición del array de la celda que se quiera borrar. El undo sería con un pop pero a la última posición de un array copia que registre todos los movimientos*/
