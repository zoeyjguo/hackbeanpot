import {Request, Response} from "express";

require("dotenv").config();
const express = require("express");
const axios = require("axios"); // make api request
const cors = require("cors"); // connect to front end

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


