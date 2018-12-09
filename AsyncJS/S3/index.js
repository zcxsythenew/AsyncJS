// JavaScript Document

var active_buttons = [true, true, true, true, true];
var get_numbers = [0, 0, 0, 0, 0];
var xmlhttp = [null, null, null, null, null];
var auto = false;

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
    var all_get;
    if (!auto) {
        all_get = true;
        for (i = 0; i < 5; i++) {
            if (get_numbers[i] === 0) {
                active_buttons[i] = true;
                $("#control-ring li")[i].classList.remove("disabled");
                all_get = false;
            }
        }
    } else {
        all_get = true;
        for (i = 0; i < 5; i++) {
            if (get_numbers[i] === 0) {
                all_get = false;
                break;
            }
        }
    }
    if (all_get) {
        $("#info-bar").removeClass("info-bar-disabled");
        if (auto) {
            $("#info-bar").click();
        }
    }
}

/* function xmlhttp_onreadystatechange() {
	'use strict';
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        get_numbers[current_index] = xmlhttp.responseText;
        $("#control-ring li")[current_index].childNodes[1].innerText = get_numbers[current_index];
        enable_buttons();
    }
} */

$(document).ready(function () {
	'use strict';
	$("#control-ring li").click(function (event) {
		var i;
		for (i = 0; i < 5; i++) {
			if ($("#control-ring li")[i] === event.currentTarget) {
				if (active_buttons[i]) {
                    event.currentTarget.childNodes[1].style.opacity = 1;
                    if (!xmlhttp[i]) {
                        xmlhttp[i] = new XMLHttpRequest();
                        xmlhttp[i].onreadystatechange = function (i, xmlhttp, get_numbers, $, enable_buttons) {
							return function () {
								if (xmlhttp[i].readyState === 4 && xmlhttp[i].status === 200) {
									get_numbers[i] = xmlhttp[i].responseText;
									$("#control-ring li")[i].childNodes[1].innerText = get_numbers[i];
									enable_buttons();
								}
							};
						}(i, xmlhttp, get_numbers, $, enable_buttons);
                    }
                    xmlhttp[i].open("GET", "/number", true);
                    xmlhttp[i].send();
                    if (!auto) {
                        disable_buttons();
                    }
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
        var i;
        if (!auto) {
            auto = true;
            for (i = 0; i < 5; i++) {
                $("#control-ring li")[i].click();
            }
            disable_buttons();
        }
    });
    $("#at-plus-container").mouseleave(function () {
        var i;
        for (i = 0; i < 5; i++) {
            if (xmlhttp[i]) {
                xmlhttp[i].abort();
                xmlhttp[i] = null;
            }
        }
        auto = false;
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