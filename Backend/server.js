const express = require("express")
const app = express()
const cors = require('cors');
var mongoose = require("mongoose")
const userroute = require('./routes/userroute')
const roomRouter = require('./routes/roomRoute')
const hotelRouter = require('./routes/hotelRoute')

// const Contact = require('./models/contact')
require('dotenv').config()
app.use(cors())
app.use(express.json())


// getting environment variables
var port = process.env.PORT;
MONGODB_URI = process.env.MONGODB_URI;


//connecting database
mongoose.connect(MONGODB_URI).then(()=>{
    console.log("DB connected")
}).catch((err)=>{
console.log(err)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//redirecting to user route
app.use('/users', userroute)
app.use('/rooms', roomRouter)
app.use('/hotels', hotelRouter)



app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})