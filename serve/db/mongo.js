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

async function find(colName, pages, num, sort = 0, des = {}) {
    let { db, client } = await connect();
    //连接集合
    console.log(num, pages, sort, des);
    let col = db.collection(colName);
    let result = null;
    if (des == "印度尼西亚") {
        des = {
            des: /^印度尼西亚·/
        }
    } else if (des == "泰国") {
        des = {
            des: /^泰国·/
        }
    } else if (des == "越南") {
        des = {
            des: /^越南·/
        }
    } else if (des == "新加坡") {
        des = {
            des: /^新加坡·/
        }
    } else if (des == "中国") {
        des = {
            des: /^中国/
        }
    } else if (des == "柬埔寨") {
        des = {
            des: /^柬埔寨·/
        }
    } else if (des == "菲律宾") {
        des = {
            des: /^菲律宾·/
        }
    } else if (des == "西班牙") {
        des = {
            des: /^西班牙·/
        }
    } else if (des == "日本") {
        des = {
            des: /^日本·/
        }
    }
    if (sort == 0) {
        result = await col.find(des).limit(num - 0).skip(pages * num).toArray();
    } else {
        result = await col.find(des).limit(num - 0).skip(pages * num).sort({ comment: sort - 0 }).toArray();
    }
    client.close();
    return result;
}

async function bfind(colName, id) {
    // console.log(id);
    let { db, client } = await connect();
    //连接集合
    // console.log(num, pages, sort);
    let col = db.collection(colName);
    let result = await col.find(id).toArray();
    client.close();
    return result;
}

async function afind(colName, pages, num, tage, sort = {}, des = {}, dy = 0, xy = 0) {
    let { db, client } = await connect();
    //连接集合
    let col = db.collection(colName);
    // console.log(colName, pages, num, tage, sort, des, dy, xy);
    let result = null;
    if (des == "印度尼西亚") {
        des = {
            info: /^印度尼西亚/
        }
    } else if (des == "泰国") {
        des = {
            info: /^泰国/
        }
    } else if (des == "越南") {
        des = {
            info: /^越南/
        }
    } else if (des == "新加坡") {
        des = {
            info: /^新加坡/
        }
    } else if (des == "中国") {
        des = {
            info: /^中国/
        }
    } else if (des == "柬埔寨") {
        des = {
            info: /^柬埔寨/
        }
    } else if (des == "菲律宾") {
        des = {
            info: /^菲律宾/
        }
    } else if (des == "西班牙") {
        des = {
            info: /^西班牙/
        }
    } else if (des == "日本") {
        des = {
            info: /^日本/
        }
    } else {
        des = {
            info: /./
        }
    }
    console.log(colName, pages, num, tage, sort, des.info, dy, xy);
    if (sort == 0) {
        if (dy == 0 & xy == 0) {
            result = await col.find({ tage: tage, info: des.info }).limit(num - 0).skip(pages * num).toArray();
        } else if (xy == 0) {
            result = await col.find({ price: { $gt: dy - 0 }, tage: tage, info: des.info }).limit(num - 0).skip(pages * num).toArray();
        } else if (dy == 0) {
            result = await col.find({ price: { $lt: xy - 0 }, tage: tage, info: des.info }).limit(num - 0).skip(pages * num).toArray();
        } else {
            result = await col.find({ price: { $gt: dy - 0, $lt: xy - 0 }, tage: tage, info: des.info }).limit(num - 0).skip(pages * num).toArray();
        }
    } else {
        if (dy == 0 & xy == 0) {
            result = await col.find({ tage: tage, info: des.info }).limit(num - 0).skip(pages * num).sort({ price: sort - 0 }).toArray();
        } else if (dy == 0) {
            result = await col.find({ price: { $lt: xy - 0 }, tage: tage, info: des.info }).limit(num - 0).skip(pages * num).sort({ price: sort - 0 }).toArray();
        } else if (xy == 0) {
            result = await col.find({ price: { $gt: dy - 0 }, tage: tage, info: des.info }).limit(num - 0).skip(pages * num).sort({ price: sort - 0 }).toArray();
        } else {
            result = await col.find({ price: { $gt: dy - 0, $lt: xy - 0 }, tage: tage, info: des.info }).limit(num - 0).skip(pages * num).sort({ price: sort - 0 }).toArray();
        }
    }
    client.close();
    return result;
}

async function cfind(colName, id, tage) {
    let { db, client } = await connect();
    //连接集合
    console.log(colName, id, tage);
    let col = db.collection(colName);
    let result = null;
    if (colName == 'guide') {
        result = await col.find({ _id: ObjectId(id) }).toArray();
    } else if (colName == "tour") {
        result = await col.find({ _id: ObjectId(id), tage: tage }).toArray();
    }
    client.close();
    return result;
}

async function dfind(colName, query = {}) {
    let { db, client } = await connect();
    let col = db.collection(colName);
    // console.log(colName, query);

    // 查询数据库
    let result = await col.find(query).toArray();

    // 关闭数据库连接
    client.close();
    //返回结果
    return result;
}

module.exports = {
    create,
    remove,
    update,
    find,
    bfind,
    afind,
    cfind,
    dfind
}