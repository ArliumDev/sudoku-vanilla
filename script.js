const board = document.getElementById('board');
const keys = document.getElementById('keys');
let cell;
let key;
let selected;
let assistant = false;
let eraser = false;
let note = false;
let gameHistory = [];
let moveCount = 1;
let boardArr;
let notesBoardArr;

const wipedBoardArr = Array(9)
  .fill(null)
  .map(() => Array(9).fill(null));

const wipeBoards = () => {
  boardArr = JSON.parse(JSON.stringify(wipedBoardArr));
  notesBoardArr = JSON.parse(JSON.stringify(wipedBoardArr));
};

const createGameTable = () => {
  for (let i = 0; i < 81; i++) {
    cell = document.createElement('button');
    cell.classList.add('cell');
    cell.setAttribute('id', [i]);
    cell.addEventListener('click', drawNumber);
    cell.addEventListener('click', erase);
    cell.addEventListener('click', notes);
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

const selectNumber = (e) => {
  eraser = false;
  console.log('eraser out');
  selected = parseInt(e.target.value);
};

const drawNumber = (e) => {
  const drawCell = e.target;

  if (assistant) {
    const rowIndex = Math.floor(drawCell.id / 9);
    const colIndex = drawCell.id % 9;

    for (let i = 0; i < boardArr.length; i++) {
      if (boardArr[i][colIndex] === selected) {
        console.log('El número ya está en columna');
        console.log(boardArr);
        return;
      }
    }

    for (let i = 0; i < boardArr.length; i++) {
      if (boardArr[rowIndex][i] === selected) {
        console.log('El número ya está en fila');
        console.log(boardArr);
        return;
      }
    }
  }

  if (!eraser && note == false && selected !== undefined) {
    for (let i = 0; i < boardArr.length; i++) {
      for (let j = 0; j < boardArr[i].length; j++) {
        if (parseInt(drawCell.id) === i * boardArr[i].length + j) {
          gameHistory.push({ type: 'move', cellId: parseInt(drawCell.id), value: drawCell.innerText, movement: moveCount++, class: '' });
          drawCell.classList.remove('notes');
          drawCell.innerText = selected;
          boardArr[i][j] = selected;
          console.log(boardArr);
          return;
        }
      }
    }
  }
};

const newGame = () => {
  wipeBoards();
  const cleanCell = document.querySelectorAll('.cell');
  cleanCell.forEach((cell) => (cell.innerText = ''));
  console.log(boardArr, notesBoardArr);
};

const undo = () => {
  const undoChanges = gameHistory.pop();

  if (undoChanges) {
    const drawCell = document.getElementById(undoChanges.cellId);
    const rowIndex = Math.floor(undoChanges.cellId / 9);
    const colIndex = undoChanges.cellId % 9;

    if (undoChanges.type === 'move' || undoChanges.type === 'eraseWrite') {
      boardArr[rowIndex][colIndex] = undoChanges.value ? parseInt(undoChanges.value) : null;
      drawCell.classList.remove('notes');
      drawCell.innerText = undoChanges.value;
    } else if (undoChanges.type === 'note' || undoChanges.type === 'eraseNote') {
      notesBoardArr[rowIndex][colIndex] = undoChanges.value ? parseInt(undoChanges.value) : null;
      drawCell.classList.add('notes');
      drawCell.innerText = undoChanges.value;
    }
  }
};

const erase = (e) => {
  const drawCell = e.target;

  if (eraser) {
    for (let i = 0; i < boardArr.length; i++) {
      for (let j = 0; j < boardArr[i].length; j++) {
        if (parseInt(drawCell.id) === i * boardArr[i].length + j) {
          gameHistory.push({ type: 'eraseMove', cellId: parseInt(drawCell.id), value: drawCell.innerText, class: 'none' });
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
          gameHistory.push({ type: 'eraseNote', cellId: parseInt(drawCell.id), value: drawCell.innerText, class: 'notes' });
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
          gameHistory.push({ type: 'note', cellId: parseInt(drawCell.id), value: drawCell.innerText, class: 'notes' });
          drawCell.classList.add('notes');
          drawCell.innerText = selected;
          notesBoardArr[i][j] = selected;
          console.log(notesBoardArr);
          return;
        }
      }
    }
  }
};

const assistMode = () => {
  assistant = !assistant;
  assistant ? console.log('Estoy activo') : console.log('Estoy out');
};

const isEraserOn = () => {
  eraser = !eraser;
  note = false;
  console.log('eraser es: ' + eraser);
  console.log('note es: ' + note);
};

const isNotesOn = () => {
  note = !note;
  eraser = false;
  console.log('note es: ' + note);
  console.log('eraser es: ' + eraser);
};

createGameTable();
createGameKeys();
wipeBoards();