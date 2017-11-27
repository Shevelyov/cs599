var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res){
    var dialog = require('dialog');
    var db = req.db;
    var collection = db.get("users");
    collection.findOne({name: req.body.user, password: req.body.pass}, function(err, user){
        if(err){
            console.log("Error while logging in : " + err);
            return res.render(('index', {message: err.message}));
        }

        if(!user){
            return res.render('index', {message: 'Wrong credentials, check your username or password!'});
        }
        console.log("Here we are Mr." + user.name);
        dialog.info('Welcome, ' + user.name + '!');
        res.redirect('/itemslist');
        //return res.render('itemslist', {message: 'Welcome back' + user.name});
    })
})

module.exports = router;
