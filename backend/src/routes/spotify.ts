const {stringify} = require("querystring");
const request = require('request'); // Ensure you have 'request' installed or included at the top

// https://developer.spotify.com/documentation/web-api/tutorials/code-flow

module.exports = function(app){

    const client_id = process.env.VITE_SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirect_uri = 'http://localhost:8080/callback';

    let access_token;
    let refresh_token;
    let scope;
    let expires_in;

    let user_id;

    async function getProfile(accessToken) {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });

        const data = await response.json();
        console.log("GOT PROFILE")
        console.log(data.id)

        user_id = data.id;

        createPlaylist(accessToken);
    }

    async function createPlaylist(accessToken) {
        const response = await fetch('https://api.spotify.com/v1/users/' + user_id + '/playlists', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'  // Required for JSON data
            },
            body: JSON.stringify({
                name: "HACKBEANPOT PLAYLIST",
                description: "asdfghgfdafsvfdv",
                public: false  // Private playlist
            })
        });

        const data = await response.json();
        console.log("shit");
        console.log(data);
    }


    app.post('/createPlaylist', function(req, res) {
        res.status(404);
    });

    app.get('/username', function(req, res) {
        res.status(404);
    });


    app.get('/login', function(req, res) {
        const scope = 'user-read-private user-read-email playlist-modify-private';

        const url = 'https://accounts.spotify.com/authorize?' +
            stringify({
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri
            });

        res.json({ url });  // Send back the URL instead of redirecting
    });

    app.get('/callback', function(req, res) {
        console.log("callback!")

        const code = req.query.code || null;
        const state = req.query.state || null;

        if (!code) {
            res.status(400);
            return;
        }

        //@TODO: Re-add in state, this prevents forgery attacks
        // if (state === null) {
        //     res.redirect('/#' +
        //         stringify({
        //             error: 'state_mismatch'
        //         }));
        //
        //     console.log("state invalid")
        //     return;
        // }

        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        // Send the POST request
        request.post("https://accounts.spotify.com/api/token", authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                // Access the JSON data
                access_token = body.access_token;
                refresh_token = body.refresh_token;
                scope = body.scope;
                expires_in = body.expires_in;

                console.log("TOKENS!")
                console.log(access_token);
                console.log(refresh_token)
                console.log(scope)
                console.log(expires_in)

                // we have access_token now!
                getProfile(access_token);

            } else {
                // Handle errors or unsuccessful responses
                res.redirect('/#' + stringify({
                    error: 'invalid_token'
                }));
            }
        });

        console.log(res);
        // res.data("hiiii")

        res.redirect('http://localhost:5173');  // Redirect to React app
    });


}