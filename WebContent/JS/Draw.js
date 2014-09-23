/*
 * 
 draw start 

 */

var canvas, ctx, flag = false, prevX = 0, currX = 0, prevY = 0, currY = 0, x = "red", y = 2, dot_flag = false;

var allPosX = new Array();
var allPosY = new Array();
var roomName = "";

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
	console.log("draw initialize");
}

function writeMessage(canvas, message) {
	var context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, 40);
	context.font = '18pt Calibri';
	context.fillStyle = 'white';

	context.fillText(message, 10, 25);

}

function draw() {
	ctx.beginPath();
	ctx.moveTo(prevX, prevY);
	ctx.lineTo(currX, currY);
	ctx.strokeStyle = x;
	ctx.lineWidth = y;
	ctx.stroke();
	ctx.closePath();
}

function erase() {
	var m = confirm("Want to clear annotation?");
	if (m) {

		ctx.clearRect(0, 0, w, h);
		allPosX.length = 0;
		allPosY.length = 0;
	}
}

function findxy(res, e) {
	if (res == 'down') {
		prevX = currX;
		prevY = currY;
		currX = e.clientX - canvas.offsetLeft;
		currY = e.clientY - canvas.offsetTop;

		flag = true;
		dot_flag = true;
		if (dot_flag) {
			ctx.beginPath();
			ctx.fillStyle = x;
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
			draw();
		}
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
	if (allPosX.length != 0 && allPosY.length != 0) {
		roomName = document.querySelector("#room-name").value;
		console.log(roomName);
		xmlhttp.open("GET", '/DrawOnStream/senddata?paramX=' + allPosX
				+ '&paramY=' + allPosY + '&roomName=' + roomName, true);
		xmlhttp.send();
	} else {

		$("#dialog").dialog();
		document.getElementById("send").disabled = false;
	}
}

/*
 * stop draw
 */

