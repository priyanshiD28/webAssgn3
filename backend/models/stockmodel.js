const mongoose = require('mongoose')
const schema = mongoose.Schema

const walletSchema = new schema({
    amount: Number
}, { timestamps: true })

const WatchlistSchema = new schema({
    ticker: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
}, { timestamps: true })

const portfolioSchema = new schema({
    ticker: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    avgCostPSh: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const watchList = mongoose.model('Watchlist', WatchlistSchema);
const portfolio = mongoose.model('Portfolio', portfolioSchema);
module.exports = {
    WatchlistM: watchList,
    PortfolioM: portfolio
}
