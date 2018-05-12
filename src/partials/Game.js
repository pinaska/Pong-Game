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
		this.pause = false;
		
		//get rid of boardWidth and boardHeight 
		this.ball = new Ball(this.width / 2, this.height / 2, 8);
		this.ball2 = new Ball(this.width / 2, this.height / 2, 4);

		this.player1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			((this.height - this.paddleHeight)/2),
			KEYS.a,
			KEYS.z,
			'player1'
		);

		this.player2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			((this.width - this.boardGap - this.paddleWidth)),
			((this.height - this.paddleHeight)/2),
			KEYS.up,
			KEYS.down,
			'player2'
		);

		this.score1 = new Score(this.width / 2 - 50, 30, 30);
		this.score2 = new Score(this.width / 2 + 25, 30, 30);


		document.addEventListener('keydown', event => {
		if(event.key === KEYS.spaceBar){
		this.pause = !this.pause;
		}
        });
	}

	//10.05
	moveObjects() {
		this.ball.collideWithBox(this.player1.x, this.player1.y, this.player1.width, this.player1.height);
		this.ball.collideWithBox(this.player2.x, this.player2.y, this.player2.width, this.player2.height);
		this.ball.collideWithBox(0, 0, this.width, 1);
		this.ball.collideWithBox(0, this.height, this.width, 1);

		if (this.ball.collideWithBox(0, 0, 1, this.height)){
			this.player2.score += 1;
			this.ball.reset(this.width/2, this.height/2);
		}
		if (this.ball.collideWithBox(this.width, 0, 1, this.height)){
			this.player1.score += 1;
			this.ball.reset(this.width/2, this.height/2);
		}


		//second ball
		this.ball2.collideWithBox(this.player1.x, this.player1.y, this.player1.width, this.player1.height);
		this.ball2.collideWithBox(this.player2.x, this.player2.y, this.player2.width, this.player2.height);
		this.ball2.collideWithBox(0, 0, this.width, 1);
		this.ball2.collideWithBox(0, this.height, this.width, 1);

		if (this.ball2.collideWithBox(0, 0, 1, this.height)){
			this.player2.score += 1;
			this.ball2.reset(this.width/2, this.height/2);
		}
		if (this.ball2.collideWithBox(this.width, 0, 1, this.height)){
			this.player1.score += 1;
			this.ball2.reset(this.width/2, this.height/2);
		}

		this.ball.move();
		this.ball2.move();
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
		this.player1.render(svg);
		this.player2.render(svg);
		this.ball.render(svg, this.player1, this.player2);
		this.ball2.render(svg);

		this.score1.render(svg, this.player1.score);
		this.score2.render(svg, this.player2.score);

		
	}

}