const router = require('express').Router()
const Baker = require('../models/baker')
const bakerSeedData = require('../models/bakerSeedData')

// seed data
router.get('/data/seed', async (req, res) => {
    await Baker.insertMany(bakerSeedData)
    res.redirect('/breads')
})

// reset data
router.get('/reset/seed', async (req, res) => {
    await Baker.deleteMany()
    res.redirect('/baker/data/seed')
  })

router.get('/', async (req, res) => {
    const bakers = await Baker.find().populate('breads')
    res.json(bakers)
})
// get baker by id asyn/await
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const baker = await Baker.findById(id).populate('breads')
    res.render('bakerShow', {
        baker,
    })
})

module.exports = router