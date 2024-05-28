const cellBoard = document.getElementById("board");
const keys = document.getElementById("keys");

// Esto hace un array de 9 índices, los cuales a su vez son un array de 9 índices. De esta manera, hemos armado 9 filas para poder comprobar si ya existe el número a escribir en esa fila, y solamente habrá que pensar cómo hacerlo con las columnas. Iterar sobre array de filas y luego el de columnas. (Perplexity)

const tableArray = Array(9).fill(null).map(() => Array(9).fill(null));

console.log(tableArray);

const createGameTable = () => {
  for (let i = 0; i < 81; i++) {
    let cell = document.createElement("button");
    cell.classList.add("cell");
    cellBoard.appendChild(cell);
  };
}

const createGameKeys = () => {
  for (let i = 1; i < 10; i++) {
    let key = document.createElement("button");
    key.classList.add("key");
    key.innerText = [i];
    keys.appendChild(key);
  }
}

createGameTable();
createGameKeys();