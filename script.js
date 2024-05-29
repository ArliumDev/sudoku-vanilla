const board = document.getElementById('board');
const keys = document.getElementById('keys');
let cell;
let key;
let selected;

// Esto hace un array de 9 índices, los cuales a su vez son un array de 9 índices. De esta manera, hemos armado 9 filas para poder comprobar si ya existe el número a escribir en esa fila, y solamente habrá que pensar cómo hacerlo con las columnas. Iterar sobre array de filas y luego el de columnas. (Perplexity)

const boardArr = Array(9)
  .fill(null)
  .map(() => Array(9).fill(null));

console.log(boardArr);

const createGameTable = () => {
  for (let i = 0; i < 81; i++) {
    cell = document.createElement('button');
    cell.classList.add('cell');
    cell.setAttribute('id', [i]);
    cell.addEventListener('click', drawNumber);
    board.appendChild(cell);
  }
};

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

const rowColChecker = (board, row, col, num) => {
  // Comprobar si ya estaba en fila
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num && i !== col) {
      console.log('Ya estaba ese número en la fila');
    }
  }
  // Comprobar si ya estaba número en columna
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num && i !== row) {
      console.log('Ya estaba ese número en la columna');
    }
  }
};

const selectNumber = (e) => {
  selected = e.target.value;
};

const drawNumber = (e) => {
  const drawCell = e.target;
  drawCell.innerText = selected;
  let found = false;

  for (let i = 0; i < boardArr.length; i++) {
    for (let j = 0; j < boardArr[i].length; j++) {
      if (parseInt(drawCell.id) === i * boardArr[i].length + j) {
        boardArr[i][j] = drawCell.innerText;
        console.log(boardArr);
        found = true;
        break;
      }
    }
    if (found) {
      break;
    }
  }
};

createGameTable();
createGameKeys();