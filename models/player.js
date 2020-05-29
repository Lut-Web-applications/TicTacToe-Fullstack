const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlyerSchema = new Schema({
  name: { type: String },
  won: { type: Number },
});

module.exports = mongoose.model("Player", PlyerSchema);
