const board = document.getElementById("board");
const keys = document.getElementById("keys");
let selected;
let cell;

for (let i = 0; i < 81; i++) {
  cell = document.createElement("button");
  cell.onclick = drawNumber;
  cell.classList.add("cell");
  board.appendChild(cell);
}

for (let i = 1; i < 10; i++) {
  let key = document.createElement("button");
  key.onclick = selectNumber;
  key.innerText = [i];
  key.classList.add("key");
  keys.appendChild(key);
}

function selectNumber(e) {
  selected = e.target.innerText;
  console.log(selected);
}

function drawNumber(e) {
  e.target.innerText = selected;
}