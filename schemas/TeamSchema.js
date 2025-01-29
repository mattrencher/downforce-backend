const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TeamSchema = new Schema({
  currentPhase: {
    type: String,
    enum: ['auction', 'race', 'betting', 'finished'],
    default: 'auction'
  },
  currentCar: String,
  currentPowerCard: String,
  currentTeamname: String,
  bidsSubmitted: Number,
  currentBids: [{
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    bid: Number,
    cardPlayed: Object
  }],
  winner: {
    userId: String,
    bid: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Team', TeamSchema);