import {Attraction} from "../types/attractionType";
import {Request, Response} from "express";
const GOOGLE_API_KEY= 'AIzaSyAXgkpWUfbn4JvXolEKxO4cDkuBJjHXHTg'

module.exports = function (app) {
  // variables
  let attractions : Attraction[] = []

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
      attractions: attractions
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

        const songs = await Promise.all(
          attractions.map(async (attraction) => ({
            attraction,
                song: await generateSong(attraction),
            }))
        );
        res.json({ songs: songs });

        console.log(songs);
    }
    catch (e){
        console.error(e)
        res.status(500).json({error: "Failed while calling Gemini API"});
    }
});
}