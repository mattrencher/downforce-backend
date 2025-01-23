const express = require('express');
const router = express.Router();
const GameService = require('../services/GameService');

router.post('/', async (req, res) => {
  try {
    const gameService = new GameService();
    const game = await gameService.initializeGame();
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:gameId/start', async (req, res) => {
  try {
    const gameService = new GameService(req.params.gameId);
    const game = await gameService.startAuction();
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;