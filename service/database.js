const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('officedb');
const collection = db.collection('userInfo');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log("Database connection successful!");
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUserByToken(token){
    return collection.findOne({token : token});
}

function getUser(field, value){
    const query = {}
    query[field] = value;
    return collection.findOne(query);
}

function updateUser(user){
    return collection.updateOne({_id : user._id}, {$set : user});
}

function createUser(user){
    return collection.insertOne(user);
}

function deleteUserByToken(authToken){
    return collection.deleteOne({token : authToken})
}

module.exports = {
  createUser, 
  updateUser, 
  getUser, 
  getUserByToken,
  deleteUserByToken,
};