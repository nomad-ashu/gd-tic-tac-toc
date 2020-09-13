//Start conditions
function setStart() {
    //1. all cells have no p-1 or p-2 class
    for (var i =0; i <=8; i++) {
        document.querySelectorAll(".cell")[i].classList.remove("p-1","p-2","p-1-img","p-2-img");
    }
    //2. Current Player should be set as Player 1
    document.querySelector(".game-in-progress").classList.remove("hidden");
    document.querySelector(".active-player").innerHTML = "Player 1";
    document.querySelector(".active-player").classList.remove("p-1", "p-2");
    document.querySelector(".active-player").classList.toggle("p-1");
    //3. The Winner block should be hidden
    document.querySelector(".game-completed").classList.add("hidden");
    for (var i = 1; i <=9; i++) {
        document.querySelector("#c-" + i).addEventListener("click", clickEvent);
    }  
}
setStart();

//Reset Condition
document.querySelector("#reset").addEventListener("click", setStart)

// Add players selection in screen
//1. Identify a click in the cell
function clickEvent(event) {
    clickedCell = event.target;
    //2. Check if a cell is already clicked
    if (clickedCell.classList.contains("p-1") || clickedCell.classList.contains("p-2")) {
        alert("select a different cell");
        //3. Check if current player is p-1 or p-2 and add appropriate classes
    } else if (document.querySelector(".active-player").classList.contains("p-1")) {
        document.querySelector(".active-player").classList.toggle("p-1");
        document.querySelector(".active-player").classList.toggle("p-2");
        document.querySelector(".active-player").innerHTML = "Player 2";
        clickedCell.classList.add("p-1", "p-1-img");
        //4. Check if p-1 has won
        winningCondition();
    } else {
        document.querySelector(".active-player").classList.toggle("p-1");
        document.querySelector(".active-player").classList.toggle("p-2");
        document.querySelector(".active-player").innerHTML = "Player 1";
        clickedCell.classList.add("p-2", "p-2-img");
        winningCondition();
    }
}


//End game
function winningCondition() {
    //1.check if a player has won
    //1.a. Winning combinations
    var winningCombinations = [['c-1','c-2','c-3'], ['c-4','c-5','c-6'], ['c-7','c-8','c-9'],
    ['c-1','c-4','c-7'], ['c-2','c-5','c-8'], ['c-3','c-6','c-9'],
    ['c-1','c-5','c-9'], ['c-3','c-5','c-7']];
    var wPlayers = []
    //2. Check if a single player class is available in any of the winning combination
    for (var i = 1; i <= 9 ; i++) {
        wPlayers.push(document.querySelector("#c-" + i).classList);
    }
    for (var j = 0; j <= winningCombinations.length-1; j++) {
        if (document.querySelector("#" + winningCombinations[j][0]).classList.contains("p-1") &&
        document.querySelector("#" + winningCombinations[j][1]).classList.contains("p-1") &&
        document.querySelector("#" + winningCombinations[j][2]).classList.contains("p-1")) {
            //a. remove all event listeners
            removeClickEvent();
            //b. Hide current Player
            document.querySelector(".game-in-progress").classList.add("hidden");
            //c.un-hide winner text and add winner player name 
            document.querySelector(".game-completed").classList.remove("hidden");
            document.querySelector(".winner").innerHTML = "Player 1";

        } else if (document.querySelector("#" + winningCombinations[j][0]).classList.contains('p-2') &&
        document.querySelector("#" + winningCombinations[j][1]).classList.contains("p-2") &&
        document.querySelector("#" + winningCombinations[j][2]).classList.contains("p-2")) {
            removeClickEvent();
            document.querySelector(".game-in-progress").classList.add("hidden");
            document.querySelector(".game-completed").classList.remove("hidden");
            document.querySelector(".winner").innerHTML = "Player 2";
        } 
    }
}
function removeClickEvent() {
    for(var i=1; i<=9; i++) {
        document.querySelector("#c-" + i).removeEventListener("click",clickEvent)
    }
}
