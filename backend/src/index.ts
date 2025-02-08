const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// cross-origin resource sharing policy
app.use(cors({
    origin: 'http://localhost:5173',  // Frontend's origin
    methods: 'GET,POST,PUT,DELETE',   // Allowed HTTP methods
    credentials: true                 // If you're using cookies or auth headers
}));

app.use(express.json());

require('./routes/spotify')(app);

app.listen(8080, () => {
    console.log('server listening on port 8080')
})

app.get('/', (req, res) => {
    res.send('Hello from our server!')
})