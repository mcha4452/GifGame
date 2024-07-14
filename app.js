const express = require('express');
const bodyParser = require('body-parser');
const giphy = require('giphy-api')('YOUR_GIPHY_API_KEY');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/search-gifs', async (req, res) => {
    const { query } = req.query;
    try {
        const result = await giphy.search(query);
        res.json(result.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching GIFs' });
    }
});

app.post('/api/save-game', (req, res) => {
    const { gifWords } = req.body;
    // Here you would typically save the game data to a database
    // For this example, we'll just send it back as a response
    res.json({ message: 'Game saved successfully', game: gifWords });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
