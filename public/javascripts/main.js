let count = 0;
let memo = [];
restoreGame();

/** Restoring */
function restoreGame() {
  let xhr = new XMLHttpRequest();
  let url = "/game/restore";

  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.response);
      memo = data.memo;
      count = data.count;
    }
  };
}

function clickHandler(id) {
  const i = id[4];
  const j = id[5];

  const text = print(id);

  contentHandler(id, text);

  const winner = checkWinner(i, j);
  if (winner) {
    text == "x" ? alert("Player 1 won!") : alert("Player 2 won!");

    let xhr = new XMLHttpRequest();
    let url = "/game/reset";

    xhr.open("POST", url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resetGame();
      }
    };
  }
}

function contentHandler(id, text) {
  let xhr = new XMLHttpRequest();
  let url = "/game/update";

  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-Type", "application/json");
  const data = JSON.stringify({ cellId: id, content: text });
  xhr.send(data);
}

/** Function for clicking and printing 'X' or 'O' */
function print(id) {
  const cell = document.getElementById(id);
  const rowId = id[4];
  const colId = id[5];
  let text;
  /** Only when the cell is empty */
  if (cell.innerText.length == 0) {
    count % 2 == 0 ? (text = "x") : (text = "o");
    cell.innerText = text;
    memo[rowId][colId] = text;
    count++;
  }
  return text;
}

/** Functions to check winner */
function checkWinner(rowId, colId) {
  if (checkRow(rowId) || checkCol(colId) || checkDiagnol(rowId, colId)) {
    return true;
  }

  return false;
}

function checkRow(rowId) {
  const row = memo[rowId];
  let flag = 1;

  if (row.length == 5) {
    for (let i = 0; i < 4; i++) {
      if (row[i] != row[i + 1]) {
        flag = 0;
        break;
      }
    }
  } else {
    return false;
  }

  return flag;
}

function checkCol(colId) {
  let flag = 1;

  for (let i = 0; i < 4; i++) {
    if (memo[i][colId] != memo[i + 1][colId]) {
      flag = 0;
      break;
    }
  }

  return flag;
}

function checkDiagnol(rowId, colId) {
  let flag = 1;

  if (rowId === colId) {
    for (let i = 0; i < 4; i++) {
      if (memo[i][i] != memo[i + 1][i + 1]) {
        flag = 0;
        break;
      }
    }
    if (flag) {
      return true;
    }
  }

  if (rowId + colId == 4) {
    for (let i = 0; i < 4; i++) {
      if (memo[i][4 - i] != memo[i + 1][3 - i]) {
        flag = 0;
        break;
      }
    }
    if (flag) {
      return true;
    }
  }

  return false;
}

/** Reseting */
function resetGame() {
  resetTable();
  resetMemo();
  count = 0;
}

function resetTable() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const cell = document.getElementById("cell" + i + j);
      cell.innerText = "";
    }
  }
}

function resetMemo() {
  for (let i = 0; i < 5; i++) {
    memo[i].length = 0;
  }
}
