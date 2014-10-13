/*
 * 
 draw start 

 */

var canvas, ctx, flag = false, prevX = 0, currX = 0, prevY = 0, currY = 0, color = "red", y = 2, dot_flag = false;

var allPosX = new Array();
var allPosY = new Array();
var roomName = "";
var drawMood;
var deltaCenter = null;
var deltaCenterRect = null;
// 0 for pen, 1 for circle, 2 for rectangle

// holds all our rectangles
var boxes = [];
var circles = [];
var paths = [];

var circleString = "";
var rectString = "";

function SelectPen() {
	drawMood = 0;
}

function SmallCircle() {
	this.drawMood = 1;
	addCircle(200, 200, 25);
}

function MediumCircle() {
	this.drawMood = 1;
	addCircle(200, 200, 50);
}

function LargeCircle() {
	this.drawMood = 1;
	addCircle(200, 200, 100);
}

function SmallRect() {
	this.drawMood = 2;
	addRect(1, 1, 100, 100, "#444444");
}

function MediumRect() {
	this.drawMood = 2;
	addRect(1, 1, 170, 170, "#444444");
}

function LargeRect() {
	this.drawMood = 2;
	addRect(1, 1, 210, 210, "#444444");
}

// Path object to hold data for all drawn path
function Path() {
	this.x = 50;
	this.y = 50;
}

// Circle object to hold data for all drawn circle
function Circle() {
	this.x = 50;
	this.y = 50;
	this.r = 20;
}

// Box object to hold data for all drawn rects
function Box() {
	this.x = 0;
	this.y = 0;
	this.w = 1; // default width and height?
	this.h = 1;
	this.fill = '#444444';
}

// Initialize a new path, add it, and invalidate the canvas
function addPath(x, y) {
	var path = new Path;
	path.x = x;
	path.y = y;
	paths.push(path);
	draw();
}

// Initialize a new circle, add it, and invalidate the canvas
function addCircle(x, y, r) {
	var circle = new Circle;
	circle.x = x;
	circle.y = y;
	circle.r = r;
	circles.push(circle);
	draw();
}

// Initialize a new Box, add it, and invalidate the canvas
function addRect(x, y, w, h, fill) {
	var rect = new Box;
	rect.x = x;
	rect.y = y;
	rect.w = w;
	rect.h = h;
	rect.fill = fill;
	boxes.push(rect);
	draw();
}

function initDraw() {

	canvas = document.getElementById('canvas');
	ctx = canvas.getContext("2d");
	w = canvas.width;
	h = canvas.height;

	canvas.addEventListener("mousemove", function(e) {
		findxy('move', e)
	}, false);

	canvas.addEventListener("mousedown", function(e) {
		findxy('down', e)
	}, false);

	canvas.addEventListener("mouseup", function(e) {
		findxy('up', e)
	}, false);

	canvas.addEventListener("mouseout", function(e) {
		findxy('out', e)
	}, false);
	/*console.log("draw initialize");*/
}

function writeMessage(canvas, message) {
	var context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, 40);
	context.font = '18pt Calibri';
	context.fillStyle = 'white';

	context.fillText(message, 10, 25);

}

function mouseX(e) {
	return e.clientX - canvas.offsetLeft;
}

function mouseY(e) {
	return e.clientY - canvas.offsetTop;
}

function startDragging(e) {
	var p = new Point(mouseX(e), mouseY(e));
	var l = circles.length;
	for ( var i = 0; i < l; i++) {
		if (Math.pow(p.x - circles[i].x, 2) + Math.pow(p.y - circles[i].y, 2) < Math
				.pow(circles[i].r, 2)) {
			deltaCenter = new Point(p.x - circles[i].x, p.y - circles[i].y);
		}
	}

}

function startDraggingRect(e) {
	var p = new Point(mouseX(e), mouseY(e));
	var l = boxes.length;
	for ( var i = 0; i < l; i++) {
		/*console
				.log((boxes[i].x < p.x && boxes[i].y < p.y)
						&& (boxes[i].x + boxes[i].w > p.x && boxes[i].y
								+ boxes[i].h > p.y));*/

		if ((boxes[i].x < p.x && boxes[i].y < p.y)
				&& (boxes[i].x + boxes[i].w > p.x && boxes[i].y + boxes[i].h > p.y)) {
			deltaCenterRect = new Point(p.x - boxes[i].x, p.y - boxes[i].y);
			/*console.log("px=" + p.x + " py=" + p.y);*/
			/*console.log(boxes[i].x + " " + boxes[i].y + " " + boxes[i].h + " "
					+ boxes[i].w);*/
		}
	}

}

var Point = function(x, y) {
	this.x = x;
	this.y = y;
	return this;
}

