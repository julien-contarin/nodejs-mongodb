// Dependencies
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection string
const url = "mongodb+srv://julien:Dtb123basF789*@tmppac-ojq5t.mongodb.net/testdb?retryWrites=true&w=majority";

// Create Client
const client = new MongoClient(url, { useUnifiedTopology: true });

// Connection to server
client.connect(function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db('testdb');
  changeStream(db, function() {
    client.close();
  });
});

// Start change stream
function changeStream(db, callback) {
  const collection = db.collection('client');
  const changeStream = collection.watch({ fullDocument: 'updateLookup' });

  changeStream.on('change', next =>{
    fullDocument = next.fullDocument;
    console.log(fullDocument);
    collection.updateOne(
       {"_id":fullDocument._id},
       [{$set: {nbContrats:{$size:"$contrats"}}}]
    )

  });
};
