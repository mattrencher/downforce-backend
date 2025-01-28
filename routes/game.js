const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();
const GameController = require('../controllers/GameController');
const response = require("../responses/APIResponse");
const controller = new GameController;

router.get('/', function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array());
  }

  return controller.list(req, res);
});

router.post('/', async (req, res) => {
  const errors = validationResult(req);
  try {
    const gameController = new GameController();
    const game = await gameController.initializeGame();
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).send(errors.array());
  // }

  // return controller.create(req, res);
});

router.post('/:gameId/start', async (req, res) => {
  try {
    const gameService = new GameController(req.params.gameId);
    const game = await gameService.startAuction();
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;