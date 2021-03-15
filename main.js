const $gameContainer = document.getElementById('game-Container');
const $board = document.getElementById('board');
const $turn = document.getElementById('turn');

const cells = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const winCombos = [
    ['1', '2','3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7']
];

let playerTurn = 'x';
let selectionX = [];
let selectionO = [];

const draw =()=>{
    cells.forEach((cell)=>{
        const liElement = document.createElement('li');
        liElement.dataset.id = cell;
        $board.appendChild(liElement);
        $turn.innerText = 'PLAYER : X';
    })  
}
const playerChoice =($event)=>{
    const isCell = $event.target.localName === 'li';
    const isX = $event.target.classList.contains('x');
    const isO = $event.target.classList.contains('o');
    if (!isCell || isO || isX) { return; }
      if(playerTurn == 'x'){
         $event.target.classList.add('x');
         selectionX.push($event.target.dataset.id);
         playerTurn = 'o';
          $turn.innerText = 'PLAYER : O';
        
     }else{
         $event.target.classList.add('o');
         selectionO.push($event.target.dataset.id);
         playerTurn = 'x';
          $turn.innerText = 'PLAYER : X';   
     }
    checkState();
}
const checkState = ()=>{
     const sortX = selectionX.sort((a,b)=> a - b);
     const sortO = selectionO.sort((a,b)=> a - b);
     
  winCombos.forEach(combo =>{
        if (sortX.includes(combo[0]) && sortX.includes(combo[1]) && sortX.includes(combo[2])){
             Swal.fire({
                 title: 'X Win !',
                 icon: 'success',
                 showConfirmButton: true,
                 confirmButtonText: 'Play Again'
             }).then((result) => {
                 if (result.isConfirmed){
                     document.location.reload();
                 }
             })
        }else
            if (sortO.includes(combo[0]) && sortO.includes(combo[1]) && sortO.includes(combo[2])) {
                Swal.fire({
                    title: 'O Win !',
                    icon: 'success',
                    showConfirmButton: true,
                    confirmButtonText: 'Play Again'
                }).then((result) => {
                    if (result.isConfirmed) {
                       document.location.reload();
                       
                    }
                })
            }
              
    })   
}
draw();
$board.addEventListener('click', playerChoice);

