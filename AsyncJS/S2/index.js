// JavaScript Document

var active_buttons = [true, true, true, true, true];
var get_numbers = [0, 0, 0, 0, 0];
var xmlhttp;
var current_index;
var auto = false;
var timeoutProcess;

function disable_buttons() {
	'use strict';
	var i;
	$("#control-ring li").addClass("disabled");
	for (i = 0; i < 5; i++) {
		active_buttons[i] = false;
	}
}

function enable_buttons() {
    'use strict';
    var i;
    var all_get = true;
    for (i = 0; i < 5; i++) {
        if (get_numbers[i] === 0) {
            active_buttons[i] = true;
            $("#control-ring li")[i].classList.remove("disabled");
            all_get = false;
        }
    }
    if (all_get) {
        $("#info-bar").removeClass("info-bar-disabled");
        if (auto) {
            timeoutProcess = setTimeout(function () {
                $("#info-bar").click();
            }, 500);
		}
    } else {
        if (auto) {
            timeoutProcess = setTimeout(function () {
                $("#control-ring li")[current_index + 1].click();
            }, 500);
        }
	}
}

function xmlhttp_onreadystatechange() {
	'use strict';
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        get_numbers[current_index] = xmlhttp.responseText;
        $("#control-ring li")[current_index].childNodes[1].innerText = get_numbers[current_index];
        enable_buttons();
    }
}

$(document).ready(function () {
	'use strict';
	$("#control-ring li").click(function (event) {
		var i;
		for (i = 0; i < 5; i++) {
			if ($("#control-ring li")[i] === event.currentTarget) {
				if (active_buttons[i]) {
                    event.currentTarget.childNodes[1].style.opacity = 1;
                    if (!xmlhttp) {
                        xmlhttp = new XMLHttpRequest();
                        xmlhttp.onreadystatechange = xmlhttp_onreadystatechange;
                    }
                    current_index = i;
                    xmlhttp.open("GET", "/number", true);
                    xmlhttp.send();
					disable_buttons();
                }
                break;
			}
		}
    });
    $("#info-bar").click(function () {
        var sum = 0;
        var i;
        for (i = 0; i < 5; i++) {
            if (get_numbers[i] === 0) {
                return;
            }
            sum += Number(get_numbers[i]);
        }
        $(".info").text(sum.toString());
        $("#info-bar").addClass("info-bar-disabled");
    });
    $(".icon").click(function () {
        if (!auto) {
            auto = true;
            $("#control-ring li")[0].click();
        }
	});
    $("#at-plus-container").mouseleave(function () {
        var i;
        auto = false;
        clearTimeout(timeoutProcess);
        if (xmlhttp) {
            xmlhttp.abort();
        }
        xmlhttp = null;
        for (i = 0; i < 5; i++) {
            active_buttons[i] = true;
            get_numbers[i] = 0;
            $("#control-ring li")[i].childNodes[1].style.opacity = 0;
            $("#control-ring li")[i].childNodes[1].innerText = "...";
        }
        $("#info-bar").addClass("info-bar-disabled");
        $(".info").text("");
        enable_buttons();
	});
});