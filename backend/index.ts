import {Request, Response} from "express";

require("dotenv").config();
const express = require("express");
const axios = require("axios"); // make api request
const cors = require("cors"); // connect to front end
const GOOGLE_API_KEY= 'AIzaSyAXgkpWUfbn4JvXolEKxO4cDkuBJjHXHTg'
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 2025;

app.get("/", (req, res) => {
    res.send("AI Travel Soundtrack Backend is Running!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post("/generate_playlist", async (req: Request, res: Response) => {
    const{location, mood, activity} = req.body;
    try{
        const{GoogleGenerativeAI} = require("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // const prompt = `Generate a song recommendation playlist with the song title and artist name for a trip to ${location}. The traveler is feeling ${mood} and is planning to do ${activity} limit to 10`;
        const prompt = 'List me attractions that I can visit while we are starting from Boston MA to Geneva Swizzterland';
        const result = await model.generateContent(prompt);
        const playlistRec = result.response.text();
        console.log(result.response.text());

        res.json({playlist: playlistRec});
    }
    catch (e){
        console.error(e)
        res.status(500).json({error: "Failed while calling Gemini API"});
    }
});
