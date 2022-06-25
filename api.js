const superagent = require("superagent");
const ws = require("ws");
const fs = require("fs");

if (!fs.existsSync('./token.json')) {
    console.log('token.json not found! Read the README for instructions on how to get an api token.')
    process.exit(0)
}

const token = require("./token.json");

//WebSocket Server
const wss = new ws.Server({
    port: 8080
});

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log("recieved: %s", data)
        let recieved = ("%s", data)
        if (recieved.slice(0, 4) == "tag:") {
            let cuttag = recieved.slice(5)

            const savedir = `./claninfo`
            if (!fs.existsSync(savedir)) {
                console.log("./claninfo directory not found, creating...")
                fs.mkdirSync(savedir)
            }

            var savepath = savedir + '/' + cuttag + '.json'
            superagent
                .get(`https://api.clashofclans.com/v1/clans/%23${cuttag}`)
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