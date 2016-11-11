function randomColor() {
	return '#'+(Math.floor(Math.random()*0xFFFFFF)).toString(16);
}

var canvas = document.getElementById("graph");
var context = canvas.getContext("2d");

var point = [];

function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	var x = 0, y = point.length == 0 ? 100 : point[0][0];
	for (var i = 0; i < point.length; i++) {
		context.beginPath();
		context.strokeStyle = point[i][1];
		context.moveTo(x, y);
		x = x + 20, y = point[i][0]
		context.lineTo(x, y);
		console.log(x, y);
		context.stroke();
		context.closePath();
	}
}

function update() {
	if(point.length >= 40) {
		point.shift();
	}
	point.push([Math.random()*200,randomColor()]);
	return point.length;
}

var lastFrameTimeMs = 0, fps = 10;
function mainloop(timestamp) {
	if (timestamp < lastFrameTimeMs + (1000 / fps)) {
		requestAnimationFrame(mainloop);
		return;
	}
	update();
	draw();
	lastFrameTimeMs = timestamp;
	requestAnimationFrame(mainloop);
}

requestAnimationFrame(mainloop);