'use strict';
var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 3000;
var validHTMLurl = ["/S1/index.html", "/S2/index.html", "/S3/index.html", "/S4/index.html", "/S5/index.html"];
var validJSurl = ["/S1/index.js", "/S2/index.js", "/S3/index.js", "/S4/index.js", "/S5/index.js"];
var validCSSurl = "/css/style.css";
var validAssets = "/assets";

function responseTextFile(req, res, url, mime) {
    fs.readFile(url, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Content not found.\n');
        } else {
            res.writeHead(200, { 'Content-Type': mime });
            res.end(data.toString());
        }
    });
}

function responseFile(req, res, url) {
    fs.readFile(url, "binary", (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Content not found.\n');
        } else {
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.write(data, "binary");
            res.end();
        }
    });
}

http.createServer(function (req, res) {
    if (req.url === "/number") {
        setTimeout(() => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end((1 + Math.floor(Math.random() * 10)).toString());
        }, 1000 * (1 + Math.random() * 2));
    } else if (req.url === "/number2") {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end((1 + Math.floor(Math.random() * 10)).toString());
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("Server failed due to bad mood.");
            }
        }, 1000 * (1 + Math.random() * 2));
    } else if (validHTMLurl.find((value, index, arr) => {
        return value === req.url;
    })) {
        responseTextFile(req, res, req.url.substr(1), "text/html");
    } else if (validJSurl.find((value, index, arr) => {
        return value === req.url;
    })) {
        responseTextFile(req, res, req.url.substr(1), "text/javascript");
    } else if (req.url === validCSSurl) {
        responseTextFile(req, res, req.url.substr(1), "text/css");
    } else if (req.url.substr(0, 7) === validAssets) {
        responseFile(req, res, req.url.substr(1));
    } else {
        responseTextFile(req, res, "index.html", "text/html");
    }
}).listen(port);

console.log("Server listening on port 3000.\nPress Ctrl + C to end the server.");