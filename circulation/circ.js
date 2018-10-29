
var w = 800, h = 400;

var svg = d3.select("#graph")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

var stanford = svg.append("circle")
	.attr("fill", "red")
	.attr("fill-opacity", "0.5")
	.attr("cx", 200)
	.attr("cy", 200)
	.attr("r", 10);

var ohlone = svg.append("circle")
	.attr("fill", "green")
	.attr("fill-opacity", "0.5")
	.attr("cx", 600)
	.attr("cy", 200)
	.attr("r", 10);

var s_txt = svg.append("text")
	.text("Stanford")
	.attr("x", 170)
	.attr("y", 205);

var o_txt = svg.append("text")
	.text("Ohlone")
	.attr("x", 580)
	.attr("y", 205);

var time = svg.append("text")
	.text("Press Start")
	.attr("font-size", 20)
	.attr("x", 300)
	.attr("y", 50);

var i = 0;

var cleaned = [];

d3.csv("missionpeak.csv", function(data) {
	cleaned.push([data["Date"], data["Time"], parseInt(data["Stanford"]), parseInt(data["Ohlone"])]);
});

var j = 0;

function next() {
	stanford.transition().attr("r", cleaned[j][2]+10);
	ohlone.transition().attr("r", cleaned[j][3]+10);
	s_txt.transition().text("Stanford: " + (cleaned[j][2]).toString());
	o_txt.transition().text("Ohlone: " + (cleaned[j][3]).toString());
	time.transition().text("Date/Time: " + cleaned[j][0] + cleaned[j][1]);
	j++;
	if (j == cleaned.length) {
		j = 0;
	}
}

function reset() {
	stop = true;
	j = 0;
	stanford.transition().attr("r", cleaned[j][2]+10);
	ohlone.transition().attr("r", cleaned[j][3]+10).attr("label", "hi");
	s_txt.transition().text("Stanford: " + (cleaned[j][2]).toString());
	o_txt.transition().text("Ohlone: " + (cleaned[j][3]).toString());
	time.transition().text("Date/Time: " + cleaned[j][0] + cleaned[j][1]);
}

function start() {
	stop = false;
	(function tmp() {
		if (!stop) {
			next();
			setTimeout(tmp, 500);
		}
	})();
}