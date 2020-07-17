const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');
const auth = require('../auth');

router.get('/', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

router.get('/list', auth.required, function(req, res, next){
  const query = req.query || {};
  let limit = 20;
  let offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  query.nickname = {$ne: req.payload.nickname};

  // console.log("query", {payload: req.payload, query});

  Promise.all([
    User.find(query)
      .limit(Number(limit))
      .skip(Number(offset))
      .sort({createdAt: 'desc'})
      .exec(),
    User.count(query).exec()
  ]).then(function([users, usersCount]){

    return res.json({
      users: users.map((user) => {
        return user.toProfileJSONFor(user);
      }),
      usersCount
    });
  }).catch(next);
});

router.put('/', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    // only update fields that were actually passed...
    if(typeof req.body.user.fullName !== 'undefined'){
      user.fullName = req.body.user.fullName;
    }
    if(typeof req.body.user.nickname !== 'undefined'){
      user.nickname = req.body.user.nickname;
    }
    if(typeof req.body.user.image !== 'undefined'){
      user.image = req.body.user.image;
    }
    if(typeof req.body.user.password !== 'undefined'){
      user.setPassword(req.body.user.password);
    }

    return user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    });
  }).catch(next);
});

router.post('/login', function(req, res, next){
  if(!req.body.user.nickname){
    return res.status(422).json({errors: {nickname: "can't be blank"}});
  }

  if(!req.body.user.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/sign-up', function(req, res, next){
  const user = new User();

  user.fullName = req.body.user.fullName;
  user.nickname = req.body.user.nickname;
  user.setPassword(req.body.user.password);

  user.save().then(function(){
    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

module.exports = router;
