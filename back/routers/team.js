const Player = require('../models/Player');
const Team = require('../models/Team');
const User = require('../models/User');

const router = require('express').Router();

//ordena times pelo total de ponots
router.get('/', async(req, res) => {
    try {
        const team = await User.find().sort({
            'totalPoints': -1
        })
        console.log(team)
        res.json({
            sucess: 'true',
            data: team
        })
    } catch (err) {
        res.json({
            sucess: false,
            data: err
        })
    }
})

router.get('/:nick', async(req, res) => {
    try {
        const { nick } = req.params;
        const team = await User.find({ nick })
        res.json({
            sucess: 'true',
            data: team
        })
    } catch (err) {
        res.json({
            sucess: false,
            data: err
        })
    }
})

// atribui pontos por jogador para todos os times que tem o jogador
router.put('/point', async(req, res) => {
    try {
        switch (req.body.position) {
            case "team.zg_1._id":
                const zg_1 = await User.updateMany({
                    "team.zg_1._id": req.body.id

                }, {
                    $set: { "team.zg_1.mediaPlay": req.body.points }
                })
                res.json({
                    sucess: true,
                    data: zg_1
                })
                break;
            case "team.mc_1._id":
                const mc_1 = await User.updateMany({
                    "team.mc_1._id": req.body.id

                }, {
                    $set: { "team.mc_1.mediaPlay": req.body.points }
                })
                res.json({
                    sucess: true,
                    data: mc_1
                })
                break;
            case "team.mc_2._id":
                const mc_2 = await User.updateMany({
                    "team.mc_2._id": req.body.id

                }, {
                    $set: { "team.mc_2.mediaPlay": req.body.points }
                })
                res.json({
                    sucess: true,
                    data: mc_2
                })
                break;
            case "team.at_1._id":
                const at_1 = await User.updateMany({
                    "team.at_1._id": req.body.id

                }, {
                    $set: { "team.at_1.mediaPlay": req.body.points }
                })
                res.json({
                    sucess: true,
                    data: at_1
                })
                break;
        }

    } catch (err) {
        res.json({
            sucess: false,
            data: err
        })
    }

})

// ajusta a média de todos os times
router.put('/media', async(req, res) => {
    try {
        const team = await User.updateMany({}, [{
            $set: { "team.media": { $sum: ["$team.zg_1.mediaPlay", "$team.mc_1.mediaPlay", "$team.mc_2.mediaPlay", "$team.at_1.mediaPlay"] } }
        }])
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

// atualiza todos os pontos dos usuários
router.put('/update-total', async(req, res) => {
    try {
        const team = await User.updateMany({}, [{
            $set: { "totalPoints": { $sum: ["$totalPoints", "$team.media"] } }
        }])
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

// atualiza o time do usuário
router.put('/', async(req, res) => {
    try {
        const severTeamUser = await User.updateOne({
            _id: req.body.id_user
        }, {
            $set: {
                team: {
                    zg_1: req.body.zg_1,
                    mc_1: req.body.mc_1,
                    mc_2: req.body.mc_2,
                    at_1: req.body.at_1,
                    id_user: req.body.id_user
                }
            }
        })
        res.json({
            status: true,
            data: severTeamUser
        })
    } catch (err) {
        res.json({
            status: false,
            message: err
        })
    }
})

module.exports = router