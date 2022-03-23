const superagent = require("superagent");
const ws = require("ws");
const fs = require("fs");
const token = require("D:\\!Everything\\Good Stuff\\!Programming Shit\\!Web\\varanox.xyz\\token.json");

var savepath = "claninfo.json"

superagent
    .get(`https://api.clashofclans.com/v1/clans/%232LGVLGYVJ`)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token.token}`)
    .end((err, res) => {
        let clandata = JSON.stringify(res.body)
        console.log(clandata)
        fs.writeFileSync(savepath, clandata);
        console.log(`Wrote clan info to ${savepath}`)
    });