'use strict'

const axios = require('axios');

const getDataApi = async ()=>
{
    return await axios.get("https://app.geckoterminal.com/api/p1/bsc/pools").then(data => {
        return data.data;
    });
}


module.exports = getDataApi;