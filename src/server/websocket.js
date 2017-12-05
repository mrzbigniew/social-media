'use strict'

const WebSocket = require('ws');
const _ = require('lodash');
const clients = [];

exports.connect = function (server) {
    const wss = new WebSocket.Server({ server: server });
    wss.on('connection', function (ws) {
        exports.broadcast('New user joined');
        clients.push(ws);
        ws.on('close', function () {
            _.remove(clients, ws);
        });

        ws.on('message', function (message) {
            console.log('Got message ' + message);
        });
    });
};

exports.broadcast = function (topic, data) {
    const json = JSON.stringify({topic: topic, data: data});

    clients.forEach(function(client){
        client.send(json);
    });
};
