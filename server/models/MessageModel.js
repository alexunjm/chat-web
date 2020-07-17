var mongoose = require('mongoose');


var Schema = new mongoose.Schema({
  chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
  from: { type: String, required: [true, "can't be blank"] },
  text: { type: String, required: [true, "can't be blank"] },
  date: { type: Number, default: Date.now() }
}, {timestamps: true});

Schema.methods.toJSONFor = function(){
  return {
    id: this._id,
    from: this.from,
    text: this.text,
    date: this.date,
  };
};

mongoose.model('Message', Schema);
