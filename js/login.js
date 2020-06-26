const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb+srv://test:test@kruggel-cluster-qprk6.azure.mongodb.net/test?retryWrites=true&w=majority';

MongoClient.connect(url, function(err, client) {
    const db = client.db("test");
    var cursor = db.collection('test').find({user: { userName: "David", password: "test"}});

    function iterateFunc(doc) {
        console.log(JSON.stringify(doc, null, 4));
    }

    function errorFunc(error) {
        console.log(error);
    }

    cursor.forEach(iterateFunc, errorFunc);
    client.close();
});

export default login;