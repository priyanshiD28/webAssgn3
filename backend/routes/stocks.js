const expBE = require('express')
const router = expBE.Router()
const { WatchlistM } = require('../models/stockmodel')
const {
    addStockP,
    addStockW,
    getWatchlistDetails,
    getPortfolioDetails,
    getSingleWatchlistDetail,
    getSinglePortfolioDetail,
    deleteStockP,
    deleteStockW,
    updateWallet,
    updatePortfolio,
    getWallet
} = require('../controllers/stockController')


router.get('/', (request,response) => {
    response.json({mssg: 'GET all stocks'})
})
//GET a stock
router.get('/portfolio/', getPortfolioDetails)
router.get('/watchlist/', getWatchlistDetails)

//GET a single stock
router.get('/portfolio/:ticker', getSinglePortfolioDetail)
router.get('/watchlist/:ticker', getSingleWatchlistDetail)

//POST a stock
router.post('/watchlist', addStockW)
router.post('/portfolio', addStockP)
//DELETE a stock
router.delete('/portfolio/:id',deleteStockP)
router.delete('/watchlist/:id',deleteStockW)

//UPDATE a stock
router.patch('/wallet/:key',updateWallet)
router.patch('/portfolio/:id',updatePortfolio)

router.get('/wallet',getWallet)

module.exports = router