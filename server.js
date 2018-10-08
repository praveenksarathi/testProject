'use strict';

var express = require('express');
var app = express();
var fs = require("fs");
var path = require('path');
var route = require(path.resolve('../nodejs-REST-demo/application.js'));

app.get('/myapp',function (req, res) {
    console.log(`The ApplicationType is %s`,req.get('ApplicationType'));
    var data = req.get('ApplicationType');
    res.sendStatus(200);

})

app.post('/myapp',function (req, res) {
//    console.log(`The ApplicationType is %s`,req.get('ApplicationType'));
    var data = req.get('ApplicationType');
    console.log(`The ApplicationType is %s`,data);

        if (data.toUpperCase() === "CANARYDEPLOYMENTS")
		{
			route.canaryDeployments();	
			res.status(200).send('Routed to Canary Deployment machines');
		} else if (data.toUpperCase() === "NORMALDEPLOYMENTS") {
			route.normalDeployments();
			res.status(200).send('Routed to Normal Deployment machines');

		} else {
			route.unknownDeployments();
			res.status(500).send('Unknown request');
		}

})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("The server listening at http://%s:%s", host, port)

})
