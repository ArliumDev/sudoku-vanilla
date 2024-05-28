const table = document.getElementById("board");
const keys = document.getElementById("keys");

const createGameTable = () => {
  for (let i = 0; i < 81; i++) {
    let cell = document.createElement("button");
    cell.classList.add("cell");
    table.appendChild(cell);
  };

  for (let i = 1; i < 9; i++) {
    let key = document.createElement("button");
    key.classList.add("key");
    key.innerText = [i];
    keys.appendChild("key");
  }
}

createGameTable();