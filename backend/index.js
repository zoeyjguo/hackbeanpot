const express = require('express');
const cors = require('cors');
const {stringify} = require("querystring");
const app = express();
require('dotenv').config();

require('./routes/spotify')(app);

app.use(express.json());

app.listen(8080, () => {
    console.log('server listening on port 8080')
})

// cross-origin resource sharing policy
app.use(cors({
    origin: 'http://localhost:5173',  // Frontend's origin
    methods: 'GET,POST,PUT,DELETE',   // Allowed HTTP methods
    credentials: true                 // If you're using cookies or auth headers
}));

app.get('/', (req, res) => {
    res.send('Hello from our server!')
})