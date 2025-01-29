const model = require('../models/GameModel');
const response = require("../responses/APIResponse");
const helper = require('../helpers/Helper');

class GameController {
    constructor(gameId) {
      this.gameId = gameId;
      this.speedCards = [];
      this.powerCards = [];
    }

    async list(req, res) {
        // Get records from database
        model.listWithPagination(req.app.get('page'), req.app.get('per_page'), req.app.get('list_all')).then(function (result) {
            // Check if record exists
            if (result) {
                res.status(200).send(response.successWithPagination(result, req.app.get('page'), req.app.get('per_page')));
            } else {
                // Check if record is not found then send an empty data
                res.status(200).send(response.successWithData());
            }
        }).catch(function (error) {
            res.status(500).send(response.error(error, req.app.get('is_debug')));
        });
    }

    async create(req, res) {
      let new_game = {
        "gameId": this.gameId,
        "speedCards": this.speedCards,
        "powerCards": this.powerCards
      }

      model.create(new_game)
      .then((createdGame) => {
          res.status(200).send(response.successWithData([createdGame]));
      })
      .catch(function (err) {
          res.status(500).send(response.error(err, 'Error while creating game'));
      });
    }

    initializeGame(req, res) {
      // Initialize speed cards deck
      const colors = ['red', 'blue', 'green', 'yellow', 'black', 'orange'];
      const speeds = [2, 4, 6, 8];
      this.speedCards = ['determined', 'cunning', 'aggressive', 'unpredictable', 'strategic', 'tricky'];
      colors.forEach(color => {
        speeds.forEach(speed => {
          // Add cards with different combinations of cars
          this.speedCards.push({
            color,
            speed,
            wildCards: 0
          });
        });
      });
  
      // Add wild cards
      // Implementation for wild cards...
  
      // Shuffle decks
      this.shuffleDecks();
  
      // return {
      //   speedCards: this.speedCards,
      //   powerCards: this.powerCards
      // };

      let new_game = {
          "gameId": this.gameId,
          "speedCards": this.speedCards,
          "powerCards": this.powerCards
      }

      model.create(new_game)
      .then((createdGame) => {
          res.status(200).send(response.successWithData([createdGame]));
      })
      .catch(function (err) {
          res.status(500).send(response.error(err, 'Error while creating game'));
      });
    }
  
    shuffleDecks() {
      // Fisher-Yates shuffle implementation
      const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      };
  
      shuffle(this.speedCards);
      shuffle(this.powerCards);
    }
  
    async startAuction() {
      const game = await Game.findById(this.gameId);
      if (!game) throw new Error('Game not found');
  
      // Deal initial cards to players
      game.players.forEach(player => {
        player.cards = this.speedCards.splice(0, 6);
      });
  
      // Reveal first car and power card
      game.auction.currentCar = this.speedCards.shift();
      game.auction.currentPowerCard = this.powerCards.shift();
      game.status = 'auction';
  
      await game.save();
      return game;
    }
  
    async submitBid(playerId, cardPlayed) {
      const game = await Game.findById(this.gameId);
      if (!game) throw new Error('Game not found');
  
      const player = game.players.find(p => p.userId === playerId);
      if (!player) throw new Error('Player not found');
  
      // Validate the bid
      if (!player.cards.includes(cardPlayed)) {
        throw new Error('Invalid card played');
      }
  
      // Record the bid
      player.currentBid = {
        amount: this.calculateBidAmount(cardPlayed, game.auction.currentCar),
        cardPlayed
      };
      game.auction.bidsSubmitted++;
  
      // If all players have bid, determine winner
      if (game.auction.bidsSubmitted === game.players.length) {
        this.determineAuctionWinner(game);
      }
  
      await game.save();
      return game;
    }
  
    calculateBidAmount(card, auctionCar) {
      // Implementation to calculate bid amount based on card value
      // matching the car color being auctioned
      return card.speed;
    }
  
    determineAuctionWinner(game) {
      // Find highest bid
      let highestBid = 0;
      let winner = null;
  
      game.players.forEach(player => {
        if (player.currentBid.amount > highestBid) {
          highestBid = player.currentBid.amount;
          winner = player;
        } else if (player.currentBid.amount === highestBid) {
          // Implement tiebreaker rules
          // 1. More cars on the card
          // 2. No wild symbol
        }
      });
  
      game.auction.winner = {
        playerId: winner.userId,
        bid: highestBid
      };
  
      // Update winner's state
      const winningPlayer = game.players.find(p => p.userId === winner.userId);
      winningPlayer.cars.push(game.auction.currentCar);
      winningPlayer.money -= highestBid;
      winningPlayer.powerCard = game.auction.currentPowerCard;
  
      // Reset for next auction round
      game.auction.currentCar = null;
      game.auction.currentPowerCard = null;
      game.auction.bidsSubmitted = 0;
    }
  }
  
  module.exports = GameController;