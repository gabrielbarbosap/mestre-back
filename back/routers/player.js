const router = require('express').Router();
const Player = require('../models/Player')

router.get('/', async(req, res) => {
    try {
        const player = await Player.find()
        res.json({
            sucess: true,
            data: player
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
        const player = await Player.find()
        const playSelect = player.find(it => it._id == req.params.id)
        res.json({
            sucess: true,
            data: playSelect
        })
    } catch (err) {
        res.json({
            sucess: false,
            data: err
        })
    }
})

// jogadores por time
router.post('/team', async(req, res) => {
    try {
        const { team } = req.body;
        const players = await Player.find({ team })
        res.json({
            sucess: true,
            data: players
        })
    } catch (err) {
        res.json({
            sucess: false,
            data: err
        })
    }
})

// cria jogador
router.post('/', async(req, res) => {
    const player = new Player({
        name: req.body.name,
        team: req.body.team,
        position: req.body.position
    })
    console.log(player)
    try {
        const saverPlayer = await player.save()
        res.json({
            status: true,
            data: saverPlayer
        })
    } catch (err) {
        res.json({
            status: false,
            message: err
        })
    }
})

module.exports = router