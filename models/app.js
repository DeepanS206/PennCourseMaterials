/*var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

var drop = function(db, name, callback) {
  db.dropCollection(name, function(err, results) {
    callback(results);
  });
};

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  insertDocuments(db, function() {
    findDocuments(db, function() {
      drop(db, 'documents', function() {
        db.close();
      });
    });
  });
});*/

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

var insertUser = function(record, db, callback) {
  var users = db.collection('users');
  users.insertOne(record, function(err, r) {
    if (err) {
      console.log("sumting wong");
      callback(err, null);
    } else {
      console.log('adding one user good');
      callback(false, r);
    }
  });
};

module.exports = {
  addUser: function(username, pw, fullname, email, callback) {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
      doc = {'username':username, 'pw':pw, 'fullname':fullname, 'email':email};
      console.log(data);
      insertUser(doc, db, function(err, r) {
        if (err) {
          callback(err, null);
        } else {
          console.log('success');
          callback(r);
        }
      });
    });
  }
};