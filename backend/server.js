require('dotenv').config()

const expBE = require ('express')
const cors = require('cors')

const stockRoutes = require('./routes/stocks')
const searchRoutes = require('./routes/search')
const mongoose = require('mongoose')

// express application
const webapp = expBE()
webapp.use(cors())

//middleware
webapp.use(expBE.json())

webapp.use((request, result, next) => {
    console.log(request.path, request.method)
    next()
})

//routes
webapp.get('/', (request, result) => {
    result.json({mssg:"Welcome to assignment 3"})
})

//connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //request listen
        webapp.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port',process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

webapp.use('/api/stocks',stockRoutes)
webapp.use('/api/search',searchRoutes)



process.env