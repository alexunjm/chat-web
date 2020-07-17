var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

var Schema = new mongoose.Schema({
  nickname: {type: String, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  fullName: {type: String, lowercase: true, required: [true, "can't be blank"]},
  hash: String,
  salt: String
}, {timestamps: true});

Schema.plugin(uniqueValidator, {message: 'is already taken.'});

Schema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

Schema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

Schema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    nickname: this.nickname,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

Schema.methods.toAuthJSON = function(){
  return {
    id: this._id,
    fullName: this.fullName,
    nickname: this.nickname,
    token: this.generateJWT(),
  };
};

Schema.methods.toProfileJSONFor = function(user){
  return {
    id: this._id,
    fullName: this.fullName,
    nickname: this.nickname,
    image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
  };
};

mongoose.model('User', Schema);
