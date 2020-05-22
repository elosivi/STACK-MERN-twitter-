const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const FollowersSchema = new mongoose.Schema({
    leaderId: {type: String},
    leaderLogin: {type: String},
    followerId: {type: String},
    followerLogin: {type: String},
    blocked:{type: Boolean, default: false},
    updateDate: {type: Date},
    creationDate: {type: Date}
});

module.exports = mongoose.model('Followers', FollowersSchema)