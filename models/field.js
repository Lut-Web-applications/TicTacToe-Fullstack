const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FieldSchema = new Schema({
    cellId: {type: String},
    content: {type: String},
});

module.exports = mongoose.model('Field', FieldSchema);