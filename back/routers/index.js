const router = require('express').Router();
const team = require('./Team');
const player = require('./player');
const user = require('./user');
const game = require('./game');

const teamsForSelect = require('./teamsForSelect');

const jwt = require('jsonwebtoken');
const User = require('../models/User');


router.get('/', (req, res) => {
    res.json({
        'msg': 'Não vai rolar.'
    })
})

//authentication
router.post('/login', async(req, res, next) => {
    console.log(req.body)

    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user) return res.status(400).send({ error: 'User not found' });
    if (user.password !== password) return res.status(400).send({ error: 'Invalid Password' });

    user.password = undefined;

    if (user) return res.json({ auth: true, token: tokenGenerate({ id: user._id }), user: user });

})

// login alternativo
router.post('/alternate', async(req, res, next) => {
    console.log(req.body)

    const { email, question } = req.body;
    const user = await User.findOne({ email }).select('+password', '+question');

    if (!user) return res.status(400).send({ error: 'User not found', msg: "Usuário não encontrado." });
    if (user.question !== question) return res.status(400).send({ msg: 'Resposta errada.' });

    if (question === user.question) return res.json({ auth: true, token: tokenGenerate({ id: user._id }), user: user });

})

router.post('/register', async(req, res) => {
    const user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        nick: req.body.nick,
        totalPoints: req.body.totalPoints,
        question: req.body.question,
        teamEarth: req.body.teamEarth
    })
    try {
        const saverUser = await user.save()
        res.json({
            status: true,
            data: saverUser,
            token: tokenGenerate({ id: user._id })
        })
    } catch (err) {
        res.json({
            status: false,
            message: err
        })
    }
})

router.post('/logout', function(req, res) {
    res.json({ auth: false, token: null });
})

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}

function tokenGenerate(params = {}) {
    return jwt.sign(params, process.env.SECRET, {
        expiresIn: 30000 // expires in 20min
    });
}

router.use('/team', verifyJWT, team)
router.use('/player', verifyJWT, player)
router.use('/user', verifyJWT, user),
    router.use('/game', verifyJWT, game)
router.use('/teams-for-select', verifyJWT, teamsForSelect)


module.exports = router