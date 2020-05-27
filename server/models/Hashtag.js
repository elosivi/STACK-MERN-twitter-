const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const hashtagSchema = new mongoose.Schema({
    content: {type: String}
});

module.exports = mongoose.model('Hashtag', hashtagSchema)