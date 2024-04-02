const mongoose = require('mongoose')
const schema = mongoose.Schema

const walletSchema = new schema({
    amount: {
        type: Number,
        required: true
    }
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
const wallet = mongoose.model('Wallet', walletSchema);
module.exports = {
    WatchlistM: watchList,
    PortfolioM: portfolio,
    WalletM: wallet
}
