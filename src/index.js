import './styles/game.css';
import Game from './partials/Game'

//get the instruction 


// create a game instance
const game = new Game('game', 512, 256);

(function gameLoop() {
    game.render();
    requestAnimationFrame(gameLoop);
})();

function showInstruction() {
    var x = document.getElementById('game-instruction-hidden');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}