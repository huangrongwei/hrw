const {
  MongoClient,
  ObjectId
} = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = '1810';
// Use connect method to connect to the server

let connect = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (err) {
        reject(err)
      } else {
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        resolve({
          db,
          client
        })
      }
    });
  })
}

let insert = (col, arr) => {
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    const collection = db.collection(col);
    collection.insert(arr, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result);
        client.close();
      }
    })
  })
}

let find = (collectionName, query) => {
  return new Promise(async (resolve, reject) => {
      let {
          db,
          client
      } = await connect();

      let col = db.collection(collectionName);
      // 条件筛选
      if (query._id) {
          query._id = ObjectId(query._id);
      }
      col.find(query).toArray((err, result) => {
          if (err) {
              reject(err);
          }
          resolve(result);
          client.close();
      })
  });
}
let update = (collectionName, query, data) => {
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    let col = db.collection(collectionName);
    if (query._id) {
      query = {
        _id: ObjectId(query._id)
      };
      col.update(query, {
        $set: data
      }, {
        multi: true
      }, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
        client.close();
      });
    }
  });
}

let delete1 = (collectionName, query) => {
  return new Promise(async (resolve, reject) => {
      let {
          db,
          client
      } = await connect();
      let col = db.collection(collectionName);
      // 条件筛选
      // 如有id, 则只要使用id查询
      if (query._id) {
          query = {
              _id: ObjectId(query._id)
          };
      }
      col.remove(query, (err, result) => {
          if (err) {
              reject(err);
          }
          resolve(result);
          client.close();
      });
  });
}

module.exports = {
  delete1,
  update,
  connect,
  insert,
  find,
  ObjectId
}

// node express mongodb jquery