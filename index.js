let originBoard;
const popUp = document.querySelector(".endgame")
const humanPlayer = "O"
const aiPlayer = "X"

const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]
 
const cells = document.querySelectorAll(".cell")


function startGame(){
    popUp.style.display = "none"
    originBoard = Array.from(Array(9).keys())

    cells.forEach(item=>{
        item.textContent = ''
        item.style.removeProperty('background-color')
        item.addEventListener('click',turnClick)
    })

}

const turnClick = e =>{

    if(typeof originBoard[e.target.id] == 'number'){
        turn (e.target.id, humanPlayer)
        if(!checkTie()) turn(bestSpot(), aiPlayer)
    }


}


const turn=(squareId,player)=>{
    originBoard[squareId] = player
    document.getElementById(squareId).innerText = player
    let gameWon = checkWin(originBoard,player)

    if(gameWon) gameOver(gameWon)

     
}

function checkWin(board,player){
    let plays = board.reduce((a,e,i)=> 
    (e===player) ? a.concat(i) : a, [])

    let gameWon = null

    for(let [index, win] of winCombos.entries()){
        if(win.every(elem=>plays.indexOf(elem) > -1)){
            gameWon = {index:index, player}
            break

        }
    }
    return gameWon

}

function gameOver(gameWon){
    for(let index of winCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor = 
        gameWon.player == humanPlayer ? "blue" : "red"
    }

    cells.forEach(item=>item.removeEventListener('click',turnClick,false))

    declareWinner(gameWon.player == humanPlayer ? "You win" : "You loose")
}


function emptySquares(){
    return originBoard.filter(s => typeof s == 'number')
}

function bestSpot(){
    return emptySquares()[0]

}

function declareWinner(whoWon){
    popUp.style.display = "block"
    document.querySelector(".endgame .text").innerText = whoWon
}


function checkTie(){
    if(emptySquares().length == 0){
        cells.forEach(item=>{
            item.style.backgroundColor = 'green'
            item.removeEventListener('click',turnClick,false)
        })

        declareWinner("Tie Game")
        return true
        
    }

    return false
}

startGame()

