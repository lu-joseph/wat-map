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

import { Graph } from './app/Graph';

const MongoClient = require('mongodb').MongoClient
const express = require('express')
var cors = require('cors')
const app = express()
var db
const dbName = 'my-test'
const port = 3600
let table = 'artifact'
const url = "mongodb://localhost:27017/"

var mongodb: any;

app.use(cors())

app.route('/').get((req: any, res: any) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.send("Recognized endpoints on this server include '/artifacts' and '/artifacts/NAME'.")
})
app.route('/artifacts').get((req: any, res: any) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    const db = mongodb.db(dbName);
    db.collection(table).find().toArray((err: any, artifact: any) => {
        if (err) throw err
        var artifacts: any = []
        artifact.forEach((value: any) => {
            artifacts.push({ scriptname: value.scriptname })
        })
        res.send(artifacts)
    })
})
app.route('/artifacts/:scriptname').get((req: any, res: any) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    const db = mongodb.db(dbName);
    const scriptname = req.params['scriptname'];
    db.collection(table).findOne({ scriptname: scriptname }, function (err: any, artifact: any) {
        if (err) throw err
        res.send({
            scriptname: artifact.scriptname,
            version: artifact.version,
            cdn: artifact.cdn
        })
    })
})
app.route('/dijkstra').get((req: any, res: any) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    var buildings: { buildingName: string }[] = [];
    var graph = new Graph();
    var path = graph.djikstraAlgorithm("DWE", "PAC");
    path.forEach((value) => {
        buildings.push({ buildingName: value })
    })
    res.send(buildings);
})




MongoClient.connect(url, (err: any, client: any) => {

    mongodb = client;
    const db = client.db(dbName);
    console.log('Connected')
    // db.collection(table).find().toArray((err, artifact) => {
    //     if (err) throw err
    //     artifact.forEach((value) => {
    //         // console.log(value.scriptname)
    //     })
    //     client.close()
    // })
    app.listen(port, function () {
        console.log('Listening on ' + port + '.')
    })
})
