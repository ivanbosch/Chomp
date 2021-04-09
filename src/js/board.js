// draws the rest of the board onto the page
function drawBoard(){
    let rowNo = 2;
    let restOfTable = "";
    for (let i = 7; i < 25; i++){
        let stringID = "c" + i.toString();
        if (i % 6 === 0){
            rowNo ++;
            let endRow = "</td></tr><tr id = 'r" + rowNo.toString() + "'>";
            restOfTable +="<td id = 'c" + i.toString() + "'><button class = 'cell' onclick=blockRemoval('"+stringID+"');sendTransformation();></button></td>" + endRow;
        }
        else if (i === 7){
            restOfTable += "<tr id = 'r2'><td id = 'c" + i.toString() + "'><button class = 'cell' onclick=blockRemoval('"+stringID+"');sendTransformation();></button></td>"
        }
        else{
            restOfTable += "<td id = 'c" + i.toString() + "'><button class = 'cell' onclick=blockRemoval('"+stringID+"');sendTransformation();></button></td>";
        }
    }document.write(restOfTable);
}
