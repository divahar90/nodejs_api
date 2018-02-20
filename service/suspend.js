/*Author: Diva
Date Created: 11/02/18
Description: http methods for suspending notifications
Modified By:
Modified Date:
*/

var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo/dashboard";

router.post('/', function(req, res) {

    if(null==req.body.student
                || undefined==req.body.student || req.body.student.length==0){
        res.status(200)
            .json({
                success: false,
                message:"Student Email required"
            });
    }

    mongoClient.connect(url, function(err, db) {
        db.collection("school").updateMany(
            { "students.email": req.body.student },
            { $set: { "students.$.suspend" : true }})

        res.status(200)
            .json({
                success: true,
            });

        db.close();
    });
});

module.exports.router = router;