# clan-api

### 🥶🥶🥶🥶
shows details of a clash of clans clan of your choice

## https://varanox.xyz/clan-api/

## SETUP: Go to the first line of the script tag in index.html and change the address to ws://localhost:8080 so that the site does not connect to my server.

## Clash api token: Go to https://developer.clashofclans.com/#/ and register an account. Once you are signed in you can go to https://developer.clashofclans.com/#/account and create a new key. Once you have your token you can create a token.json and fill it out with ``{"token": "YOUR_TOKEN_HERE"}`` replacing the YOUR_TOKEN_HERE with your token :)

## Starting the server: Now you have modified the js and got your api key, you can now host the site by running node api.js in the command line and then opening index.html in your browser of choice. It is not recommended to modify the code to host the webpage publicly as people could be able to see the token.json by going to yourwebsite.com/token.json, instead you should access this by running the api.js and opening index.html, however if you wanted you could move the token to a folder that you are not hosting and change the require for the token.json on the api.js if you *really* cared that much.

### note: the .css and .js files dont actually do anything, they are just there to easily read the code. (for some reason css and js in files break for me and i can only use their corresponding tags in html :))

thank you to corbie for fixing the api.js (the version on my end to host to the public :trollface:)
