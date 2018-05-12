import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import {SVG_NS, KEYS} from '../settings';


export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		
		this.gameElement=document.getElementById(this.element);
		this.board = new Board(this.width, this.height);
		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.boardGap = 10;
		this.maxPoints = 50;
		this.pause = false;
		this.winner = '';
		
		this.ball = new Ball(this.width / 2, this.height / 2, 8);
		this.ball2 = new Ball(this.width / 2, this.height / 2, 4);

		this.player1 = new Paddle(
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			((this.height - this.paddleHeight)/2)
		);

		this.player2 = new Paddle(
			this.paddleWidth,
			this.paddleHeight,
			((this.width - this.boardGap - this.paddleWidth)),
			((this.height - this.paddleHeight)/2)
		);

		/// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor
		this.score1 = new Score(this.width / 2 - 25, 30, 30, 'end');
		this.score2 = new Score(this.width / 2 + 25, 30, 30, 'start');
		this.status = new Score(this.width / 2, this.height / 2, 48);
		this.colon = new Score(this.width / 2, 30, 30);

		this.pingSound = new Audio('public/sounds/pong-01.wav');

		this.keyState = {};
 
        document.addEventListener('keydown', event => {
            this.keyState[event.key || event.which] = true;   
			if(event.key === KEYS.spaceBar){
				this.pause = !this.pause;
				}
		}, true);

        document.addEventListener('keyup', event => {
            this.keyState[event.key || event.which] = false;
        }, true);  

	}

	movePaddle(paddle, up, down) {
        // Player movement
        if (this.keyState[up]) {
			paddle.y = Math.max(0, paddle.y - paddle.speed);
		}
		if (this.keyState[down]) {
			paddle.y = Math.min(this.height - paddle.height, paddle.y + paddle.speed);
		}
	}

	moveBall(ball)
	{
		if (ball.collideWithBox(this.player1.x, this.player1.y, this.player1.width, this.player1.height)) {
			this.pingSound.play();
		}
		if (ball.collideWithBox(this.player2.x, this.player2.y, this.player2.width, this.player2.height)) {
			this.pingSound.play();
		}

		ball.collideWithBox(0, 0, this.width, 1);
		ball.collideWithBox(0, this.height, this.width, 1);

		if (ball.collideWithBox(0, 0, 1, this.height)){
			this.player2.score += 1;
			if(this.player2.score === this.maxPoints){
				this.pause = true;
				this.winner = 'player 2';
			}
			ball.reset(this.width/2, this.height/2);
		}
		if (ball.collideWithBox(this.width, 0, 1, this.height)){
			this.player1.score += 1;
			if(this.player1.score === this.maxPoints){
				this.pause = true;
				this.winner = 'player 1';
			}
			ball.reset(this.width/2, this.height/2);
		}
		ball.move();
	}
	//10.05
	moveObjects() {
		this.movePaddle(this.player1, 'a', 'z');
		this.movePaddle(this.player2, 'ArrowUp', 'ArrowDown');
		
		this.moveBall(this.ball);
		this.moveBall(this.ball2);
	}

	render() {
		//render the pause method
		if(this.pause){
			return;
		}
		//start moving balls
		this.moveObjects();
		this.gameElement.innerHTML='';
		
		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		
		this.gameElement.appendChild(svg);

		this.board.render(svg);
		this.player2.render(svg);
		this.player1.render(svg);
		this.ball.render(svg);
		this.ball2.render(svg);
		if (this.winner.length > 0) {
			this.status.render(svg, this.winner + ' won!');
		}
		this.score1.render(svg, this.player1.score);
		this.score2.render(svg, this.player2.score);
		this.colon.render(svg, ':');

		
	}

}