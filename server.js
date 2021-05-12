const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config();
const PORT = 3080
var cors = require('cors')

const api = require('./back/routers');
const app = express();
app.use(bodyParser.json());

app.use(cors())
app.get('/', (req, res) => {
    res.json({
        'sucess': true
    })
})

app.use('/api', api)

app.listen(process.env.PORT || PORT);