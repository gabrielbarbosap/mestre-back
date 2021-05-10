const Game = require('../models/Game');

const router = require('express').Router();
// todos os jogos
router.get('/', async(req, res) => {
    try {
        const game = await Game.find()
        res.json({
            sucess: true,
            data: game
        })
    } catch (err) {
        res.json({
            sucess: false,
            data: err
        })
    }
})

// cria jogos para um time
router.post('/', async(req, res) => {
    const game = new Game({
        team1: req.body.team1,
        team2: req.body.team2,
        date: req.body.date,
        nameTeam: req.body.nameTeam
    })
    try {
        const gameSaver = await game.save()

        res.json({
            status: true,
            data: gameSaver
        })
    } catch (err) {
        res.json({
            status: false,
            message: err
        })
    }
})

// atualiza jogos para determinado time
router.put('/', async(req, res) => {

    try {
        const gameSaver = await Game.updateOne({
            _id: req.body._id
        }, {
            $set: {
                team1: req.body.team1,
                team2: req.body.team2,
                date: req.body.date
            }
        })
        res.json({
            status: true,
            data: gameSaver
        })
    } catch (err) {
        res.json({
            status: false,
            message: err
        })
    }
})

module.exports = router