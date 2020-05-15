const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    login : {type: String, min: 5, max: 20, required: true, unique: true },
    email : {type: String, required: true, unique: true },
    password : {type: String, required: true,},
    type: {type: Boolean, default: false},
  
  }, {collection: 'members'})

userSchema.pre('save', function(next) {
    var user = this;

     /** only hash the password if it has been modified (or is new)
     * 1 generate a salt
     * 2 hash the password using our new salt
     * 3 override the cleartext password with the hashed one
    */ 
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return callback(err);
      callback(null, isMatch);
  });
};

var User = mongoose.model("User",userSchema);
module.exports = User;