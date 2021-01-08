let cont = 0,born = 0, die = 0,alive = 0;
let board;
let columns;
let rows;
let cell_size = 10;
let r,g,b;
let c1 = 'white';
let input, button;
let lim;

function setup() {
  createCanvas(600, 530);
  input = createInput();
  input.position(20, 498);
  button = createButton('Generaciones');
  button.position(180, 498);
  button.mousePressed(limit);
  textSize(45);
  columns = width/cell_size;
  rows = (height-130)/cell_size;
  board = createBoard(columns, rows);
  for(let x = 1; x < columns-1; x++){
    for(let y = 1; y < rows-1; y++){
      board[x][y] = floor(random(2));
    }
  }
  colorBoard(color('white'));
  cont++;
  let res = []
  res = next();
  born = 0; die = 0; alive = data = res[2];
  genText(cont, born, die, alive,' ');
}

function draw() {
  background(0);
  let lim = input.value();
  if (keyIsPressed === true && cont<lim){
    if (keyCode === RIGHT_ARROW){
      cont++;
      let res = []
      res = next();
      born = res[0]; die = res[1]; alive = data = res[2]; c1 = res[3];
    }
  }
  genText(cont, born, die, alive,lim);
  colorBoard(c1);
}
  

function colorBoard(c1){
  for(let x = 0; x < columns; x++){
    for(let y = 0; y < rows; y++){
      let posx = x*cell_size;
      let posy = y*cell_size;
      if(board[x][y] == 1){
        stroke(0);
        fill(c1);
        rect(posx,posy,cell_size);
      }
    }
  }
}

function next(){
  r = floor(random(256)); g = floor(random(256)); b = floor(random(256));
  let data = [0,0,0,color(r,g,b)];
  let next_board = createBoard(columns, rows);
  for(let x = 1; x < columns-1; x++){
    for(let y = 1; y < rows-1; y++){
      let cell = board[x][y];
      let neighbors = 0;
      neighbors = countNeighbors(x,y);
      if(cell == 0 && neighbors == 3){
        next_board[x][y] = 1;
        data[2]++;
        data[0]++;
      }else if(cell == 1 && (neighbors > 3 || neighbors < 2)){
        next_board[x][y] = 0;
        data[1]++;
      }else{
        next_board[x][y] = cell;
      }
    }
  }
  board = next_board;
  return data;
}

function countNeighbors(x,y){
  let sum_neighbors = 0;
  sum_neighbors += board[x-1][y-1];
  sum_neighbors += board[x][y-1];
  sum_neighbors += board[x+1][y-1];
  sum_neighbors += board[x-1][y];
  sum_neighbors += board[x+1][y];
  sum_neighbors += board[x-1][y+1];
  sum_neighbors += board[x][y+1];
  sum_neighbors += board[x+1][y+1];
  return sum_neighbors;
}

function createBoard(cols,rws){
  let board = new Array(cols);
  for(let i = 0; i < board.length; i++){
    board[i] = new Array(rws);
  }
  return board;
}

function genText(cont, born, die, alive, lim){
  fill(100);
  text(lim,20,440);
  fill(255,255,255);
  text(cont,20,440);
  text("GEN",20,490);
  text(alive,160,440);
  text("ALIVE",160,490);
  text(born,320,440);
  text("BORN",320,490);
  text(die,500,440);
  text("DIE",500,490);
}

function limit(){
  button.attribute('disabled', '');
  input.attribute('disabled','');
}