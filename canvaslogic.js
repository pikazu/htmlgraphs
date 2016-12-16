function randomColor() {
	return '#'+(Math.floor(Math.random()*0xFFFFFF)).toString(16);
}

//Gaussian Estimate ~N(0, 1) using Irwin-Hall
function gaussian() {
	var sum = 0;
	for (var i = 0; i < 12; i++) {
		sum += Math.random();
	}
	sum = sum - 6;
	return sum;
}

var canvas = document.getElementById("graph");
var context = canvas.getContext("2d");

var point = [];
var x_dist = 20;

function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	var x = -x_dist, y = point.length == 0 ? 100 : point[0][0];
	for (var i = 0; i < point.length; i++) {
		context.beginPath();
		context.strokeStyle = point[i][1];
		context.moveTo(x, y);
		x = x + x_dist, y = point[i][0]
		context.lineTo(x, y);
		//console.log(x, y);
		context.stroke();
		context.closePath();
	}
}

var ymin = 100, ymax = 0;
var g = 1;
function update() {
	if(point.length >= (canvas.width / x_dist) + 1) {
		point.shift();
	}
	g = gaussian();
	yc = g*(canvas.height/6)+ (canvas.height/2);
	point.push([yc,randomColor()]);
	document.getElementById("sample").textContent = "Sample s: " + g + "\nConversion: " + yc;
	if (yc < ymin) {
		ymin = yc;
		document.getElementById("min").textContent = "Min: " + ymin;
	} else if (yc > ymax) {
		ymax = yc;
		document.getElementById("max").textContent = "Max: " + ymax;
	}
	
	return point.length;
}

var lastFrameTimeMs = 0, fps = 10, halt = false;
function mainloop(timestamp) {
	if (timestamp < lastFrameTimeMs + (1000 / fps)) {
		requestAnimationFrame(mainloop);
		return;
	}
	if (!halt) {
		update();
		draw();
	}
	lastFrameTimeMs = timestamp;
	requestAnimationFrame(mainloop);
}

function toggle(ele) {
	halt = !halt
	ele.textContent = halt ? "Start" : "Stop";
}

var l = [10, 100, 200, 50, 500, 250]
function toggle_lol(ele) {
    ele.style.color = randomColor();
    var s = window.getComputedStyle(ele, null).getPropertyValue("font-size");
    var per = Math.abs(g)*100;
    console.log(g);
    document.getElementById("g").textContent = "(samples at at different rate) scaling factor: " + per + "%";
    ele.style.fontSize = per + "%";
}

lol_interval = setInterval(function() { toggle_lol(document.querySelector(".lol")) }, 750 );

requestAnimationFrame(mainloop);
