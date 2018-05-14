# Pong Game

A basic pong game using SVGs and  ES.next. 
3rd project of RED Academy Spring 2018. As for May 2018 I understand the basic concepts of object oriented programming but my code writing skills are basic. While coding this game, I  realized that so far I have been only thing about modual code and functional programing (?), solving basic algorithms and not writing actual program. Note to myslef: get bigger picture.

## used:
* The game elements are rendered as SVGs objects.
* Object Oriented Programming; objects and class concepts;
* Written in plain JavaScript, no libraries.
* Webpack (hint: running npm in Ubuntu terminal might caused issue with opening localhost - hence this plugin was commented out from webpack.config file; tbc.);
* Stretch goals:
-- two balls instead of one (different size of second ball),
-- hide/show game instruction ( I used onclick event listener with css transition),
-- display the winner once one of the players' score is 50. See comments below for details.

### comments on code writting and UI
* For future learning objectives: check why not using HTML Canvas?);
* method: Math.round seems to be more 'fair' when it comes to ball movement directions than Math.floor;
* Code has been written as code-along excercise with RED instructions, with comments from software developer (code was originally placed in partials files, now in Game.js.,responsible for all game mechanisms: ball movement, paddle movement, ball vs paddle vs box walls collisions);
* The game has been tested by 6y and 11y boys. Based on their input, UI has been changed for player 1: keys for paddle's movement: 'w' & 's'. One user case: While playing,caps lock key was hit by accident and the key listeners stopped working (to solve: method toLowerCase).
* bugs: 
 1. when ball hits paddle and box wall, it is kind of "trapped" and keeps spinning;
 2. ~~the game pauses when player wins, but it should stop. Otherwise, when player presses space bar, game continues to play even after 50 points.~~ This has been fixed with the help from software  (using map aka dictionary, need to research and practice it)

 --------------------------------
 [more inspiration](https://codepen.io/collection/DryGkb/)
