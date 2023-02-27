const express = require('express')
require('./db/mongoose')
const userRouter = require('./routes/user.route.js')

const app = express()
app.use(express.json())
app.use('/api/user', userRouter)

app.listen(3000, () => {
    console.log('Connected on port 3000');
})