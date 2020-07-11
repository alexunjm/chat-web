var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

var Schema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true, required: [true, "es obligatorio"], match: [/^[a-zA-Z0-9]+$/, 'es inválido'], index: true},
  email: {type: String, lowercase: true, unique: true, required: [true, "es obligatorio"], match: [/\S+@\S+\.\S+/, 'es inválido'], index: true},
  hash: String,
  salt: String
}, {timestamps: true});

Schema.plugin(uniqueValidator, {message: 'ya ha sido tomado.'});

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
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

Schema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
  };
};

Schema.methods.toProfileJSONFor = function(user){
  return {
    username: this.username,
    image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
  };
};

mongoose.model('User', Schema);
