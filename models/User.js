const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');
const jwt= require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerified: Boolean,
  mentor: Boolean,
  github: String,
  tokens: [{
    token:{
      type:String,
      required:true
    }
  }],
  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  }
},
{ timestamps: true });


userSchema.methods.genAuthtoken=async function(){
  const user=this;
  const _id=user._id.toString();
  const token =await jwt.sign({ "_id":_id },"nodejs=:)"); 
  user.tokens.concat(token);
  await user.save();
  console.log(token);
  return token;
}

userSchema.statics.findByCredentials=async function(email,password){
  const user=await User.findOne({email});
  if(!user){
      return Promise.reject(new Error("email/password incorrect"));
  }
  const match=await bcrypt.compare(password,user.password);
  if(!match){
      return Promise.reject(new Error("email/password incorrect"));
  }
  return user;
}
/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */

userSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
