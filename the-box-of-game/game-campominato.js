// Numero di mosse
let moves = 0;

// Seleziona la griglia dal documento HTML
let grid = document.querySelector("#grid");

// Inizializza la board (campo di gioco) vuota
let board = [];

// Costanti per le dimensioni del campo e il numero di mine
const NUM_ROWS = 8;
const NUM_COLS = 8;
const NUM_MINES = 8;

// Flag per determinare se il gioco è in corso
let gameInProgress = true;

// Inizializzazione del campo di gioco
function initBoard() {
  for (let i = 0; i < NUM_ROWS; i++) {
    board[i] = [];
    for (let j = 0; j < NUM_COLS; j++) {
      board[i][j] = {
        isMine: false,
        isRevealed: false,
        count: 0,
      };
      let cell = document.querySelector(
        `#grid > div:nth-child(${i * NUM_COLS + j + 1})`
      );
      cell.setAttribute("data-row", i);
      cell.setAttribute("data-col", j);
      cell.addEventListener("click", handleCellClick);
    }
  }
}

// Posiziona le mine randomicamente sulla board
function placeMines() {
  let minesPlaced = 0;
  while (minesPlaced < NUM_MINES) {
    let row = Math.floor(Math.random() * NUM_ROWS);
    let col = Math.floor(Math.random() * NUM_COLS);
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }
}

// Calcola il numero di mine adiacenti a ciascuna cella
function calculateCounts() {
  for (let i = 0; i < NUM_ROWS; i++) {
    for (let j = 0; j < NUM_COLS; j++) {
      if (board[i][j].isMine) {
        continue;
      }
      let count = 0;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          let ni = i + dx;
          let nj = j + dy;
          if (
            ni >= 0 &&
            ni < NUM_ROWS &&
            nj >= 0 &&
            nj < NUM_COLS &&
            board[ni][nj].isMine
          ) {
            count++;
          }
        }
      }
      board[i][j].count = count;
    }
  }
}

// Rivela una cella
function revealCell(row, col) {
  if (
    row < 0 ||
    row >= NUM_ROWS ||
    col < 0 ||
    col >= NUM_COLS ||
    board[row][col].isRevealed
  ) {
    return;
  }
  board[row][col].isRevealed = true;
  let cell = document.querySelector(
    `#grid > div:nth-child(${row * NUM_COLS + col + 1})`
  );
  cell.classList.add("revealed");

  if (board[row][col].isMine) {
    cell.style.backgroundImage = "url('/asset/img/bomb.png')";
    cell.style.backgroundPosition = "center center";
    cell.style.backgroundSize = "80px 80px";
    cell.style.backgroundColor = "red";
    gameOver(false);
  } else if (board[row][col].count > 0) {
    cell.textContent = board[row][col].count;
  } else {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        revealCell(row + dx, col + dy);
      }
    }
  }
  moves++;
}

// Gestisce il click su una cella
function handleCellClick(e) {
  e.preventDefault();
  if (!gameInProgress) {
    return;
  }

  let row = Number(e.target.getAttribute("data-row"));
  let col = Number(e.target.getAttribute("data-col"));
  revealCell(row, col);
  checkWin();
}

// Controlla se il giocatore ha vinto o perso
function checkWin() {
  let revealedCount = 0;
  let safeCells = NUM_ROWS * NUM_COLS - NUM_MINES;
  let targetRevealedCount = Math.floor(0.8 * safeCells); // 80% delle celle sicure

  for (let i = 0; i < NUM_ROWS; i++) {
    for (let j = 0; j < NUM_COLS; j++) {
      if (board[i][j].isRevealed && !board[i][j].isMine) {
        revealedCount++;
      }
    }
  }

  if (revealedCount >= targetRevealedCount) {
    gameOver(true);
    let win = document.querySelector("#win");
    win.style.display = "block";
    win.textContent =
      "Complimenti, hai vinto! Hai scoperto l'80% delle caselle senza trovare bombe.";
  }
}

// Gestisce la fine del gioco
function gameOver(win) {
  gameInProgress = false;
  grid.removeEventListener("click", handleCellClick);
  let message = win ? "Complimenti, hai vinto!" : "Hai perso, ritenta!";
  alert(message);
  let tryAgain = document.querySelector("#try-again");
  tryAgain.style.display = "block";
}

// Riavvia il gioco
function restart() {
  location.reload();
}

// Inizializza il gioco
function initGame() {
  initBoard();
  placeMines();
  calculateCounts();
  let tryAgain = document.querySelector("#try-again");
  tryAgain.style.display = "none";
  tryAgain.addEventListener("click", restart);
  let win = document.querySelector("#win");
  win.style.display = "none";
  moves = 0;
  gameInProgress = true;
}

// Avvia il gioco quando la pagina è caricata
initGame();
