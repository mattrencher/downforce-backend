const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = new Schema({
  status: {
    type: String,
    enum: ['waiting', 'auction', 'race', 'finished'],
    default: 'waiting'
  },
  players: [{
    userId: String,
    username: String,
    cards: [String],
    money: Number,
    cars: [String],
    powerCard: String,
    isReady: Boolean,
    currentBid: {
      amount: Number,
      cardPlayed: String
    }
  }],
  currentPhase: {
    type: String,
    enum: ['auction', 'race', 'betting'],
    default: 'auction'
  },
  auction: {
    currentCar: String,
    currentPowerCard: String,
    bidsSubmitted: Number,
    winner: {
      playerId: String,
      bid: Number
    }
  },
  deck: {
    speedCards: [String],
    powerCards: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', GameSchema);