'use strict'

const { MongoClient } = require("mongodb");

const uri ="mongodb://mongo-db/?maxPoolSize=20&w=majority";
//host.docker.internal
const client = new MongoClient(uri);

const saveData = async (data)=>
{
    await client.connect();
    // Establish and verify connection
    const col = client.db("test").collection('test');
    

    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const dataa = await col.find({ id: element.id }).toArray();
        if(dataa.length == 0){
            await col.insertOne(element);
        }
    }
    const dataCount = await col.countDocuments();
    
    return dataCount;
}

const getData = async ()=>
{
    await client.connect();
    const col = client.db("test").collection('test');
    const data = await col.find().toArray();
    return data;
}


module.exports = {saveData, getData};