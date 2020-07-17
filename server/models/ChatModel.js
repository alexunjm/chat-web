var mongoose = require('mongoose');


var Schema = new mongoose.Schema({
  isChannel: { type: Boolean, default: false },
  name: { type: String, required: [true, "can't be blank"] },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Message'
  }]
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
