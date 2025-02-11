import { Song } from "../types/spotifyTypes";

const { stringify } = require("querystring");
const request = require("request"); // Ensure you have 'request' installed or included at the top

// https://developer.spotify.com/documentation/web-api/tutorials/code-flow a

module.exports = function (app) {
  const client_id = process.env.VITE_SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = "http://localhost:8080/callback";

  let access_token;
  let refresh_token;
  let scope;
  let expires_in;
  let display_name;
  let playlist_id;
  let playlist_href;

  let user_id;

  async function getProfile(accessToken) {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    const data = await response.json();
    console.log(response);
    console.log("GOT PROFILE");
    console.log(data.id);

    user_id = data.id;
    display_name = data.display_name;
    console.log("username!!");
    console.log(display_name);
  }

  async function createPlaylist(accessToken): Promise<number> {
    const response = await fetch(
      "https://api.spotify.com/v1/users/" + user_id + "/playlists",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json", // Required for JSON data
        },
        body: JSON.stringify({
          name: "Road Trip Playlist",
          description:
            "Welcome to your personally curated road trip playlist! We hope you enjoy your journey :)",
          public: false, // Private playlist
        }),
      }
    );

    if (response.status != 201) {
      console.log(response.status);
      return -1;
    }

    console.log("Creating playlist");
    const data = await response.json();
    playlist_href = data.external_urls.spotify;
    playlist_id = data.id;
    console.log("playlistID!!!!");
    console.log(playlist_id);

    return 0;
  }

  async function addSong(accessToken, songList: Song[]): Promise<Response> {
    console.log("In add song!");
    console.log(songList);
    let songURIs: string[] = [];
    songList.map((song: Song) => {
      songURIs.push(song.songURI);
    });

    return await fetch(
      "https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: songURIs,
          position: 0,
        }),
      }
    );
  }

  async function searchSong(
    accessToken,
    wildcard: string,
    genre: string,
    numSongs: number
  ): Promise<Song[]> {
    // make request to spotify server
    const response = await fetch(
      "https://api.spotify.com/v1/search?q=" +
        encodeURI(wildcard) +
        "&genre%3D" +
        encodeURI(genre) +
        "&type=track&market=US&limit=" +
        numSongs +
        "&offset=0",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      }
    );
    // get data back from Spotify server
    const data = await response.json();

    // parse data into song list
    const trackArray = data["tracks"]["items"];
    let searchedSongList: Song[] = [];
    trackArray.map((track) => {
      searchedSongList.push({
        songURI: track["uri"],
        songName: track["name"],
        albumIconLink: track["album"]["images"][0]["url"],
        artistName: track["artists"][0]["name"],
        albumRelease: track["album"]["release_date"],
      });
    });

    return searchedSongList;
  }

  app.post("/searchSongs", async function (req, res) {
    const data = req.body;
    const wildcard: string = data["wildcard"];
    const genre: string = data["genre"];
    const numSongs: number = data["numSongs"];

    let returnedSearchedSongList: Song[] = await searchSong(
      access_token,
      wildcard,
      genre,
      numSongs
    );
    res.status(200).send(returnedSearchedSongList);
  });

  app.post("/addSong", function (req, res) {
    const data = req.body;
    const songList: Song[] = data["songs"];

    console.log(songList);

    console.log("Before add song");
    addSong(access_token, songList).then((response) => {
      if (response.ok) {
        res.sendStatus(200);
      } else {
        console.log();
        res.sendStatus(400);
      }
    });
  });

  app.post("/createPlaylist", function (req, res) {
    createPlaylist(access_token).then((value) => {
      if (value < 0) {
        res.status(400).send();
      } else {
        res.status(200).send();
      }
    });
  });

  app.get("/username", function (req, res) {
    if (display_name) {
      res.status(200).send({ username: display_name });
    } else {
      res.status(404);
    }
  });

  app.get("/login", function (req, res) {
    const scope = "user-read-private user-read-email playlist-modify-private";

    const url =
      "https://accounts.spotify.com/authorize?" +
      stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        show_dialog: true,
      });

    res.json({ url });
  });

  app.get("/logout", function (req, res) {
    access_token = null;
    refresh_token = null;
    scope = null;
    expires_in = null;
    display_name = null;
    playlist_id = null;
    playlist_href = null;
    user_id = null;

    res.json({ url: "http://localhost:5173" });
  });

  app.get("/callback", function (req, res) {
    console.log("callback!");

    const code = req.query.code || null;
    // const state = req.query.state || null;

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
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    // Send the POST request
    request.post(
      "https://accounts.spotify.com/api/token",
      authOptions,
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          // Access the JSON data
          access_token = body.access_token;
          refresh_token = body.refresh_token;
          scope = body.scope;
          expires_in = body.expires_in;

          // console.log("TOKENS!");
          // console.log(access_token);
          // console.log(refresh_token);
          // console.log(scope);
          // console.log(expires_in);

          // we have access_token now!
          getProfile(access_token);
        } else {
          // Handle errors or unsuccessful responses
          res.redirect(
            "/#" +
              stringify({
                error: "invalid_token",
              })
          );
        }
      }
    );

    console.log(res);

    res.redirect("http://localhost:5173/locations"); // Redirect to React app
  });
};

// }
