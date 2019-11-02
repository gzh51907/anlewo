const { MongoClient } = require('mongodb');
const { DBname, DBurl } = require('../config.json');
const ObjectId = require('mongodb').ObjectId;

async function connect() {
    let result = null;
    try {
        //连接数据库
        let client = await MongoClient.connect(DBurl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        let db = client.db(DBname);
        result = { db, client };
    } catch (err) {
        result = err;
    }
    return result;
}

async function create(colName, data) {
    let { db, client } = await connect();
    //连接集合
    let col = db.collection(colName);
    let result = await col.insertMany(data);
    client.close();
    return result;
}

async function remove(colName, _id) {
    let { db, client } = await connect();
    console.log(_id);
    //连接集合
    let col = db.collection(colName);
    let result = await col.deleteMany({ _id: ObjectId(_id) });
    client.close();
    return result;
}

async function update(colName, _id, newData) {
    let { db, client } = await connect();
    //连接集合
    let col = db.collection(colName);
    let result = await col.updateMany({ _id: ObjectId(_id) }, newData);
    client.close();
    return result;
}

async function bfind(colName, page, num, query = {}) {
    let { db, client } = await connect();
    //连接集合
    console.log(num, page, query);
    let col = db.collection(colName);
    let result = await col.find(query).limit(num - 0).skip(page * num).toArray();
    client.close();
    return result;
}

async function dfind(colName, query = {}) {
    let { db, client } = await connect();
    let col = db.collection(colName);
    console.log(colName, query);

    // 查询数据库
    let result = await col.find(query).toArray();
    // console.log(result)
    // 关闭数据库连接
    client.close();
    //返回结果
    return result;
}

module.exports = {
    create,
    remove,
    update,
    bfind,
    dfind
}