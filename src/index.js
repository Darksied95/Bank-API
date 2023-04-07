require('./db/mongoose')
require('dotenv').config()
const express = require('express')
const userRouter = require('./routes/user.route')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

app.use(express.json())
app.use('/api/users', userRouter)
app.use(errorHandler)

app.listen(3000, () => {
  console.log('Connected on port 3000')
})
