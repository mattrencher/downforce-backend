const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = new Schema({
  status: {
    type: String,
    enum: ['waiting', 'auction', 'race', 'finished'],
    default: 'waiting'
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  currentPhase: {
    type: String,
    enum: ['auction', 'race', 'betting', 'finished'],
    default: 'auction'
  },
  auction: {
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