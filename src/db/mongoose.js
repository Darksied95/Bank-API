const mongoose = require('mongoose')


mongoose.set('strictQuery', false)
mongoose
    .connect('mongodb://localhost:27017/BankApi')
    .then(() => console.log('Connected to mongoDB'))
    .catch(err => console.log('Cannot connect to monogoDB', err))
