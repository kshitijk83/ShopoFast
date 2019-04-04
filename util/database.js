const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (cb)=>{
    MongoClient.connect('mongodb+srv://kshitijk83:451422ere@paracticing-bfzmz.mongodb.net/test?retryWrites=true')
        .then(client=>{
            console.log('connected');
            _db = client.db();
            cb();
        })
        .catch(err=>{
            console.log(err);
            throw err;
        })
}

const getDB = ()=>{
    if(_db){
        return _db;
    }
    throw 'No DataBase Found';
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;