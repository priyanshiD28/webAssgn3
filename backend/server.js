require('dotenv').config()

const expBE = require ('express');
const webapp = expBE();
const cors = require('cors');
const path = require('path');

const stockRoutes = require('./routes/stocks')
const searchRoutes = require('./routes/search')
const mongoose = require('mongoose')


const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../frontend/build");

const corsOptions = {
    origin: ['http://localhost:4000','http://18.225.92.135/']
};

webapp.use(cors(corsOptions));
webapp.use(expBE.static(buildPath));

// express application
webapp.use(cors())

//middleware
webapp.use(expBE.json())

webapp.use((request, result, next) => {
    console.log(request.path, request.method)
    next()
})

//routes
// webapp.get('/', (request, result) => {
//     result.json({mssg:"Welcome to assignment 3"})
// })

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

webapp.get("/*", function (req, res){

    // console.log("Request: ",req)

    res.sendFile(
        path.join(__dirname, "../frontend/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err)
            }
       }
    )
})



process.env