const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

// Mover conn mongoose para configs database.
mongoose.connect('mongodb://<dbuser>:<dbpassword>@database.com:27017/database', {
    useNewUrlParser: true
})

// Mover set io para pasta de middlewares.
app.use((req, res, next) => {
    req.io = io
    return next()
})

app.use(cors())
app.use(express.json())
app.use(require('./routes'))

server.listen(3000, () => {
    console.log('\x1b[32m', 'Server Started on port 3000...')
})
