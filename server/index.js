import express from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv';
dotenv.config();

const app = express()
app.use(cors())


app.get('/api/matches', async (req, res) => {
    try {
        const response = await axios.get('https://v1.basketball.api-sports.io/games', {
            headers: {
                'x-apisports-key': process.env.BASKETBALL_API_KEY
            },
            params: {
                date: '2025-05-30',
            }
        });

        const matches = response.data.response
  .filter(game => game.teams?.home?.name && game.teams?.away?.name) 
  .map(game => {
    const matchDateTime = new Date(game.timestamp * 1000);

    return {
      homeTeam: game.teams.home.name,
      awayTeam: game.teams.away.name,
      date: matchDateTime.toLocaleDateString(), 
      time: matchDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      league: game.league?.name || "Unknown"
    };
  });


        res.json({
            matches,
            total: matches.length,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error in matches endpoint:', error);
        res.status(500).json({
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});




const PORT = 3002;

try {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    }).on('error', (error) => {
        console.error('Server error:', error);
        process.exit(1);
    });
} catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
}