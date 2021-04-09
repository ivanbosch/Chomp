let rid, rno, num; // Row ID, row number and cell number respectively

// Initialises the 'chomp' process.
function chompCell(id) {
    if(id.className !== "empty_cell") {
        $("td").remove(".cell, #" + id);
        replaceBoard(id);
    }
}

// Returns only the button nodes and removes the text nodes from the NodeList.
function throwTextNodes(board, rid){
    return document.querySelectorAll("#" + rid + " > *");
}

// calculates the position to insert an empty cell
function positionToInsert(num, rno){
    if (Math.floor(num/6) + 1 === 1){
        if(num == 5){
            return num -(6*(rno-1))+2;
        }else{
            return num -(6*(rno-1)) + 1;
        }
    }else{
        return num -(6*(rno-1))-1
    }
}

// returns the row number of a specified cell id
function rowNumber(id) {
    let rowArr = [];
    rowArr = id.split("c");
    return parseInt(rowArr[1]);
}

// calculates what row to insert empty cell
function calculateRow(id) {
    num = rowNumber(id);
    if (num % 6 === 0){
        rid = "r" + (Math.floor(num/6)).toString();
        rno = Math.floor(num/6);
    }else{
        rid = "r" + (Math.floor(num/6) + 1).toString();
        rno = Math.floor(num/6 + 1);
    }
}

// calculates every cell needed to be removed depending on what cell was clicked which in turn is used to remove a block from the board.
function blockRemoval(id) {
    let cellsToRemove = []; // contains the id of cells that need to be removed
    let baseCell = rowNumber(id);
    for (i = baseCell; (i<=24); i+=6){
        let j = i;
        while(j%6 !== 0){
            cellsToRemove.push("c" + j.toString());
            j++;
        }cellsToRemove.push("c" + j.toString());
    }
    for (i = 0; i < cellsToRemove.length; i++){
        chompCell(cellsToRemove[i]);
    }
}

// replaces a cell with an empty cell
function replaceBoard(id){
    let emptyCell = document.createElement("td"); // empty cell html element
    emptyCell.id = id;
    let emptyDiv = document.createElement("div"); // div element for empty_cell
    emptyDiv.className = "empty_cell";
    emptyCell.append(emptyDiv);
    calculateRow(id);

    let board = document.getElementById(rid);
    // console.log(throwTextNodes(board, rid));
    if (num % 6 === 0){
        board.insertBefore(emptyCell, board.childNodes[null]);
    }else{
        board.insertBefore(emptyCell, board.childNodes[positionToInsert(num, rno)]);
    }
}