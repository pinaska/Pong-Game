import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
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
		
		
		this.ball = new Ball(this.width / 2, this.height / 2, 8);

		this.player1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			((this.height - this.paddleHeight)/2),
			KEYS.a,
			KEYS.z
		);

		this.player2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			((this.width - this.boardGap - this.paddleWidth)),
			((this.height - this.paddleHeight)/2),
			KEYS.up,
			KEYS.down
		);

	
		// Other code goes here...
	}

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

		this.ball.move();
	}

	render() {
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
		this.ball.render(svg);
	}

}