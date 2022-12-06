const COLS = 10; // 10 cot
const ROWS = 20; // 20 dong
const BLOCK_SIZE = 30; // kich thuoc moi o
const CORLOR_MAPPING = [
  "red",
  "orange",
  "green",
  "purple",
  "blue",
  "cyan",
  "pink",
  "white",
];

const BRICK_PLAYOUT = [
  // game có 7 trang thai hình dạng khác nhau
  [
    [
      [1, 7, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 1],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 1, 7],
      [7, 1, 7],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [7, 1, 7],
      [7, 1, 1],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 1],
      [1, 1, 1],
      [7, 7, 7],
    ],
  ],
  [
    [
      [1, 7, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 1, 1],
      [1, 1, 7],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 7, 7],
      [7, 1, 1],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 7],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 7, 1],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 7],
      [7, 1, 1],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
    ],
    [
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 1, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
  ],
];
const KEYS_CODES = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  UP: "ArrowUp",
  DOWN: "ArrowDown",
};
const WHITE_CORLOR_ID = 7;

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

ctx.canvas.witdh = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// ve bang va o trang
class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.generateWhiteBoard();
    this.score = 0;
    this.gameOver = false;
    this.isPlaying = false;
    this.clearAudio = new Audio("../sound/sound1.mp3");
    this.offAudio = new Audio("");
  }

  reset() {
    this.score = 0;
    this.grid = this.generateWhiteBoard();
    this.gameOver = false;
    this.drawBoard();
  }

  generateWhiteBoard() {
    return Array.from({ length: ROWS }, () =>
      Array(COLS).fill(WHITE_CORLOR_ID)
    );
  }
  // Ve theo toa do x,v va phan biet mau cho board
  drawCell(xAxis, yAxis, colorId) {
    this.ctx.fillStyle =
      CORLOR_MAPPING[colorId] || CORLOR_MAPPING[WHITE_CORLOR_ID];
    //ham fillRect dinh nghia theo tung pixel
    // xAxis cot
    //yAxis hang
    this.ctx.fillRect(
      xAxis * BLOCK_SIZE,
      yAxis * BLOCK_SIZE,
      BLOCK_SIZE,
      BLOCK_SIZE
    );
    this.ctx.fillStyle = "black";
    this.ctx.strokeRect(
      xAxis * BLOCK_SIZE,
      yAxis * BLOCK_SIZE,
      BLOCK_SIZE,
      BLOCK_SIZE
    );
  }

  // ve o trang
  drawBoard() {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[0].length; col++) {
        this.drawCell(col, row, this.grid[row][col]);
      }
    }
  }

  handleCompeleteRows() {
    const lastestGrid = board.grid.filter((row) => {
      return row.some((col) => col === WHITE_CORLOR_ID);
    });
    const newScore = ROWS - lastestGrid.length; // => newScore =  tong cong hang da hoanh thanh
    const newRows = Array.from({ length: newScore }, () =>
      Array(COLS).fill(WHITE_CORLOR_ID)
    );
    if (newScore) {
      board.grid = [...newRows, ...lastestGrid];
      this.handleScore(newScore * 10);
      this.handleOnOffSound();
      console.log("lastestGrid", lastestGrid);
    }
  }
  handleScore(newScore) {
    this.score += newScore;
    document.getElementById("score").innerHTML = this.score;
  }
  handleGameOver() {
    this.gameOver = true;
    this.isPlaying = false;
    alert("LÊU LÊU CHƠI GÀ ^=.=^");
  }
  handleOnOffSound() {
    this.clearAudio.play();
  }
}

// Tao ra cac hinh khoi
class Brick {
  constructor(id) {
    this.id = id;
    this.layout = BRICK_PLAYOUT[id];
    this.activeIndex = 0; //Luu lai huong cua vien gach
    //Luu lai vi tri vien ganh
    this.colPos = 4;
    this.rowPos = -1;
  }

  draw() {
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        //kiem tra
        if (this.layout[this.activeIndex][row][col] !== WHITE_CORLOR_ID) {
          board.drawCell(col + this.colPos, row + this.rowPos, this.id);
        }
      }
    }
  }

  clear() {
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== WHITE_CORLOR_ID) {
          board.drawCell(col + this.colPos, row + this.rowPos, WHITE_CORLOR_ID);
        }
      }
    }
  }

  moveLeft() {
    if (
      !this.checkCollistion(
        this.rowPos,
        this.colPos - 1,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear();
      this.colPos--;
      this.draw();
    }
  }

  moveRight() {
    if (
      !this.checkCollistion(
        this.rowPos,
        this.colPos + 1,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear();
      this.colPos++;
      this.draw();
    }
  }

  moveDown() {
    if (
      !this.checkCollistion(
        this.rowPos + 1,
        this.colPos,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear();
      this.rowPos++;
      this.draw();
      return;
    }
    this.handleLanded();
    if (!board.gameOver) {
      generateNewBrick();
    }
  }

  rotate() {
    if (
      !this.checkCollistion(
        this.rowPos,
        this.colPos,
        this.layout[(this.activeIndex + 1) % 4]
      )
    ) {
      this.clear();
      this.activeIndex = (this.activeIndex + 1) % 4; // 4 trạng thái của hình khối
      this.draw();
    }
  }
  //Kiem tra xem co va cham voi border nao k
  checkCollistion(nextRow, nextCol, nextLayout) {
    // if (nextCol < 0) return true;

    for (let row = 0; row < nextLayout.length; row++) {
      for (let col = 0; col < nextLayout[0].length; col++) {
        if (nextLayout[row][col] !== WHITE_CORLOR_ID && nextRow >= 0) {
          if (
            // Cac truong hop bi pham
            col + nextCol < 0 ||
            col + nextCol >= COLS ||
            row + nextRow >= ROWS ||
            board.grid[row + nextRow][col + nextCol] !== WHITE_CORLOR_ID // chong 2 khoi va cham voi nhau
          )
            return true;
        }
      }
    }
    return false;
  }

  handleLanded() {
    if (this.rowPos <= 0) {
      board.handleGameOver();
      return;
    }

    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== WHITE_CORLOR_ID) {
          board.grid[row + this.rowPos][col + this.colPos] = this.id;
        }
      }
    }
    board.handleCompeleteRows();
    board.drawBoard();
  }
}

// Tao khoi ngau nhien
function generateNewBrick() {
  brick = new Brick(Math.floor((Math.random() * 10) % BRICK_PLAYOUT.length)); // tao ra 1 id bat ky tu 0 --> 6
}

board = new Board(ctx);
board.drawBoard();

document.getElementById("play").addEventListener("click", () => {
  board.reset();

  board.isPlaying = true;
  generateNewBrick();

  const refresh = setInterval(() => {
    if (!board.gameOver) {
      brick.moveDown();
    } else {
      clearInterval(refresh);
    }
  }, 1000);
});

// Event for four arrow
document.addEventListener("keydown", (e) => {
  if (!board.gameOver && board.isPlaying) {
    switch (e.code) {
      case KEYS_CODES.LEFT:
        brick.moveLeft();
        break;
      case KEYS_CODES.RIGHT:
        brick.moveRight();
        break;
      case KEYS_CODES.DOWN:
        brick.moveDown();
        break;
      case KEYS_CODES.UP:
        brick.rotate();
        break;
      default:
        break;
    }
  }
});
