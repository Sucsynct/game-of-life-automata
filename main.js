var canvas = document.querySelector('.conway');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
var cells = [];
var scaleFactor = 10;

height = 400;
width = 400;

var gridRows = Math.floor(height/scaleFactor);
var gridColumns = Math.floor(width/scaleFactor);


ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, width, height);

function Cell(x, y, state) {
  this.x = x*scaleFactor;
  this.y = y*scaleFactor;
  this.state = state;
  this.neighbours = 0;
  this.cellIndex = {outer: null, inner: null};
}

Cell.prototype.draw = function() {
  if (this.state === 1) {
    ctx.fillStyle = 'rgb(255, 255, 255)';
  } else if (this.state === 0) {
    ctx.fillStyle = 'rgb(0, 0, 0)'
  }
  ctx.fillRect(this.x, this.y, scaleFactor, scaleFactor);
};

Cell.prototype.detectNeighbours = function() {
  this.neighbours = 0;
  let outer = this.cellIndex.outer;
  let inner = this.cellIndex.inner;
  //one row above
  if (!(outer === 0)) {
    if (cells[outer-1][inner] === 1) {this.neighbours++};
    if (cells[outer-1][inner-1] === 1) {this.neighbours++};
    if (cells[outer-1][inner+1] === 1) {this.neighbours++};
  }
  //current row
  if (cells[outer][inner-1] === 1) {this.neighbours++};
  if (cells[outer][inner+1] === 1) {this.neighbours++};
  //one row below
  if (!(outer === cells.length)) {
    if (cells[outer+1][inner-1] === 1) {this.neighbours++};
    if (cells[outer+1][inner] === 1) {this.neighbours++};
    if (cells[outer+1][inner+1] === 1) {this.neighbours++};
  }
};

Cell.prototype.stateChange = function() {
  if ((this.state === 1) && (this.neighbours < 2)) {
    this.state = 0;
  } else if ((this.state === 1) && (this.neighbours > 3)) {
    this.state = 0;
  } else if ((this.state === 0) && (this.neighbours === 3)) {
    this.state = 1;
  } else if ((this.state === 1) && (this.neighbours === (2 || 3))) {
    this.state = 1;
  }
}

function drawGrid() {
  ctx.clearRect(0, 0, width, height)
  for (var i = 0; i <= gridRows; i++) {
    cells[i] = [];
    let state = Math.random() < 0.01 ? 1 : 0;

    for (var k = 0; k <= gridColumns; k++) {
      cells[i][k] = new Cell(Math.floor(Math.random() * gridColumns + 1),
        Math.floor(Math.random() * gridRows + 1), state);
      cells[i][k].cellIndex = {outer: i, inner: k};

      cells[i][k].draw();
    }
  }
}

setInterval(function() {
  console.log(cells[0][0].state);
}, 1000);

function gameLoop() {
  ctx.clearRect(0, 0, width, height);
  for (var i = 0; i < gridRows; i++) {
    for (var k = 0; k < gridColumns; k++) {
      cells[i][k].detectNeighbours();
      cells[i][k].stateChange();
      cells[i][k].draw();
    }
  }
  requestAnimationFrame(gameLoop);
}

drawGrid();
gameLoop();
