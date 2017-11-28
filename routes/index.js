var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
    name: String,
    password: String
});

var User = mongoose.model('MongooseUser', UserSchema, "mongooseusers");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res){
    var dialog = require('dialog');
    var db = req.db;

    var name = req.body.user;
    var pass = req.body.pass;

    User.findOne({name: name, password: pass}, function(err, user){
        if(err){
            console.log("Error while logging in : " + err);
            return res.render(('index', {message: err.message}));
        }

        if(!user){
            console.log("Wrong user!!!!!!!!")
            return res.render('index', {message: 'Wrong credentials, check your username or password!'});
        }
        console.log("Here we are Mr." + user.name);
        dialog.info('Welcome, ' + user.name + '!');
        res.redirect('/itemslist'); 
        //return res.render('itemslist', {message: 'Welcome back' + user.name});
    })
})

// router.post('/', function(req, res){
//     var dialog = require('dialog');
//     var db = req.db;
//     var collection = db.get("users");
//     var name = req.body.user;
//     var pass = req.body.pass;
//     collection.findOne({name: name, password: pass}, function(err, user){
//         if(err){
//             console.log("Error while logging in : " + err);
//             return res.render(('index', {message: err.message}));
//         }
//
//         if(!user){
//             return res.render('index', {message: 'Wrong credentials, check your username or password!'});
//         }
//         console.log("Here we are Mr." + user.name);
//         dialog.info('Welcome, ' + user.name + '!');
//         res.redirect('/itemslist');
//         //return res.render('itemslist', {message: 'Welcome back' + user.name});
//     })
// })

module.exports = router;
