import './styles/game.css';
import Game from './partials/Game'

// create a game instance
const game = new Game('game', 512, 256);

(function gameLoop() {
    game.render();
    requestAnimationFrame(gameLoop);
})();

//get the instruction hidden onclick
function toggleInstruction() {
    let e = document.getElementById('game-instruction-hidden');
    console.log('asasdad: ' + e.style.display);
    if(e.style.display === 'none'){
        show();
    }
    else{
        hide();
     }
    
}
function show(){
    document.getElementById('game-instruction-hidden').style.display = 'block';
}
function hide(){
    document.getElementById('game-instruction-hidden').style.display = 'none';
}

document.getElementById('show-more').onclick = toggleInstruction;
