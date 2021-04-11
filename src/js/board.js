// draws the rest of the board onto the page
function newBoard(){
    let genHtml = "";
    genHtml+="<tr id=r1><td id=c1><button class=poison_cell onclick='sendLoss()'></button></td>";
    genHtml+="<td id=c2><button class=cell onclick=\"cellClick(getTurn(), 'c2')\"></button></td>";
    genHtml+="<td id=c3><button class=cell onclick=\"cellClick(getTurn(), 'c3')\"></button></td>";
    genHtml+="<td id=c4><button class=cell onclick=\"cellClick(getTurn(), 'c4')\"></button></td>"; 
    genHtml+="<td id=c5><button class=cell onclick=\"cellClick(getTurn(), 'c5')\"></button></td>"; 
    genHtml+="<td id=c6><button class=cell onclick=\"cellClick(getTurn(), 'c6')\"></button></td></tr>";
    genHtml+=drawBoard();

    return genHtml;
}

function drawBoard(){
    let rowNo = 2;
    let restOfTable = "";
    for (let i = 7; i < 25; i++){
        let stringID = "c" + i.toString();
        let td = "<td id=c" + i.toString() + "><button class=cell onclick=\"cellClick(getTurn(), '"+stringID+"');\"></button></td>";
        if (i % 6 === 0){
            rowNo ++;
            let endRow = "</td></tr><tr id=r" + rowNo.toString() + ">";
            restOfTable +=td + endRow;
        }
        else if (i === 7){
            restOfTable += "<tr id=r2>" + td
        }
        else{
            restOfTable += td;
        }
    }
    return restOfTable;
}