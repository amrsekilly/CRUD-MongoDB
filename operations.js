// require the assert module to handle errors
var assert = require('assert');

// the method will allow the insertion of a document into a given collection
exports.insertDocument = function(db, document, collection, callback) {
  // Get the documents collection
  var coll = db.collection(collection);
  // Insert some documents
  coll.insert(document, function(err, result) {
    // if error break
    assert.equal(err, null);
    // log the operation to the server
    console.log("Inserted " + result.result.n + " documents into the document collection " +
      collection);
    callback(result);
  });
};

// helps the user find documents
exports.findDocuments = function(db, collection, callback) {
  // Get the documents collection
  var coll = db.collection(collection);

  // Find some documents
  coll.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
};

// remove a document from a collection
exports.removeDocument = function(db, document, collection, callback) {

  // Get the documents collection
  var coll = db.collection(collection);

  // Delete the document
  coll.deleteOne(document, function(err, result) {
    assert.equal(err, null);
    console.log("Removed the document " + document);
    callback(result);
  });
};

// update a document in a collection
exports.updateDocument = function(db, document, update, collection, callback) {

  // Get the documents collection
  var coll = db.collection(collection);

  // Update document
  coll.updateOne(document, {
    $set: update
  }, null, function(err, result) {

    assert.equal(err, null);
    console.log("Updated the document with " + update);
    callback(result);
  });
};
