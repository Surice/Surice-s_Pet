const fs = require('fs');
const express = require('express');
const router = express.Router();

const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`,'utf-8'));
const auth = require(`${__dirname}/../automatic/auth`);
const statusService = require(`${__dirname}/../services/status.service`);

router.get('/test', (req, res) => {
    res.send("OK");
})

router.get('/status', async (req, res) => {
    let resData = await statusService.collectData();

    res.json( resData );
});

router.post('/login-auth', async (req, res) => {
    const data = {
        token: req.body.auth,
        id: req.body.id,
        guildId: req.body.gid
    }

    if(data.token != config.frontend_auth_token){
        res.status(401).json({ status: false });
        return;
    }

    let authRes = await auth.checkLoginPerms(data, client);

    if(authRes) res.json({ status: true, role: authRes });
});


module.exports = router;