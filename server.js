const express = require('express');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
});

// Existing login and callback routes here...

// Search for tracks
app.post('/search', (req, res) => {
    const { keyword } = req.body;
    spotifyApi.searchTracks(`track:${keyword} NOT explicit`, { limit: 10 })
        .then(data => {
            res.json(data.body.tracks.items);
        }, err => {
            console.error(err);
            res.status(400).send('Failed to search tracks');
        });
});

// Add track to a playlist
app.post('/add-track', (req, res) => {
    const { trackUri, playlistId } = req.body;
    spotifyApi.addTracksToPlaylist(playlistId, [trackUri])
        .then(() => {
            res.send('Track added');
        }, err => {
            console.error(err);
            res.status(400).send('Failed to add track');
        });
});

app.listen(3000, () => {
    console.log('Server listening at http://localhost:3000');
});
