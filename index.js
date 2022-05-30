const socket = new WebSocket('ws://varanox.xyz:80')
const invalidClan = document.getElementById("invalidClan")
const input = document.getElementById("clantag")

var displayinginfo

//Get All Clan Items + Labels.
var clanitems = document.getElementById("info").querySelectorAll(".clanitem")
var labelitems = document.getElementById("info").querySelectorAll(".labelitem")
//


//Get Clan Info Tags.
const clanBanner = document.getElementById("clanBanner")

const clanName = document.getElementById("clanName")
const clanLevel = document.getElementById("clanLevel")
const currentMembers = document.getElementById("currentMembers")
const clanTag = document.getElementById("clanTagDisplay")
const clanDescription = document.getElementById("clanDescription")

const CWL = document.getElementById("CWL")
const totalTrophies = document.getElementById("totalTrophies")
const totalVersusTrophies = document.getElementById("totalVersusTrophies")
const clanLocation = document.getElementById("clanLocation")
const chatLanguage = document.getElementById("chatLanguage")
const clanType = document.getElementById("clanType")
const requiredTrophies = document.getElementById("requiredTrophies")
const requiredVersusTrophies = document.getElementById("requiredVersusTrophies")
const requiredTH = document.getElementById("requiredTH")

const labelimg1 = document.getElementById("labelimg1")
const labelimg2 = document.getElementById("labelimg2")
const labelimg3 = document.getElementById("labelimg3")
//


function handletag() {
    var taginput = input.value
    console.log("recieved tag: " + taginput)
    socket.send("tag: "+taginput)
}

socket.addEventListener('open', function (Event) {
    //Check WS is working.
    socket.send("hi server :)");
    console.log("sent: hi server :)")
});

socket.addEventListener('message', function (event) {
    console.log('server says:', event.data);

    function handledata() {
        var claninfo = JSON.parse(event.data)
        console.log("processing: " + claninfo.name)

        clanBanner.src = claninfo.badgeUrls.medium

        clanName.innerHTML = claninfo.name
        clanLevel.innerHTML = "Level " + claninfo.clanLevel
        currentMembers.innerHTML = claninfo.members + "/50 Members"
        clanTag.innerHTML = "Tag: " + claninfo.tag
        clanDescription.innerHTML = "Description: " + claninfo.description

        CWL.innerHTML = "Clan War League: " + claninfo.warLeague.name
        totalTrophies.innerHTML = "Total Home Village points: " + claninfo.clanPoints + "🏆"
        totalVersusTrophies.innerHTML = "Total Builder Base points: " + claninfo.clanVersusPoints + "🏆"
        clanLocation.innerHTML = "Clan Location: " + claninfo.location.name
        chatLanguage.innerHTML = "Chat Language: " + claninfo.chatLanguage.name
        clanType.innerHTML = "Type: " + claninfo.type[0].toUpperCase() + claninfo.type.slice(1)
        requiredTrophies.innerHTML = "Required Home Village trophies: " + claninfo.requiredTrophies + "🏆"
        requiredVersusTrophies.innerHTML = "Required Builder Base trophies: " + claninfo
            .requiredVersusTrophies + "🏆"
        requiredTH.innerHTML = "Required Town Hall level: " + claninfo.requiredTownhallLevel

        //Add Label Images + Details
        let i = 0
        while (i < labelitems.length) {
            labelitems[i].src = claninfo.labels[i].iconUrls.small
            labelitems[i].alt = claninfo.labels[i].name
            labelitems[i].title = claninfo.labels[i].name
            i++;
        }
        //


        console.log("finished processing")

        var displayinginfo = true


        class Member {
            constructor(tag, name, role, level, league, leagueIcon, trophies, versusTrophies, donations,
                donationsRecieved) {
                this.tag = tag
                this.name = name
                this.role = role
                this.level = level
                this.league = league
                this.leagueIcon = leagueIcon
                this.trophies = trophies
                this.versusTrophies = versusTrophies
                this.donations = donations
                this.donationsRecieved = donationsRecieved
            }
        }

        

        i = 0
        while (i < claninfo.memberList.length) {
            var jsonMember = claninfo.memberList[i]
            var newMember = new Member(jsonMember.tag, jsonMember.name, jsonMember.role, jsonMember.level,
                jsonMember.league, jsonMember.leagueIcon, jsonMember.trophies, jsonMember
                .versusTrophies, jsonMember.donations, jsonMember.donationsRecieved);

            var membertag = document.createElement("h5");
            var membercontent = document.createTextNode(newMember.name)
            membertag.appendChild(membercontent);
            membertag.id = `member${i}`
            var membersdiv = document.getElementById("users");
            membersdiv.appendChild(membertag);
            i++
        }
    }

    //Start displaying info if clan is valid.
    if (event.data != `{"reason":"notFound"}`) {
        handledata()
        invalidClan.innerHTML = ("")
    } else {
        console.log("Invalid Clan")
        invalidClan.innerHTML = ("Invalid Clan!")

        //Clear screen if clan is invalid.
        if (displayinginfo = true) {
            let i = 0
            while (i < clanitems.length) {
                clanitems[i].innerHTML = ""
                i++;
            }
            //
        }

    }
});