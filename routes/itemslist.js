var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    console.log("processing db request...")
    var db = req.db;
    var collection = db.get("items");
    collection.find({}, {}, function(e, docs){
        console.log(e);
        res.render("itemslist", {
            "itemslist" : docs
        });
        console.log("request finished...")
    });
});


module.exports = router;