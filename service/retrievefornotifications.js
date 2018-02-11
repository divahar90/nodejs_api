/*Author: Diva
Date Created: 11/02/18
Description: http methods for suspending notifications
Modified By:
Modified Date:
*/

var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/dashboard";

router.post('/', function(req, res) {

    if (null == req.body.teacher
        || undefined == req.body.teacher) {
        res.status(200)
            .json({
                success: false,
                message: "Teacher Email required"
            });
    }

    mongoClient.connect(url, function (err, db) {
        db.collection("school").find({
            $and: [{"teacher": req.body.teacher}, {"students.suspend": {$all: [false]}}]}).toArray(function (err, result) {
                var studs = [];
                var uniqueStuds = [];

                if(null!=result
                            && undefined!=result && result.length>0) {
                    for (var idx = 0; idx < result[0].students.length; idx++) {
                        if(!result[0].students[idx].suspend) {
                            studs.push(result[0].students[idx].email);
                        }
                    }

                    uniqueStuds = studs.filter(function (elem, pos) {
                        return studs.indexOf(elem) == pos;
                    })
                }

            console.log(uniqueStuds);

                res.status(200)
                    .json({
                        success: true,
                        recipients: uniqueStuds
                    });

                db.close();
            })
    });
});

module.exports.router = router;