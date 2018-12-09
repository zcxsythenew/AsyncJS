// JavaScript Document

function aHandler(currentSum, handlers, index, err) {
	"use strict";
	var xmlhttp;
	if (err) {
        $(".tip").html($(".tip").html() + err.message);
	}
	$("#control-ring li")[0].childNodes[1].style.opacity = 1;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = (function (currentSum, xmlhttp, handlers, index) {
		return function() {
			if (xmlhttp.readyState === 4) {
				if (xmlhttp.status === 200) {
					$("#control-ring li")[0].childNodes[1].innerText = xmlhttp.responseText;
                    $(".tip").html($(".tip").html() + "这是个天大的秘密<br />");
					handlers[index + 1](currentSum + Number(xmlhttp.responseText), handlers, index + 1);
				} else {
                    handlers[index + 1](currentSum, handlers, index + 1, { "message": "这不是个天大的秘密<br />", "currentSum": currentSum });
				}
			}
		};
	})(currentSum, xmlhttp, handlers, index);
	xmlhttp.open("GET", "/number2", true);
	xmlhttp.send();
}

function bHandler(currentSum, handlers, index, err) {
	"use strict";
	var xmlhttp;
	if (err) {
        $(".tip").html($(".tip").html() + err.message);
	}
	$("#control-ring li")[1].childNodes[1].style.opacity = 1;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = (function (currentSum, xmlhttp, handlers, index) {
		return function() {
			if (xmlhttp.readyState === 4) {
				if (xmlhttp.status === 200) {
					$("#control-ring li")[1].childNodes[1].innerText = xmlhttp.responseText;
                    $(".tip").html($(".tip").html() + "我不知道<br />");
					handlers[index + 1](currentSum + Number(xmlhttp.responseText), handlers, index + 1);
				} else {
                    handlers[index + 1](currentSum, handlers, index + 1, { "message": "我知道<br />", "currentSum": currentSum });
				}
			}
		};
	})(currentSum, xmlhttp, handlers, index);
	xmlhttp.open("GET", "/number2", true);
	xmlhttp.send();
}

function cHandler(currentSum, handlers, index, err) {
	"use strict";
	var xmlhttp;
	if (err) {
        $(".tip").html($(".tip").html() + err.message);
	}
	$("#control-ring li")[2].childNodes[1].style.opacity = 1;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = (function (currentSum, xmlhttp, handlers, index) {
		return function() {
			if (xmlhttp.readyState === 4) {
				if (xmlhttp.status === 200) {
					$("#control-ring li")[2].childNodes[1].innerText = xmlhttp.responseText;
                    $(".tip").html($(".tip").html() + "你不知道<br />");
					handlers[index + 1](currentSum + Number(xmlhttp.responseText), handlers, index + 1);
				} else {
                    handlers[index + 1](currentSum, handlers, index + 1, { "message": "你知道<br />", "currentSum": currentSum });
				}
			}
		};
	})(currentSum, xmlhttp, handlers, index);
	xmlhttp.open("GET", "/number2", true);
	xmlhttp.send();
}

function dHandler(currentSum, handlers, index, err) {
	"use strict";
	var xmlhttp;
	if (err) {
        $(".tip").html($(".tip").html() + err.message);
	}
	$("#control-ring li")[3].childNodes[1].style.opacity = 1;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = (function (currentSum, xmlhttp, handlers, index) {
		return function() {
			if (xmlhttp.readyState === 4) {
				if (xmlhttp.status === 200) {
					$("#control-ring li")[3].childNodes[1].innerText = xmlhttp.responseText;
                    $(".tip").html($(".tip").html() + "他不知道<br />");
					handlers[index + 1](currentSum + Number(xmlhttp.responseText), handlers, index + 1);
				} else {
                    handlers[index + 1](currentSum, handlers, index + 1, { "message": "他知道<br />", "currentSum": currentSum });
				}
			}
		};
	})(currentSum, xmlhttp, handlers, index);
	xmlhttp.open("GET", "/number2", true);
	xmlhttp.send();
}

function eHandler(currentSum, handlers, index, err) {
	"use strict";
	var xmlhttp;
	if (err) {
        $(".tip").html($(".tip").html() + err.message);
	}
	$("#control-ring li")[4].childNodes[1].style.opacity = 1;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = (function (currentSum, xmlhttp, handlers, index) {
		return function() {
			if (xmlhttp.readyState === 4) {
				if (xmlhttp.status === 200) {
					$("#control-ring li")[4].childNodes[1].innerText = xmlhttp.responseText;
                    $(".tip").html($(".tip").html() + "才怪<br />");
					handlers[index + 1](currentSum + Number(xmlhttp.responseText), handlers, index + 1);
				} else {
                    handlers[index + 1](currentSum, handlers, index + 1, { "message": "才不怪<br />", "currentSum": currentSum });
				}
			}
		};
	})(currentSum, xmlhttp, handlers, index);
	xmlhttp.open("GET", "/number2", true);
	xmlhttp.send();
}

function bubbleHandler(currentSum, handlers, index, err) {
	"use strict";
	if (err) {
        $(".tip").html($(".tip").html() + err.message);
	}
    $(".info").text(currentSum.toString());
}

$(document).ready(function () {
	"use strict";
	$(".icon").click(function (event) {
		if (!event.currentTarget.classList.contains("icon-disabled")) {
			event.currentTarget.classList.add("icon-disabled");
			var handlers = [aHandler, bHandler, cHandler, dHandler, eHandler];
			handlers.sort(function () {
				return Math.random() - 0.5;
			});
			handlers.push(bubbleHandler);
			handlers[0](0, handlers, 0);
		}
	});
});