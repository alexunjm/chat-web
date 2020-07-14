var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');
// var User = mongoose.model('User');

var Schema = new mongoose.Schema({
  name: { type: String, required: [true, "can't be blank"]},
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {timestamps: true});

Schema.methods.toJSONFor = function(){
  return {
    id: this._id,
    name: this.name,
    participants: this.participants.map(user => user.toProfileJSONFor(user)),
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

mongoose.model('Chat', Schema);
