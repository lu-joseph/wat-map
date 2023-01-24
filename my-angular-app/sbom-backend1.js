var MongoClient = require('mongodb').MongoClient

const url = "mongodb://localhost:27017/"
const dbName = 'my-test'
const table = 'artifact'

MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    db.collection(table).find().toArray((err, artifact) => {
        if (err) throw err
        artifact.forEach((value) => {
            console.log(value.scriptname)
        })
        client.close()
    })
})
