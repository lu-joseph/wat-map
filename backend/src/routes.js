"use strict";
// This program creates a data server which uses Express
// to retrieve data from a MongoDB instance to create three
// distinct endpoints on port 3600 of locahost.  Data which
// appears in the MongoDB “artifacts” table become
// JSON-formatted responses to requests on port 3600.
//
// “Route” is a crucial concept in Express.  This particular
// dataserver defines three routes:
// * ‘/’ returns a human-readable message;
// * ‘/artifacts’ returns a list of artifact names; and
// * `/artifacts/NAME’ returns details about NAME.
Object.defineProperty(exports, "__esModule", { value: true });
var Graph_1 = require("./app/Graph");
// const MongoClient = require('mongodb').MongoClient
var express = require('express');
var cors = require('cors');
var app = express();
var db;
var dbName = 'my-test';
var port = 3600;
var table = 'artifact';
// const url = "mongodb://localhost:27017/"
var mongodb;
app.use(cors());
app.route('/').get(function (req, res) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.send("Recognized endpoints on this server include '/artifacts' and '/artifacts/NAME'.");
});
app.route('/artifacts').get(function (req, res) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    var db = mongodb.db(dbName);
    db.collection(table).find().toArray(function (err, artifact) {
        if (err)
            throw err;
        var artifacts = [];
        artifact.forEach(function (value) {
            artifacts.push({ scriptname: value.scriptname });
        });
        res.send(artifacts);
    });
});
app.route('/artifacts/:scriptname').get(function (req, res) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    var db = mongodb.db(dbName);
    var scriptname = req.params['scriptname'];
    db.collection(table).findOne({ scriptname: scriptname }, function (err, artifact) {
        if (err)
            throw err;
        res.send({
            scriptname: artifact.scriptname,
            version: artifact.version,
            cdn: artifact.cdn
        });
    });
});
app.route('/dijkstra/:from-:to').get(function (req, res) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    var from = req.params['from'];
    var to = req.params['to'];
    var graph = new Graph_1.Graph();
    var path = graph.djikstraAlgorithm(from, to);
    res.send({ path: path });
});
// MongoClient.connect(url, (err: any, client: any) => {
//     mongodb = client;
//     const db = client.db(dbName);
//     console.log('Connected')
//     // db.collection(table).find().toArray((err, artifact) => {
//     //     if (err) throw err
//     //     artifact.forEach((value) => {
//     //         // console.log(value.scriptname)
//     //     })
//     //     client.close()
//     // })
app.listen(port, function () {
    console.log('Listening on ' + port + '.');
});
// })
