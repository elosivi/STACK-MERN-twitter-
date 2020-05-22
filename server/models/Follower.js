const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const followerSchema = new mongoose.Schema({
    leaderId: {type: ObjectId},
    leaderName: {type: String},
    followerId: {type: ObjectId},
    followerName: {type: String},
    creationDate: {type: Date},
    banned: {type: Boolean}
});

module.exports = mongoose.model('Follower', followerSchema)