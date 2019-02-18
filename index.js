/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
var lastX = -1,lastY = -1;
function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    let rowIdx =  this.getAttribute("rowIdx");
    let colIdx =  this.getAttribute("colIdx");
    if(grid[colIdx][rowIdx]  ==  0)
    {
        let newValue = 1;
        grid[colIdx][rowIdx] = newValue;
        renderMainGrid();
        addClickHandlers();
        initializeMyMove(rowIdx,colIdx);
    }
    else{
        // alert('Move in your spaces, MAN!')
    }
    
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}




function initializeMyMove(x,y){
    //Check if any winning move is possible
    if(lastX != -1 && lastY != -1 && winningMovePossible())
    {
        let pos = winningMovePossible();
        grid[pos['x']][pos['y']] = 2;
    }
    //Boundary Conditions
    else if(((x == 0 && y ==0) || (x == 2 && y == 0) || (x == 0 && y ==2) || (x == 2 && y == 2 )))
    {
       if(grid[1][1] == 0)
       {
          grid[1][1] = 2;
       }
       else 
       { 
         if(x == lastX || y == lastY)
         {
            let obj = {};
            obj = getFreeSpace(x,y,lastX,lastY); 
            let newX = +obj['x']  ,   newY = +obj['y']; 
            grid[newY][newX] = 2;
            // console.log(newX,newY) 
         }
         else 
         {
           if(grid[0][1]==0)
           {   grid[0][1] = 2; }
           else if(grid[1][0]==0)
           {   grid[1][0] = 2; }
           else if(grid[2][1]==0)
           {   grid[2][1] = 2; }
           else if(grid[1][2]==0)
           {   grid[1][2] = 2; }
         }
       }
       
    }
    else if( x == 1 && y == 1)
    {
        let obj = {};
        obj = getFreeSpace(x,y,lastX,lastY); 
        let newX = +obj['x']  ,   newY = +obj['y']; 
        grid[newY][newX] = 2;
    }
    else{
        if(x == lastX || y == lastY)
        {
           let obj = {};
           obj = getFreeSpace(x,y,lastX,lastY); 
           let newX = +obj['x']  ,   newY = +obj['y']; 
           grid[newY][newX] = 2;
        }
        else 
        {
            setIfAnyPlaceIsVacant();
        }
    }
    renderMainGrid();
    addClickHandlers();

    lastX = x;
    lastY = y;
   
    if(checkForWin(1)){alert('Human Race Won'); setTimeout(function(){location.reload();},2000)}
    if(checkForWin(2)){alert('Intel Won'); setTimeout(function(){location.reload();},2000)}
    if(checkForAllFilled()){confirm("Do We both have same IQ? Cuz its draw"); setTimeout(function(){location.reload();},2000)}
}


function getFreeSpace(x,y,lastX,lastY){
    console.log(`lastX ${lastX} lastY ${lastY}   X  ${x}   Y ${y}`);
 if(x  ==  lastX)
 {
    for(let i = 0;i<3;i++)
    {    
        if(grid[i][x] == 0)
        { 
            return {x:x,y:i};
        }
    }
 }
 else if(y == lastY){
    for(let i = 0;i<3;i++)
    {
        if(grid[y][i] == 0)
        {
            return {x:i,y:y};
        }
    } 
 }
 let obj = setIfAnyPlaceIsVacant();
 let newX = +obj['x']  ,   newY = +obj['y']; 
 return {x:newX,y:newY};
}

function checkForWin(val){
    for(let i = 0; i<3 ;i++)
    {  
        if(grid[i][0] == val && grid[i][1] == val && grid[i][2] == val)
        {
            return true;
        }
        else if(grid[0][i] == val && grid[1][i] == val && grid[2][i] == val)
        {
            return true;
        }
    }
    if(grid[0][0] == val && grid[1][1] == val && grid[2][2] == val )
    {
        return true;
    }
    else if(grid[0][2] == val && grid[1][1] == val && grid[2][0] == val )
    {
        return true;
    }
    return false;
}

function winningMovePossible(val = 2){
    for(let i = 0; i<3 ;i++)
    {  
        if(grid[i][0] == val && grid[i][1] == val && grid[i][2] == 0){ return {x:i,y:2} }
        else if(grid[i][0] == val && grid[i][1] == 0 && grid[i][2] == val){return {x:i,y:1}}
        else if(grid[i][0] == 0 && grid[i][1] == val && grid[i][2] == val){return {x:i,y:0}}
        
        if(grid[0][i] == val && grid[1][i] == val && grid[2][i] == 0){ return {x:2,y:i} }
        else if(grid[0][i] == val && grid[1][i] == 0 && grid[2][i] == val){ return {x:1,y:i} }
        else if(grid[0][i] == 0 && grid[1][i] == val && grid[2][i] == val){ return {x:0,y:i} }
        
    }

    if(grid[0][0] == val && grid[1][1] == val && grid[2][2] == 0 )
    {    return {x:2,y:2}; }
    else if(grid[0][0] == val && grid[1][1] == 0 && grid[2][2] == val )
    {    return {x:1,y:1}; }
    else if(grid[0][0] == 0 && grid[1][1] == val && grid[2][2] == val )
    {    return {x:0,y:0}; }
    
    else if(grid[0][2] == val && grid[1][1] == val && grid[2][0] == 0 )
    {   return {x:2,y:0}; }
    else if(grid[0][2] == val && grid[1][1] == 0 && grid[2][0] == val )
    {   return {x:1,y:1}; }
    else if(grid[0][2] == 0 && grid[1][1] == val && grid[2][0] == val )
    {   return {x:0,y:2}; }

    return false;
}


function setIfAnyPlaceIsVacant(){
    
    //Priority given to corner elements

     //Return corner free elements if any
     if(grid[0][0]==0)
     {   grid[0][0] = 2; return {x:0,y:0}}
     else if(grid[2][2]==0)
     {   grid[2][2] = 2; return {x:2,y:2}}
     else if(grid[2][0]==0)
     {   grid[2][0] = 2; return {x:2,y:0}}
     else if(grid[0][2]==0)
     {   grid[0][2] = 2; return {x:0,y:2}}
     //Return middle free elements if any
     else if(grid[0][1]==0)
     {   grid[0][1] = 2; return {x:0,y:1}}
     else if(grid[1][0]==0)
     {   grid[1][0] = 2; return {x:1,y:0}}
     else if(grid[2][1]==0)
     {   grid[2][1] = 2; return {x:2,y:1}}
     else if(grid[1][2]==0)
     {   grid[1][2] = 2; return {x:1,y:2}}
}

function checkForAllFilled(){
    for(let i=0;i<3;i++)
    for(let j=0;j<3;j++)
     if(grid[i][j] == 0)
      return false;

    return true  ;
}




initializeGrid();
renderMainGrid();
addClickHandlers();
