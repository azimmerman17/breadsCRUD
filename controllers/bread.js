const router = require('express').Router()
const Bread = require('../models/bread')
const seedData = require('../models/seedData')


//get all bread
router.get('/', async (req, res) => {
    const bread = await Bread.find()
    res.render('index', {
        breads: bread
    })
})

// get the create NEW bread page
router.get('/new', (req, res) => {
    res.render('new')
})

// get edit bread by index  async/await
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params
    const bread = await Bread.findById(id)
    res.render('edit', {
        bread,
    })
})

// get bread by index  asyn/await
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const bread = await Bread.findById(id)
    res.render('show', {
        bread,
    })
})

//seed data
router.get('/data/seed', async (req,res) => {
    await Bread.insertMany(seedData)
    res.redirect('/breads')
})

// POST: create a bread
router.post('/', async (req, res) => {
    const { hasGluten, image } = req.body
    if (!image) req.body.image = undefined
    if (hasGluten === 'on' ) {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }

    await Bread.create(req.body)

    res.redirect('/breads')
})

// PUT: Edit a bread async await
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { image, hasGluten } =req.body
    if (!image) req.body.image = 'https://suebeehomemaker.com/wp-content/uploads/2021/10/sliced-french-bread.jpg'
    if (hasGluten === 'on' ) {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }

    await Bread.findByIdAndUpdate(id, req.body)
    res.redirect(`/breads/${id}`)
})

// Delte a bread async await
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await Bread.findByIdAndDelete(id)
    res.status(303).redirect('/breads')
})

module.exports = router