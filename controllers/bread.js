const router = require('express').Router()
const Bread = require('../models/bread')


//get all bread
router.get('/', (req, res) => {
    res.render('index', {
        breads: Bread
    })
})

// get the create NEW bread page
router.get('/new', (req, res) => {
    res.render('new')
})

// get bread by index
router.get('/:index', (req, res) => {
    const { index } = req.params
    res.render('show', {
        bread: Bread[index]
    })
})

router.post('/', (req, res) => {
    const { hasGluten, image } = req.body
    if (!image) req.body.image = 'https://suebeehomemaker.com/wp-content/uploads/2021/10/sliced-french-bread.jpg'
    if (hasGluten === 'on' ) {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread.push(req.body)
    res.redirect('/breads')
})

module.exports = router