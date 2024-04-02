const {WatchlistM, PortfolioM, WalletM} = require('../models/stockmodel');
const mongoose = require('mongoose')

//get watchlist details
const getWatchlistDetails = async (req, res) => {
    const watchlistStocks = await WatchlistM.find({})
    res.status(200).json(watchlistStocks)
}

const getSingleWatchlistDetail = async(req,res) => {
    const {ticker} = req.params 
    // if(!mongoose.Types.ObjectId.isValid(ticker)) {
    //     return res.status(404).json({error: "No Stock Details"})
    // }

    const findWatchlist = await WatchlistM.findOne({ticker:ticker})
    if(!findWatchlist) {
        return res.status(404).json({error: "Stock Not Available"})
    }

    res.status(200).json(findWatchlist)
}
//get portfolio details
const getPortfolioDetails = async (req, res) => {
    const portfolioStocks = await PortfolioM.find({})
    res.status(200).json(portfolioStocks)
}

const getSinglePortfolioDetail = async(req,res) => {
    const {ticker} = req.params 
    // if(!mongoose.Types.ObjectId.isValid(ticker)) {
    //     return res.status(404).json({error: "No Stock Details"})
    // }

    const findPortfolio = await PortfolioM.findOne({ticker:ticker})
    if(!findPortfolio) {
        return res.status(404).json({error: "Stock Not Available"})
    }

    res.status(200).json(findPortfolio)
}

const getWallet = async(request, response) => {
    const wAmount = await WalletM.find({})
    response.status(200).json(wAmount)

}

//add stock to portfolio
const addStockP = async(request,response) => {
    const {ticker, companyName, quantity, avgCostPSh} = request.body

    try{
        const stock = await PortfolioM.create({ticker, companyName, quantity, avgCostPSh})
        response.status(200).json(stock)
    } catch(error) {
        response.status(400).json({error: error.message})
    }
    response.json({mssg:'POST a stock'})
}

//add stock to watchlist
const addStockW = async(request,response) => {
    const {ticker, companyName} = request.body
    console.log(ticker,companyName)
    try{
        const stock = await WatchlistM.create({ticker, companyName})
        response.status(200).json(stock)
    } catch(error) {
        response.status(400).json({error: error.message})
    }
    response.json({mssg:'POST a stock'})
}

//delete stock from portfolio
const deleteStockP = async (request,response) => {
    const {id} = request.params 
    // if(!mongoose.Types.ObjectId.isValid(id)) {
    //     return response.status(404).json({error: "No Stock Details"})
    // }

    const delportfolio = await PortfolioM.findOneAndDelete({ticker})
    if(!delportfolio) {
        return response.status(404).json({error: "Stock Not Available"})
    }

    response.status(200).json(delportfolio)
}
//delete stock from watchlist
const deleteStockW = async (request,response) => {
    const {id} = request.params 
    // if(!mongoose.Types.ObjectId.isValid(ticker)) {
    //     return response.status(404).json({error: "No Stock Details"})
    // }

    const delwatchlist = await WatchlistM.findOneAndDelete({ticker: `${id}`})
    console.log(delwatchlist, id)
    if(!delwatchlist) {
        return response.status(404).json({error: "Stock Not Available"})
    }

    response.status(200).json(delwatchlist)
}

//update wallet
const updateWallet = async (request,response) => {
    const {amount} = request.body 
    // if(!mongoose.Types.ObjectId.isValid(id)) {
    //     return response.status(404).json({error: "No Stock Details"})
    // }

    const wallet = await stockM.findOneAndUpdate({amount: amount}, {
        ...request.body
    })
    if(!wallet) {
        return response.status(404).json({error: "Wallet doesnt exist"})
    }

    response.status(200).json(wallet)
}

const updatePortfolio = async(req,res) => {
    const {ticker} = req.param
    const {quantity} = req.body
    // if(!mongoose.Types.ObjectId.isValid(ticker)) {
    //     return res.status(404).json({error: "No Stock Details"})
    // }
    const updatePortfolioVal = await PortfolioM.findOneAndUpdate({ticker:ticker},{quantity:quantity})
    if(!findPortfolio) {
        return res.status(404).json({error: "Stock Not Available"})
    }

    res.status(200).json(updatePortfolioVal)
}


module.exports = {
    addStockP,
    addStockW,
    getWallet,
    getWatchlistDetails,
    getPortfolioDetails,
    getSingleWatchlistDetail,
    getSinglePortfolioDetail,
    deleteStockP,
    deleteStockW,
    updateWallet,
    updatePortfolio
}