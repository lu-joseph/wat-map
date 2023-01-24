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
const express = require('express')
const app = express()
var db
const dbName = 'my-test'
const port = 3600
let table = 'artifact'
const url = "mongodb://localhost:27017/"

app.listen(port, function () {
    console.log('Listening on ' + port + '.')
})

const MongoClient = require('mongodb').MongoClient

app.route('/').get((req, res) => {
    res.send("Recognized endpoints on this server include '/artifacts' and '/artifacts/NAME'.")
})
app.route('/artifacts').get((req, res) => {
    const db = client.db(dbName);
    db.collection(table).find().toArray((err, artifact) => {
        if (err) throw err
        var artifacts = []
        artifact.forEach((value) => {
            artifacts.push({ scriptname: value.scriptname })
        })
        res.send(artifacts)
    })
})
app.route('/artifacts/:scriptname').get((req, res) => {
    const db = client.db(dbName);
    const scriptname = req.params['scriptname']
    db.collection(table).findOne({ scriptname: scriptname }, function (err, artifact) {
        if (err) throw err
        res.send({
            scriptname: artifact.scriptname,
            version: artifact.version,
            cdn: artifact.cdn
        })
    })
})

MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    db.collection(table).find().toArray((err, artifact) => {
        if (err) throw err
        artifact.forEach((value) => {
        })
        client.close()
    })
})
