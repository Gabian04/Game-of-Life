let cont = 0,born = 0, die = 0;
let board;
let columns;
let rows;
let cell_size = 10;

function setup() {
  createCanvas(600, 500);
  textSize(45);
  columns = width/cell_size;
  rows = (height-100)/cell_size;
  board = createBoard(columns, rows);
  for(let x = 1; x < columns-1; x++){
    for(let y = 1; y < rows-1; y++){
      board[x][y] = floor(random(2));
    }
  }
}

function draw() {
  background(0);
  colorBoard();
  if (keyIsPressed === true){
    if (keyCode === RIGHT_ARROW)
      cont++;
      let res = []
      res = next();
      born = res[0]; die = res[1];
  }
  genText(cont, born, die);
}
  

function colorBoard(){
  for(let x = 0; x < columns; x++){
    for(let y = 0; y < rows; y++){
      let posx = x*cell_size;
      let posy = y*cell_size;
      if(board[x][y] == 1){
        fill(255);
        stroke(0);
        rect(posx,posy,cell_size);
      }
    }
  }
}

function next(){
  let r = random(255);
  let g = random(255); 
  let b = random(255); 
  let a = random(255);
  let data = [0,0];
  let next_board = createBoard(columns, rows);
  for(let x = 1; x < columns-1; x++){
    for(let y = 1; y < rows-1; y++){
      let cell = board[x][y];
      let neighbors = 0;
      neighbors = countNeighbors(x,y);
      if(cell == 0 && neighbors == 3){
        next_board[x][y] = 1;
        let posx=x*cell_size;
        let posy=y*cell_size;
        if(board[x][y]==1){
          fill(r, g, b, a);
          stroke(0);
          rect(posx,posy,cell_size,cell_size);
       }
        data[0]++;
      }else if(cell == 1 && (neighbors > 3 || neighbors < 2)){
        next_board[x][y] = 0;
        let posx=x*cell_size;
        let posy=y*cell_size;
        if(board[x][y]==1){
          fill(r, g, b, a);
          stroke(0);
          rect(posx,posy,cell_size,cell_size);
       }
        data[1]++;
      }else{
        next_board[x][y] = cell;
        let posx=x*cell_size;
        let posy=y*cell_size;
        if(board[x][y]==1){
          fill(r, g, b, a);
          stroke(0);
          rect(posx,posy,cell_size,cell_size);
       }
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

function genText(cont, born, die){
  fill(255,255,255);
  text(cont,20,440);
  text("GEN",20,490);
  text(born,250,440);
  text("BORN",250,490);
  text(die,500,440);
  text("DIE",500,490);
}