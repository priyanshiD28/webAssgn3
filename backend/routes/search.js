const expBE = require('express')
const router = expBE.Router()
const {
    getCompanyProfile,
    getCompanyNews,
    getCompanyPeers,
    getInsiderSent,
    getReccTrends,
    gethourlyCharts,
    getStockQuote,
    gethighCharts,
    getAutoComplete,
    getEarnings
} = require('../controllers/searchController')

router.get('/', (request,response) => {
    response.json({mssg: 'GET all stocks'})
})

router.get('/news/:ticker',getCompanyNews)

router.get('/peers/:ticker', getCompanyPeers)

router.get('/company/:ticker',getCompanyProfile)

router.get('/insidersentiment/:ticker',getInsiderSent)

router.get('/reccomendation/:ticker',getReccTrends)

router.get('/hourcharts/:ticker', gethourlyCharts)

router.get('/stock/:ticker',getStockQuote)

router.get('/charts/:ticker',gethighCharts)

router.get('/autocomplete/:ticker',getAutoComplete)

router.get('/earnings/:ticker',getEarnings)

module.exports = router