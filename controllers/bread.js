const router = require('express').Router()
const Bread = require('../models/bread')
const Baker = require('../models/baker')
const seedData = require('../models/seedData')


//get all bread
router.get('/', async (req, res) => {
    const bread = await Bread.find()
    const baker = await Baker.find()
    res.render('index', {
        breads: bread,
        bakers: baker
    })
})

// get the create NEW bread page
router.get('/new', async (req, res) => {
    const bakers = await Baker.find()
    res.render('new', {
        bakers
    })
})

// get edit bread by index  async/await
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params
    const bread = await Bread.findById(id)
    const bakers = await Baker.find()
    res.render('edit', {
        bread,
        bakers
    })
})

// get bread by index  asyn/await
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const bread = await Bread.findById(id).populate('baker')
    res.render('show', {
        bread,
    })
})

//seed data
router.get('/data/seed', async (req, res) => {
    await Bread.insertMany(seedData)
    res.redirect('/breads')
})

// reset data
router.get('/reset/seed', async (req, res) => {
    await Bread.deleteMany()
    res.redirect('/breads/data/seed')
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