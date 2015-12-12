var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

canvas.onclick = function(event){
	handleClick(event.clientX, event.clientY);
};
var balloon = [];
function Balloon(x, y){
	this.x = x;
	this.y = y;
}
function handleClick(x, y){
	var rect = canvas.getBoundingClientRect();
	balloon.x = x - rect.left;
	balloon.y = y - rect.top;
if(balloonReady){
		context.drawImage(balloonImage, balloon.x, balloon.y);
		balloon.push(new Balloon(x, y));
	}for (var i=0; i<balloon.length; i++) {
			drawBalloon(balloon[i]);
		}
	}

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "grass_template2.jpg";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function(){
	heroReady = true;
};
heroImage.src = "Balloons_01_64x64_alt_01_002.png";

var balloonReady = false;
var balloonImage = new Image();
balloonImage.onload = function(){
	balloonReady = true;
};
balloonImage.src = "Balloons_01_64x64_Alt_02_006.png";

var hero = {
	speed: 256
};
/*function Balloon(x, y){
	this.x = x;
	this.y = y;
}*/
function drawBalloon(Balloon){
	context.drawImage(balloonImage, balloon.x, balloon.y);
}
//var balloon = [];
var balloonsCollected = 0;

var keysDown = {};

addEventListener("keydown", function(e){
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);

//need to restart game after collecting all objects
var reset = function(){
	hero.x = canvas.width/2;
	hero.y = canvas.height/2;
	
	/*balloon.x = 32 + (Math.random() * (canvas.width - 64));
	balloon.y = 32 + (Math.random() * (canvas.height - 64));*/
	handleClick();
};

var update = function(modifier){
	if(87 in keysDown){
		hero.y -= hero.speed * modifier;
	}
	if(83 in keysDown){
		hero.y += hero.speed * modifier;
	}
	if(65 in keysDown){
		hero.x -= hero.speed * modifier;
	}
	if(68 in keysDown){
		hero.x += hero.speed * modifier;
	}
	
	if(
		hero.x <= (balloon.x +32)
		&& balloon.x <= (hero.x +32)
		&& hero.y <= (balloon.y +32)
		&& balloon.y <= (hero.y +32)
	){
		++balloonsCollected;
		//where the game resets when all balloons are collected
		reset();
	}
};

var render = function(){
	if(bgReady){
		context.drawImage(bgImage, 0, 0);
	}
	if(heroReady){
		context.drawImage(heroImage, hero.x, hero.y);
	}
	if(balloonReady){
		context.drawImage(balloonImage, balloon.x, balloon.y);
	}
	
	context.fillStyle = "rgb(250, 250, 250)";
	context.font = "24px Helvetica";
	context.textAlign = "left";
	context.textBaseLine = "top";
	context.fillText("Balloons collected: " + balloonsCollected, 32, 32);
};

var main = function (){
	var now = Date.now();
	var delta = now - then;
	
	update(delta / 1000);
	render();
	
	then = now;
	
	requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();