function draw() {
	if (drawMood == 0) {
		ctx.beginPath();
		ctx.moveTo(prevX, prevY);
		ctx.lineTo(currX, currY);
		ctx.strokeStyle = color;
		ctx.lineWidth = y;
		ctx.stroke();
		ctx.closePath();

	} else if (drawMood == 1) {
		// draw circle
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var l = circles.length;

		/*console.log(circles.length);*/
		for ( var i = 0; i < l; i++) {
			ctx.beginPath();
			ctx.arc(circles[i].x, circles[i].y, circles[i].r, 0, 2 * Math.PI,
					false);
			/*console.log(circles[i].x);*/
			ctx.strokeStyle = 'red';
			ctx.stroke();
			ctx.closePath();
		}

	} else if (drawMood = 2) {
		// draw rectangle
		// draw all boxes
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var l = boxes.length;

		/*console.log(boxes.length)*/;
		for ( var i = 0; i < l; i++) {
			ctx.beginPath();
			ctx.rect(boxes[i].x, boxes[i].y, boxes[i].w, boxes[i].h,
					boxes[i].fill);
			ctx.strokeStyle = 'red';
			ctx.stroke();
			ctx.closePath();
		}
	}

	if (circles.length > 0) {
		circleString = "";
		for ( var i = 0; i < circles.length; i++) {
			ctx.beginPath();
			ctx.arc(circles[i].x, circles[i].y, circles[i].r, 0, 2 * Math.PI,
					false);
			ctx.strokeStyle = 'red';
			ctx.stroke();
			ctx.closePath();
			// format x,y,r + x1,y1,r1
			circleString = circleString + circles[i].x + "," + circles[i].y
					+ "," + circles[i].r + "~";
		}
		circleString = circleString.slice(0, -1);
	}

	if (boxes.length > 0) {
		rectString = "";
		for ( var i = 0; i < boxes.length; i++) {
			ctx.beginPath();
			ctx.rect(boxes[i].x, boxes[i].y, boxes[i].w, boxes[i].h,
					boxes[i].fill);
			ctx.strokeStyle = 'red';
			ctx.stroke();
			ctx.closePath();
			// format x,y,w,h + x1,y1,w1+h1
			rectString = rectString + boxes[i].x + "," + boxes[i].y + ","
					+ boxes[i].w + "," + boxes[i].h + "~";
		}
		rectString = rectString.slice(0, -1);
	}
	if (paths.length > 0) {

		for ( var i = 1; i < paths.length; i++) {
			ctx.beginPath();
			/*
			 * ctx.moveTo(paths[i-1].x, paths[i-1].y); ctx.lineTo(paths[i].x,
			 * paths[i].y);
			 */
			ctx.arc(paths[i - 1].x, paths[i - 1].y, 2, 0, 2 * Math.PI, false);
			ctx.strokeStyle = color;
			ctx.lineWidth = y;
			ctx.stroke();
			ctx.closePath();
		}
	}
}

function erase() {
	var m = confirm("Want to clear annotation?");
	if (m) {

		ctx.clearRect(0, 0, w, h);
		allPosX.length = 0;
		allPosY.length = 0;
		boxes.length = 0;
		circles.length = 0;
		paths.length = 0;
		circleString = 0;
		rectString = 0;
		
		SendData();
	}
}

function findxy(res, e) {
	if (drawMood == 0) {
		if (res == 'down') {
			prevX = currX;
			prevY = currY;
			currX = e.clientX - canvas.offsetLeft;
			currY = e.clientY - canvas.offsetTop;

			flag = true;
			dot_flag = true;
			if (dot_flag) {
				ctx.beginPath();
				ctx.fillStyle = color;
				ctx.fillRect(currX, currY, 2, 2);
				ctx.closePath();
				dot_flag = false;
			}
		}

		if (res == 'up' || res == "out") {
			flag = false;
		}

		if (res == 'move') {
			if (flag) {
				prevX = currX;
				prevY = currY;
				currX = e.clientX - canvas.offsetLeft;
				currY = e.clientY - canvas.offsetTop;
				allPosX.push(currX);
				allPosY.push(currY);
				var p = new Path;
				p.x = currX;
				p.y = currY;
				paths.push(p);
				draw();
			}
		}
	} else if (drawMood == 1) {
		// draw circle
		if (res == 'down') {
			startDragging(e);
		}
		if (res == 'move') {
			if (deltaCenter != null) {
				var p = new Point(mouseX(e), mouseY(e));
				var l = circles.length;
				for ( var i = 0; i < l; i++) {
					if (Math.pow(p.x - circles[i].x, 2)
							+ Math.pow(p.y - circles[i].y, 2) < Math.pow(
							circles[i].r, 2)) {
						circles[i].x = (mouseX(e) - deltaCenter.x);
						circles[i].y = (mouseY(e) - deltaCenter.y);
					}
				}
			}
		}
		if (res == 'up' || res == "out") {
			deltaCenter = null;
		}
		draw();
	} else if (drawMood == 2) {
		// draw rectangle
		if (res == 'down') {
			startDraggingRect(e);
		}
		if (res == 'move') {
			if (deltaCenterRect != null) {
				var p = new Point(mouseX(e), mouseY(e));
				var l = boxes.length;
				for ( var i = 0; i < l; i++) {
					if ((boxes[i].x < p.x && boxes[i].y < p.y)
							&& (boxes[i].x + boxes[i].w > p.x && boxes[i].y
									+ boxes[i].h > p.y)) {
						boxes[i].x = (mouseX(e) - deltaCenterRect.x);
						boxes[i].y = (mouseY(e) - deltaCenterRect.y);
					}
				}
			}
		}
		if (res == 'up' || res == "out") {
			deltaCenterRect = null;
		}
		draw();
	}
}

function customSubmit(someValue) {
	document.form1.hiddenValue.value = someValue;
	document.form1.submit();
}

function SendData() {

	if (document.getElementById("send").disabled == false) {

		document.getElementById("send").disabled = true;
		var xmlhttp = null;

		if (window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else {
			// code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {

			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

				document.getElementById("send").disabled = false;
			}
		}
	}
	//if (allPosX.length != 0 && allPosY.length != 0) {
		roomName = document.querySelector("#room-name").value;
		xmlhttp.open("GET", '/DrawOnStream/senddata?paramX=' + allPosX
				+ '&paramY=' + allPosY + '&circles=' + circleString + '&rects='
				+ rectString + '&roomName=' + roomName, true);
		xmlhttp.send();
	//} else {

		//$("#dialog").dialog();
		//document.getElementById("send").disabled = false;
	//}
}

/*
 * stop draw
 */

