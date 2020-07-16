var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Chat = mongoose.model('Chat');
var Message = mongoose.model('Message');
var auth = require('../auth');


// Preload id objects on routes with ':id'
router.param('id', function(req, res, next, id) {

  Chat.findById(id)
    .populate('participants')
    .then(function (chat) {
      if (!chat) { return res.sendStatus(404); }

      req.chat = chat;

      return next();
    }).catch(next);
});

// Preload user objects on routes with ':nickname'
router.param('nickname', function(req, res, next, nickname) {

  User.find({nickname})
    .then(function (users) {
      if (!users || users.length < 1) { return res.sendStatus(404); }

      req.withUser = users[0];

      return next();
    }).catch(next);
});

router.get('/list', auth.required, function(req, res, next) {

  var query = {};
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  if( typeof req.query.tag !== 'undefined' ){
    query.participants = {"$in" : [req.payload.id]};
  }

  return Promise.all([
    Chat.find(query)
      .limit(Number(limit))
      .skip(Number(offset))
      .sort({updatedAt: 'desc'})
      .populate('participants')
      .exec(),
    Chat.count(query).exec(),
  ]).then(function([chatList, chatCount]){

    const result = {
      chatList: chatList.map(chat => chat.toJSONFor()),
      chatCount
    }
    return res.json(result);
  }).catch(next);

});

// create chat
router.post('/create', auth.required, function(req, res, next) {

  if (!req.body.name && !req.body.nicknames) {
    return res.sendStatus(400);
  }

  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    let name = `${user.nickname}_${Date.now()}`;
    if (typeof req.body.name !== 'undefined') {
      name = req.body.name;
    }

    let nicknames = [];
    if (typeof req.body.nicknames !== 'undefined') {
      nicknames = req.body.nicknames;
    }

    User.find({ nickname: {"$in" : nicknames} })
    .then(function (users) {
      const participants = [user, ...users];

      var chat = new Chat({name, participants});

      return chat.save().then(function(){
        return res.json({chat: chat.toJSONFor()});
      });
    }).catch(next);

  }).catch(next);
});

// get chat by id
router.get('/get/:id', auth.required, function(req, res/* , next */) {

  return res.json({chat: req.chat.toJSONFor()});
});

// get chat with user by :nickname
router.get('/with/:nickname', auth.required, function(req, res, next) {
  Chat.find({$and: [
    { participants: {"$in" : [req.payload.id, req.withUser._id]} },
    { participants : {$exists:true}, $where:'this.participants.length=2' }
  ]})
  .populate('participants')
  .then(function (chats) {
    if (chats && chats.length > 0) {

      const [chat] = chats;

      return res.json({chat: chat.toJSONFor()});
    }

    User.findById(
      req.payload.id
    ).then(user => {
      const name = `${user.nickname}_${Date.now()}`;
      const participants = [user, req.withUser];

      var chat = new Chat({name, participants});

      chat.save().then(function(){
        return res.json({chat: chat.toJSONFor()});
      }).catch(next);
    })
  }).catch(next);
});

// update chat
router.post('/update/:id', auth.required, function(req, res, next) {


  if (!req.body.name && !req.body.nicknames) {
    return res.sendStatus(400);
  }

  User.findById(
    userId
  ).then(user => {

    if (!user) { return res.sendStatus(401); }

    if (typeof req.body.name !== 'undefined') {
      req.chat.name = req.body.name;
    }
    return Promise.resolve(user);
  }).then((user) => {

    if (typeof req.body.nicknames !== 'undefined') {
      let nicknames = req.body.nicknames;

      return Promise.all([
        user,
        User.find({ nickname: {"$in" : nicknames} })
      ]);
    }

    return Promise.all([
      user,
      []
    ]);
  }).then(([user, users]) => {

    const participants = [user, ...users];
    req.chat.participants = participants;

    return req.chat.save();
  }).then((chat) => {

    return res.json({chat: chat.toJSONFor()});
  }).catch(next);


});

// delete chat
router.delete('/delete/:id', auth.required, function(req, res, next) {

  if (req.chat.participants[0]._id.toString() !== req.payload.id.toString()) { return res.sendStatus(403); }

  return req.chat.remove().then(function(){
    return res.sendStatus(204);
  }).catch(next);
});

// add new message chat
router.get('/:id/messages', auth.required, function(req, res, next) {

  var query = {chat: req.chat._id};
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  return Promise.all([
    Message.find(query)
      .limit(Number(limit))
      .skip(Number(offset))
      .sort({updatedAt: 'desc'})
      .exec(),
    Message.count(query).exec(),
  ]).then(function([messageList, messageCount]){

    const result = {
      messageList: messageList.map(message => message.toJSONFor()),
      totalMessages: messageCount,
      limit, offset
    }
    return res.json(result);
  }).catch(next);

});

// add new message chat
router.post('/:id/message', auth.required, function(req, res, next) {

  if (req.body.message.from != req.payload.id) { return res.sendStatus(403); }

  User.findById(req.payload.id).then(user => {

    if (!user) { return res.sendStatus(401); }

    // req.chat;
    const message = new Message({...req.body.message, chat: req.chat});

    message.save().then(function(msg){
      req.chat.messages.concat([msg]);

      return req.chat.save().then(function(chat) {
        res.json({message: msg.toJSONFor()});
      }).catch(next);
    }).catch(next);
  }).catch(next);

});

module.exports = router;
