// server.js
const express = require('express');
const cors = require('cors');
const Elo = require('elo-rating');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Elo ratings for players (dummy data)
let players = {
  player1: 1200,
  player2: 1200,
};

// Update Elo ratings
app.post('/update-ratings', (req, res) => {
  const { winner, loser } = req.body;
  const K_FACTOR = 32;

  const player1Rating = players[winner];
  const player2Rating = players[loser];

  const newRatings = Elo.calculate(player1Rating, player2Rating, true, K_FACTOR);

  players[winner] = newRatings.playerRating;
  players[loser] = newRatings.opponentRating;

  res.json({ message: 'Elo ratings updated successfully', players });
});


app.get('/ratings', (req, res) => {
  res.json({ players });
});


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
