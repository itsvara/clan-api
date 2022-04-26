/*
const socket = new WebSocket('ws://localhost:8080')
const input = document.getElementById("clantag")
const submit = document.getElementById("submitbutton")

function logtag() {
    var taginput = input.text
    console.log(taginput)
}

submit.onclick(logtag)

socket.addEventListener('open', function (Event) {
    socket.send("hi server :)");
    console.log("sent: hi server :)")
});

socket.addEventListener('message', function (event) {
    console.log('server says:', event.data);
});
*/