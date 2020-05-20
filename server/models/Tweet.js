const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const tweetSchema = new mongoose.Schema({
    author: {type: String},
    content: {type: String},
    creationDate: {type: Date}
});

module.exports = mongoose.model('Tweet', tweetSchema)