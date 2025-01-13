const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({mssg: 'GET all workouts'})
})

//GET a single workout
router.get('/:id', (req, res) =>{
    res.json({mssg: 'GET a single workout'})
})

//POST a new workout
router.post('/', (req, res) => {
    res.json({mmsg: 'POST a new workout'})
})

//DELETE a workout
router.delete('/:id', (req, res) => {
    res.json({mmsg: 'DELETE a new workout'})
})

//UPDATE a workout
router.patch('/:id', (req, res) => {
    res.json({mmsg: 'UPDATE a new workout'})
})

module.exports = router