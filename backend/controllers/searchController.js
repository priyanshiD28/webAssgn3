const axios = require('axios')
const API_KEY = 'cnaq0opr01ql0f8adqdgcnaq0opr01ql0f8adqe0'

const getCompanyProfile = async (request,res) => {
    const {ticker} = request.params
    axios.get('https://finnhub.io/api/v1/stock/profile2?symbol='+ticker+'&token='+API_KEY)
    .then(function (response) {
        // handle success
        // console.log(response.data);
        return res.status(200).json(response.data);
    })
    .catch(function (error) {
        // handle error
        // console.log(error);
        return res.status(400).json({err: error.message})
    })
}

const gethighCharts = async (request,res) => {
    const {ticker} = request.params
    const toDate = new Date()
    const fromDate = new Date(toDate.getFullYear()-2, toDate.getMonth(), toDate.getDate())
    const to = toDate.toISOString().split('T')[0]
    const from = fromDate.toISOString().split('T')[0]
    
    axios.get('https://api.polygon.io/v2/aggs/ticker/'+ticker+'/range/1/day/'+from+'/'+to+'/?adjusted=true&sort=asc&apiKey=RWRGhid9mhm7UB96epjUSxcgyKLgBC1G')
    .then(function (response) {
        // handle success
        //console.log(response.data);
        return res.status(200).json(response.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        return res.status(400).json({err: error.message})
    })
}

const gethourlyCharts = async (request,res) => {
    const {ticker} = request.params
    // const { startFormatted, endFormatted } = getHourlyRangePDT00()
    axios.get('https://api.polygon.io/v2/aggs/ticker/'+ticker+'/range/1/hour/2024-03-25/2024-03-26?adjusted=true&sort=asc&apiKey=RWRGhid9mhm7UB96epjUSxcgyKLgBC1G')
    .then (function (response) {
        // console.log(response.data);
        res.json(response.data);
      }) 
    .catch (function (error) {
        console.error('Error fetching data:',error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
      })
}

const getStockQuote = async (request,res) => {
    const {ticker} = request.params
    axios.get('https://finnhub.io/api/v1/quote?symbol='+ticker+'&token='+API_KEY)
    .then(function (response) {
        // handle success
        // console.log(response.data);
        return res.status(200).json(response.data);
    })
    .catch(function (error) {
        // handle error
        // console.log(error);
        return res.status(400).json({err: error.message})
    })
}

const getAutoComplete = async (request,res) => {
    const {ticker} = request.params
    axios.get('https://finnhub.io/api/v1/search?q='+ticker+'&token='+API_KEY)
    .then(function (response) {
        // handle success
        // console.log(response.data);
        return res.status(200).json(response.data);
    })
    .catch(function (error) {
        // handle error
        // console.log(error);
        return res.status(400).json({err: error.message})
    })
}

const getCompanyNews = async (request,res) => {
    const {ticker} = request.params
    // const currDate = new Date()
    // const day = currDate.getDate()
    // const month = currDate.getMonth()
    // const year = currDate.getFullYear()
    // const toDate = `${year}${'-'}${month<10?`0${month}`:`${month}`}${'-'}${date}`
    // const fromDate = 
    // var curr = new Date; // get current date
    // var first = curr.getDay();
    // first = first - 7
    // var firstdayOb = new Date(curr.setDate(first));
    // var fromDate = `${firstdayOb.getFullYear()}${'-'}${firstdayOb.getMonth<10?`0${firstdayOb.getMonth}`:`${firstdayOb.getMonth}`}${'-'}${firstdayOb.getDay()}`;
    // var firstdayTemp = firstdayOb;
    // var lastdayTemp = new Date(firstdayTemp.setDate(firstdayTemp.getDate() + 6 ));
    // const toDate = `${lastdayTemp.getFullYear()}${'-'}${lastdayTemp.getMonth<10?`0${lastdayTemp.getMonth}`:`${lastdayTemp.getMonth}`}${'-'}${lastdayTemp.getDay()}`;

    const fromDate = '2024-03-23'
    const toDate = '2024-03-31'
    axios.get('https://finnhub.io/api/v1/company-news?symbol='+ticker+'&from='+fromDate+'&to='+toDate+'&token='+API_KEY)
    .then(function (response) {
        // handle success
        // console.log(response.data);
        return res.status(200).json(response.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        return res.status(400).json({err: error.message})
    })
}

const getReccTrends = async (request,res) => {
    const {ticker} = request.params
    axios.get('https://finnhub.io/api/v1/stock/recommendation?symbol='+ticker+'&token='+API_KEY)
    .then(function (response) {
        // handle success
        // console.log(response.data);
        return res.status(200).json(response.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        return res.status(400).json({err: error.message})
    })
}

const getEarnings = async (request,res) => {
    const {ticker} = request.params
    axios.get('https://finnhub.io/api/v1/stock/earnings?symbol='+ticker+'&token='+API_KEY)
    .then(function (response) {
        // handle success
        // console.log(response.data);
        return res.status(200).json(response.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        return res.status(400).json({err: error.message})
    })
}

const getInsiderSent = async (request,res) => {
    const {ticker} = request.params
    axios.get('https://finnhub.io/api/v1/stock/insider-sentiment?symbol='+ticker+'&token='+API_KEY)
    .then(function (response) {
        // handle success
        // console.log(response.data);
        return res.status(200).json(response.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        return res.status(400).json({err: error.message})
    })
}

const getCompanyPeers = async (request,res) => {
    const {ticker} = request.params
    axios.get('https://finnhub.io/api/v1/stock/peers?symbol='+ticker+'&token='+API_KEY)
    .then(function (response) {
        // handle success
        //sconsole.log(response.data);
        return res.status(200).json(response.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        return res.status(400).json({err: error.message})
    })
}

module.exports = {
    getCompanyProfile,
    getCompanyNews,
    getCompanyPeers,
    getInsiderSent,
    getReccTrends,
    gethourlyCharts,
    getStockQuote,
    gethighCharts,
    getAutoComplete,
    getEarnings,
}