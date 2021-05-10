const Team = require('../models/Team');
const User = require('../models/User')

const router = require('express').Router();

router.get('/', async(req, res) => {
    try {
        const user = await User.find()
        res.json({
            sucess: true,
            data: { user }
        })
    } catch (err) {
        res.json({
            sucess: false,
            data: err
        })
    }
})

router.get('/:id', async(req, res) => {
    try {
        user = await User.findById({ _id: req.params.id })
        res.json({
            sucess: true,
            data: user
        })
    } catch (err) {
        res.json({
            sucess: false,
            data: err
        })
    }
})



router.put('/total', (req, res) => {

})

router.put('/point', async(req, res) => {


})

router.post('/', async(req, res) => {
    const user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        nick: req.body.nick,
        totalPoints: req.body.totalPoints
    })
    try {
        const saverUser = await user.save()
        res.json({
            status: true,
            data: saverUser
        })
    } catch (err) {
        res.json({
            status: false,
            message: err
        })
    }
})

module.exports = router