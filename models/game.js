/** Who are playing? Who's turn? */
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  player1: { type: String },
  player2: { type: String },
  count: { type: Number },
});

module.exports = mongoose.model('Game', GameSchema);
