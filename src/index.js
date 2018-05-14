import './styles/game.css';
import Game from './partials/Game'

// create a game instance
const game = new Game('game', 512, 256);

(function gameLoop() {
    game.render();
    requestAnimationFrame(gameLoop);
})();


//trying ease in css animation 
let open = false;
let initHeight = 180;

function toggleInstruction() {
    let instruction = document.getElementById('game-instruction-hidden');
    if(open) {
        open = false;
        instruction.style.height = '0px';
    }
    else {
        open = true;
        instruction.style.height = initHeight + 'px';
    }
}

document.getElementById('show-more').onclick = toggleInstruction;