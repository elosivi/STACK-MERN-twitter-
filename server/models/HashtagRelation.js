const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const hashtagRelationSchema = new mongoose.Schema({
    hashtagId: {type: String},
    tweetId: {type: String}
});

module.exports = mongoose.model('HashtagRelation', hashtagRelationSchema)