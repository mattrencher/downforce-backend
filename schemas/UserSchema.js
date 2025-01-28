const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game'
    },
    speedCards: [{
      color: String,
      value: Number,
      numCars: Number,
      hasWild: Boolean
    }],
    ownedCars: [{
      color: String,
      powerCard: String
    }],
    money: {
      type: Number,
      default: 0
    },
    bids: [{
      round: Number,
      amount: Number,
      successful: Boolean
    }],
    created_at: {
        type:Date,
        default:Date.now
    },
    updated_at: {
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('User', userSchema);