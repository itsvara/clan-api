const superagent = require("superagent");
const ws = require("ws");
const fs = require("fs");
const token = require("D:\\!Everything\\Good Stuff\\!Programming Shit\\!Web\\varanox.xyz\\token.json");

//WebSocket Server
const wss = new ws.Server({
    port: 8080
});

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log("recieved: %s", data)
        let recievedtag = ("%s", data)
        if (recievedtag != "hi server :)") {
        var savepath = "claninfo.json"
        superagent
            .get(`https://api.clashofclans.com/v1/clans/%23${recievedtag}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token.token}`)
            .end((err, res) => {
                let clandata = JSON.stringify(res.body)
                //console.log(clandata)
                fs.writeFileSync(savepath, clandata);
                console.log(`Wrote clan info to ${savepath}`)
                ws.send(clandata)
            });
        }
        //var clandata = fs.readFileSync("claninfo.json").toString();
    });
});