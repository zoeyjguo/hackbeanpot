import {Attraction} from "../types/attractionType";
import {Request, Response} from "express";
import {Song} from "../types/spotifyTypes";
const GOOGLE_API_KEY= 'AIzaSyAXgkpWUfbn4JvXolEKxO4cDkuBJjHXHTg'

module.exports = function (app) {
  // variables
  let attractions : Attraction[] = []
  let spotifySongs : Song[] = [];


  app.post('/addAttractions', function (req, res) {
    const data = req.body;
    const attractionsList : Attraction[] = data['attractions'];
    console.log("Got attractions", attractionsList);

    attractions.push(...attractionsList);
    attractions.push({attractionName: "another attraction?"});

    console.log("now is", attractions)

    res.sendStatus(200);
  })

  app.get('/getAttractions', function (req, res) {
    res.status(200).json({
      spotifySongsList: spotifySongs
    });
  })

  app.post("/generate_playlist", async (req: Request, res: Response) => {
    console.log("Generating playlist");
    const { attractions } = req.body;
    console.log(attractions);
    try{
        const{GoogleGenerativeAI} = require("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const generateSong = async (attraction: string) => {
            const prompt = `Find an existing song for this attraction: ${attraction} based off of the location, vibes, and language of the attraction. 
            output 1 song in the format of: artist name - song title. No matter what, find a single song and only output the song title and artist name.`;
            const result = await model.generateContent(prompt);
            return result.response.text(); // Extract text response from Gemini
        };

        console.log("getting songs!");
        const songs = await Promise.all(
          attractions.map(async (attraction) => ({
            attraction,
                song: await generateSong(attraction),
            }))
        );

        console.log("get thing");
        const songResults = await Promise.all(
          songs.map(song => searchWildSong(song.song, '', 1))
        );

        songResults.forEach(result => {
          spotifySongs.push(...result);
        });

        console.log("we got these songs")
        console.log(spotifySongs);
        res.sendStatus(200);
    }
    catch (e){
        console.error(e)
        res.status(500).json({error: "Failed while calling Gemini API"});
    }
  });

  const searchWildSong = async (wildcard: string, searchParamGenre: string, searchParamNum: number) : Promise<Song[]> => {
    console.log("Searching for wildcard:", wildcard)
    const response = await fetch('http://localhost:8080/searchSongs', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        wildcard: wildcard,
        genre: searchParamGenre,
        numSongs: searchParamNum
      })
    })

    return await response.json();
  }
}