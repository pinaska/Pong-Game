import {SVG_NS} from '../settings';

export default class Ball{
    constructor(x, y, radius){
        this.radius = radius;
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.direction = 1;
        this.reset(x,y);
    }

    paddleCollision(player1, player2) {
        if (this.vx > 0) {
          //detect player2 paddle collision
          let paddle =  player2.coordinates(player2.x,player2.y, player2.width, player2.height);
          //es.next array destructuring
          let [leftX, rightX, topY, bottomY] = paddle;

          if (
          (this.x + this.radius >= leftX) && 
          (this.x + this.radius <= rightX) && 
          (this.y >= topY && this.y <= bottomY)
        ){
              this.vx = -this.vx;
              this.ping.play();
          }

        } else {
          let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
          let [leftX, rightX, topY, bottomY] = paddle;

          if(
              (this.x - this.radius <= rightX) &&
              (this.x - this.radius >= leftX) &&
              (this.y >= topY && this.y <=bottomY)
          ) {
              this.vx *= -1;
              this.ping.play();
          }
        }
      }

    reset(x,y){
        this.x = x;
        this.y = y;
        this.vy = 0;
        this.vx = 0;
        // Using round here because floor introduces bias
        while (this.vy === 0 || this.vx === 0)
        {
           this.vx = Math.round(Math.random() * 10 - 5);
           this.vy = Math.round(Math.random() * 10 - 5);    
        }
        //with the following code the angles changes and game is more interesting and prevent lazy pond (When you can just leave your paddles and go for a lunch)
        
        // while(this.vy === 0){
        //     this.vy = Math.floor(Math.random() * 10 - 5);
        // }
        // this.vx = this.direction * (6-Math.abs(this.vy));
    }

    collideWithBox(x, y, width, height){
        let halfWidth = width / 2;
        let halfHeight = height / 2;
        let centerDistanceX = Math.abs(this.x - (x + halfWidth));
        let centerDistanceY = Math.abs(this.y - (y + halfHeight));

        // check if it's too far
        if (centerDistanceX > (halfWidth + this.radius)) { return false; }
        if (centerDistanceY > (halfHeight + this.radius)) { return false; }

        // check if it's close enough
        if (centerDistanceX <= halfWidth) {
            // bounce in Y axis
            this.vy *= -1;
            return true;
        } 
        if (centerDistanceY <= halfHeight) {
            // bounce in X axis
            this.vx *= -1;
            return true;
        }

        // handle corner case
        let cornerDistanceSquared = (this.x - halfWidth) * (this.x - halfWidth) + (this.y - halfHeight) * (this.y - halfHeight);

        if (cornerDistanceSquared <= this.radius * this.radius)
        {
            // bounce in both axes
            this.vx *= -1;
            this.vy *= -1;
            return true;
        }
        return false;
    }//end of collideWithBox
    //create a method and call it on game.js instead of rendering it in ball.js; during class we rendered it within ball.js render method
   
   
    move()
    {
        this.x += this.vx;
        this.y += this.vy;
    }
    // //goal method
    // goal(player){
    // player.score++;
    // this.reset();
    // // console.log(player.score);
    // }



    render(svg){
        //draw ball
        let circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttributeNS(null, 'r', this.radius);
        circle.setAttributeNS(null, 'cx', this.x);
        circle.setAttributeNS(null, 'cy', this.y);
        circle.setAttributeNS(null, 'fill', 'yellow');

        svg.appendChild(circle);

        //     //detect goal
        // let rightGoal = this.x + this.radius >= this.boardWidth;
        // let leftGoal = this.x -this.radius <= 0;

        // if  (rightGoal){
        //  this.goal(player1);
        //  this.direction = -1;
        // } 
        // else if (leftGoal){
        //  this.goal(player2);
        //  this.direction = 1;
        // }
    }
}