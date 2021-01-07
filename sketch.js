let tablero;
let columnas;
let renglones;
let celda_tamanio=10;
function setup() {
  createCanvas(600, 400);
  
 
  columnas = width/celda_tamanio;
  renglones = height/celda_tamanio;
  tablero = creaTablero(columnas,renglones);
  for(let x=1;x<columnas-1;x+=1){
    for(let y=1; y<renglones-1;y+=1){
      tablero[x][y]= floor(random(2));

       
    }
  }
 
}

function draw() {
  background(220);
    
  pintaTablero();
  siguienteGen();
 
  
}
function siguienteGen(){
  let tablero_sig= creaTablero(columnas,renglones);
  r = random(255);
  g = random(255); 
  b = random(255); 
  a = random(255);
  for(let x=1;x<columnas-1;x+=1){
    for(let y=1; y<renglones-1;y+=1){
      let celda=tablero[x][y];
      let vecinos=cuentaVecinos(x,y);
      
      if(celda==0 && vecinos==3){
        tablero_sig[x][y]=1;   
      let posx=x*celda_tamanio;
      let posy=y*celda_tamanio;
     if(tablero[x][y]==1){
        fill(r, g, b, a);
       stroke(0);
       rect(posx,posy,celda_tamanio,celda_tamanio);
       
     }
      }
      else if(celda==1 &&(vecinos>3 || vecinos < 2)){
        tablero_sig[x][y]=0;
         let posx=x*celda_tamanio;
      let posy=y*celda_tamanio;
     if(tablero[x][y]==1){
        fill(r, g, b, a);
       stroke(0);
       rect(posx,posy,celda_tamanio,celda_tamanio);
       
     }
      }
      else{
        tablero_sig[x][y]=celda;
         let posx=x*celda_tamanio;
      let posy=y*celda_tamanio;
     if(tablero[x][y]==1){
       fill(r, g, b, a);
       stroke(0);
       rect(posx,posy,celda_tamanio,celda_tamanio);
       
     }
      }
      
    }
  }
  tablero=tablero_sig;
}

function cuentaVecinos(x,y){
  let suma_vecinos=0;
  suma_vecinos += tablero[x-1][y-1];
  suma_vecinos += tablero[x][y-1];
  suma_vecinos += tablero[x+1][y-1];
  suma_vecinos += tablero[x-1][y];
  suma_vecinos += tablero[x+1][y];
  suma_vecinos += tablero[x-1][y+1];
  suma_vecinos += tablero[x][y+1];
  suma_vecinos += tablero[x+1][y+1];
  return suma_vecinos;
  
  
}
function pintaTablero(){
  for(let x=0;x<columnas;x+=1){
    for(let y=0; y<renglones;y+=1){
      let posx=x*celda_tamanio;
      let posy=y*celda_tamanio;
     if(tablero[x][y]==1){
       fill(100,0,215);
       stroke(0);
       rect(posx,posy,celda_tamanio,celda_tamanio);
       
     }
    }
  }
    
  
  
}

function creaTablero(cols,ren){
  let tab = new Array(cols);
  for(let i =0; i<tab.length; i=i+1){
    tab[i] = new Array(ren);
  }
  return tab;
  
}