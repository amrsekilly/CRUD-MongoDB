// testing script for the CRUD module

var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');

// import the CRUD module
var dboper = require('./operations');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  // if error break
  assert.equal(null, err);
  console.log("Connected correctly to server");

  // start testing the methods in the module
  dboper.insertDocument(db, {
      name: "Vadonut",
      description: "Test"
    },
    "dishes",
    function(result) {
      console.log(result.ops);

      dboper.findDocuments(db, "dishes", function(docs) {
        console.log(docs);

        dboper.updateDocument(db, {
            name: "Vadonut"
          }, {
            description: "Updated Test"
          },
          "dishes",
          function(result) {
            console.log(result.result);

            dboper.findDocuments(db, "dishes", function(docs) {
              console.log(docs)

              db.dropCollection("dishes", function(result) {
                console.log(result);
                // close your connection to the DB
                db.close();
              });
            });
          });
      });
    });
});
