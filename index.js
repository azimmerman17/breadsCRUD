const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
require('dotenv').config()

const breadRoutes = require('./controllers/bread')
const bakerRoutes = require('./controllers/baker')

const app = express()

// MIDDLEWARE -- has to be here
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

//  Routes
app.use('/breads', breadRoutes)
app.use('/baker', bakerRoutes)

app.get('/', (req, res) => {
    res.redirect('breads')
})

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('DB connected'))
.catch(err => console.error(err));

const PORT = process.env.PORT || 8080

app.listen(PORT, console.log(`listen ${PORT}`))
