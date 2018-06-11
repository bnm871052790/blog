var content = document.getElementById('content');  
var stop = document.getElementById('stop');
var gamePage = document.getElementsByClassName('start-game')[0];
var moveTimer =null; 
var num = document.getElementsByClassName('num')[0];
var overGame = document.getElementsByClassName('over-game')[0];
var close = document.getElementsByClassName('close')[0];
var overGameNum = document.getElementsByClassName('overGame-num')[0];
function init() {
	//地图
	this.mapW = content.offsetWidth;
	this.mapH = content.offsetHeight;
	//食物
	this.foodW = 20;
	this.foodH = 20;
	this.foodL = 0;
	this.foodT = 0;
	//蛇
	this.sankeW = 20;
	this.sankeH = 20;
	this.sankeBody = [[3,1,'sankeHeader'],[2,1,'sankeBody'],[1,1,'sankeBody']];
	//游戏属性
	this.drection = 'right';
	this.left = false;
	this.right = false;
	this.top = true;
	this.bottom = true;
	gamePage.onclick=stratGame;
}

function stratGame() {
	gamePage.style.display = 'none';
	stop.style.display = 'block';
	sanke()
	food()
	bindEvent()
	moveTimer = setInterval(function(){
		move()
	},200)
	
}
function food() {
	var food = document.createElement('div');
	this.foodL = Math.floor(Math.random() * (this.mapW / 20));
	this.foodT = Math.floor(Math.random() * (this.mapH / 20));
	var obj = foodRelodPosition(this.foodL,this.foodT);
	food.style.width = this.foodW + 'px';
	food.style.height = this.foodH + 'px';
	food.style.position = 'absolute';
	food.style.left = obj.correctX * 20 + 'px'; 
	food.style.top = obj.correctY * 20 + 'px'; 
	content.appendChild(food).setAttribute('class','food');
}
function foodRelodPosition(x,y) {
	for (var i = 0; i < this.sankeBody.length; i++) {
		if(x != this.sankeBody[i][0] && y != this.sankeBody[i][1]) {
			console.log(111)
			return {correctX:x,correctY:y}
		}else {
			var newX = Math.floor(Math.random() * (this.mapW / 20));
			var newY = Math.floor(Math.random() * (this.mapH / 20));
			console.log('111');
			foodRelodPosition(newX,newY);
		}
		
	}
}
function sanke() {
	for (var i = 0; i < this.sankeBody.length; i++) {
		var sanke = document.createElement('div');
		sanke.style.width = sankeW + 'px';
		sanke.style.height = sankeH + 'px';
		sanke.style.position = 'absolute';
		sanke.style.left = sankeBody[i][0] *20 + 'px';
		sanke.style.top = sankeBody[i][1] *20 + 'px';
		content.appendChild(sanke).setAttribute('class',sankeBody[i][2] + ' sanke' );
		switch (this.drection) {
			case 'right':
				break;
			case 'left':
				sanke.style.transform = 'rotate(180deg)';
				break;
			case 'top':
				sanke.style.transform = 'rotate(270deg)';
				break;
			case 'bottom':
				sanke.style.transform = 'rotate(90deg)';
				break;
			default:
				break;
		}
	}
}
function move() {
	for (var i = this.sankeBody.length - 1; i > 0; i--) {
		this.sankeBody[i][0] = this.sankeBody[i - 1][0];
		this.sankeBody[i][1] = this.sankeBody[i - 1][1];
	}
	switch(this.drection) {
		case 'right':
			this.sankeBody[0][0]++;
			break;
		case 'left':
			this.sankeBody[0][0]--;
			break;
		case 'top':
			this.sankeBody[0][1]--;
			break;
		case 'bottom':
			this.sankeBody[0][1]++;
			break;
		default:
			break;
	}
	removeClass('sanke')
	sanke()
	//吃苹果
	if(this.sankeBody[0][0] == foodL && this.sankeBody[0][1] == foodT) {
		num.innerHTML = parseInt(num.innerHTML) + 1;
		removeClass('food');
		this.sankeBody.push([1,1,'sankeBody'])
		food()
	}
	//出界
	if(this.sankeBody[0][0] < 0 || this.sankeBody[0][0] > this.mapW/20 || this.sankeBody[0][1] < 0 || this.sankeBody[0][1] > this.mapH/20) {
		relodGame()
	}
	//撞自己
	var snakeHX = this.sankeBody[0][0];
	var snakeHY = this.sankeBody[0][1];
	for (var i = 1; i < this.sankeBody.length; i++) {
		if(snakeHX == this.sankeBody[i][0] && snakeHY == this.sankeBody[i][1]) {
			relodGame()
		}
	}
}
function relodGame(){
	removeClass('food');
	removeClass('sanke');
	this.sankeBody = [[3,1,'sankeHeader'],[2,1,'sankeBody'],[1,1,'sankeBody']];
	clearInterval(moveTimer);
	overGame.style.display = 'block';
	stop.className = 'stop strat-bg';
	overGameNum.innerHTML = num.innerHTML;
	this.drection = 'right';
	this.left = false;
	this.right = false;
	this.top = true;
	this.bottom = true;
	num.innerHTML = 0;
}
function removeClass(className) {
	var ele = document.getElementsByClassName(className);
	while(ele.length > 0) {
		ele[0].parentNode.removeChild(ele[0]);
	}
}
function bindEvent() {
	document.onkeydown = function(e) {
		var code = e.keyCode;
		setDrection(code)
	}
	close.onclick = function() {
		overGame.style.display = 'none';
	}
	stop.onclick = function() {
		if(this.getAttribute('class').indexOf('stop-bg') > -1) {
			clearInterval(moveTimer);
			this.className = 'stop strat-bg';
		}else if(this.getAttribute('class').indexOf('strat-bg') > -1) {
			this.className = 'stop stop-bg';
			clearInterval(moveTimer);
			if(content.getElementsByClassName('food').length > 0) {
				moveTimer = setInterval(function(){
					move()
				},200);
			}else {
				moveTimer = setInterval(function(){
					move()
				},200);
				food()
			}
		}
	}
}
function setDrection(code) {
	switch (code) {
		case 37:
			if (this.left) {
				this.drection = 'left';
				this.top = true;
				this.bottom = true;
				this.left = false;
				this.right = false;
			}
			break;
		case 38:
			if (this.top) {
				this.drection = 'top';
				this.top = false;
				this.bottom = false;
				this.left = true;
				this.right = true;
			}
			break;
		case 39:
			if (this.right) {
				this.drection = 'right';
				this.top = true;
				this.bottom = true;
				this.left = false;
				this.right = false;
			}
			break;
		case 40:
			if (this.bottom) {
				this.drection = 'bottom';
				this.top = false;
				this.bottom = false;
				this.left = true;
				this.right = true;
			}
			break;
		default:
			break;
	}
}
init()