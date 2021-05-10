const Team = require('../models/Team');

const router = require('express').Router();

router.get('/', async(req, res) => {
    try {
        const team = await Team.find()
        res.json({
            sucess: true,
            data: team
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
        team = await Team.findById({ _id: req.params.id })
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


router.post('/', async(req, res) => {
    const team = new Team({
        name: req.body.name,
        state: req.body.state,
    })
    try {
        const teamSaver = await team.save()
        res.json({
            status: true,
            data: teamSaver
        })
    } catch (err) {
        res.json({
            status: false,
            message: err
        })
    }
})

module.exports = router