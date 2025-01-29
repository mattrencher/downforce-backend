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

// Start auction phase
router.post('/:gameId/auction/start', async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) return res.status(404).json({ message: 'Game not found' });

    // Select random car and power card for auction
    const availableCars = game.availableCars.filter(car => !car.owner);
    const randomCar = availableCars[Math.floor(Math.random() * availableCars.length)];
    
    game.currentPhase = 'auction';
    game.currentAuction = {
      carColor: randomCar.color,
      powerCard: generateRandomPowerCard(),
      currentBids: []
    };

    await game.save();
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Submit bid
router.post('/:gameId/auction/bid', async (req, res) => {
  try {
    const { playerId, cardPlayed } = req.body;
    const game = await Game.findById(req.params.gameId);
    if (!game) return res.status(404).json({ message: 'Game not found' });

    const player = await Player.findById(playerId);
    if (!player) return res.status(404).json({ message: 'Player not found' });

    // Validate the played card
    const bidValue = calculateBidValue(cardPlayed, game.currentAuction.carColor);
    
    game.currentAuction.currentBids.push({
      player: playerId,
      bid: bidValue,
      cardPlayed
    });

    await game.save();
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Resolve auction
router.post('/:gameId/auction/resolve', async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) return res.status(404).json({ message: 'Game not found' });

    const winner = determineAuctionWinner(game.currentAuction.currentBids);
    if (winner) {
      // Update car ownership
      game.availableCars = game.availableCars.map(car => {
        if (car.color === game.currentAuction.carColor) {
          car.owner = winner.player;
          car.powerCard = game.currentAuction.powerCard;
        }
        return car;
      });

      // Update player information
      const player = await Player.findById(winner.player);
      player.ownedCars.push({
        color: game.currentAuction.carColor,
        powerCard: game.currentAuction.powerCard
      });
      player.bids.push({
        round: game.currentAuction.currentBids.length,
        amount: winner.bid,
        successful: true
      });
      await player.save();
    }

    // Clear current auction
    game.currentAuction = null;

    // Check if auction phase is complete
    if (game.availableCars.every(car => car.owner)) {
      game.currentPhase = 'race';
    }

    await game.save();
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

function generateRandomPowerCard() {
  const powerCards = ['Aggressive', 'Cunning', 'Determined', 'Strategic', 'Tricky', 'Unpredictable'];
  return powerCards[Math.floor(Math.random() * powerCards.length)];
}

function calculateBidValue(card, auctionColor) {
  // Implementation based on game rules
  return card.colors[auctionColor] || 0;
}

function determineAuctionWinner(bids) {
  if (!bids.length) return null;
  
  // Sort bids by value, then by number of cars on card, then by presence of wild symbol
  return bids.sort((a, b) => {
    if (a.bid !== b.bid) return b.bid - a.bid;
    if (a.cardPlayed.numCars !== b.cardPlayed.numCars) return b.cardPlayed.numCars - a.cardPlayed.numCars;
    return a.cardPlayed.hasWild ? 1 : -1;
  })[0];
}

module.exports = router;