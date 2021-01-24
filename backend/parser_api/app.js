// modules =================================================
const { json } = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json())
app.use(cors())

// set up port =============================================
const port = 3000;
app.get('/', (req, res) => res.send('Application is running..'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// APIs - parser
const imageService = require('./service')
app.post('/parse', (req, res) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    if (req.body.src === undefined) res.status(400).json({"Error": "Please specify img src"});
    if (req.body.triggers === undefined) res.status(400).json({"Error": "Please specify triggers"});
    
    const src = req.body.src
    const triggers = req.body.triggers

    imageService.needToBlur(src, triggers).then(data => res.send(data))
    .catch(err => res.status(500).json({err: err.toString}));
})