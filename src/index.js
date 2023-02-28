const express = require('express')
require('./db/mongoose')
require('dotenv').config()
const userRouter = require('./routes/user.route.js')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
app.use(express.json())
app.use('/api/users', userRouter)
app.use(errorHandler)

app.listen(3000, () => {
    console.log('Connected on port 3000');
})