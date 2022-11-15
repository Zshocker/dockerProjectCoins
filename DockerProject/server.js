'use strict';

const getDataApi = require('./App/controllers/apiCont');
const saveData = require('./App/controllers/MongoAccess').saveData;
const getData = require('./App/controllers/MongoAccess').getData;

const express = require('express');

// Constants
const PORT = 8081;
const HOST = '0.0.0.0';

// App
const app = express();


app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', '*');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/', (req, res) => 
{
  res.send('Hello ilisi 3');
});

app.get('/getCoins', async (req, res) => 
{
    const data = await getDataApi();
    res.send(data);
});

app.get('/getAndSave', async (req, res) => 
{
    const data = await getDataApi();
    const count = await saveData(data.data);
    res.send("inserted " + data.data.length + " coin data \ntotal inseted " + count + " coin data");
});

app.get('/getData', async (req, res) => 
{
    const data = await getData();
    res.send(data);
});


app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});