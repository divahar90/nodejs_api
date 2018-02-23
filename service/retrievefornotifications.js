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

    if (null == req.body.teacher
        || undefined == req.body.teacher) {
        res.status(200)
            .json({
                success: false,
                message: "Teacher Email required"
            });
    }

    else {
        mongoClient.connect(url, function (err, db) {
            db.collection("school").find({
                $and: [{"teacher": req.body.teacher}, {"students.suspend": {$all: [false]}}]
            }).toArray(function (err, result) {
                var studs = [];
                var uniqueStuds = [];

                if (null != result
                    && undefined != result && result.length > 0) {
                    for (var idx = 0; idx < result[0].students.length; idx++) {
                        if (!result[0].students[idx].suspend) {
                            studs.push(result[0].students[idx].email);
                        }
                    }
                }

                    if (null != req.body.notification &&
                        undefined != req.body.notification) {
                        var mail = req.body.notification.match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);

                        if (null != mail) {
                            for (var idx = 0; idx < mail.length; idx++) {
                                studs.push(mail[idx]);
                            }
                        }
                    }

                    uniqueStuds = studs.filter(function (elem, pos) {
                        return studs.indexOf(elem) == pos;
                    })


                res.status(200)
                    .json({
                        success: true,
                        recipients: uniqueStuds
                    });

                db.close();
            })
        });
    }
});

module.exports.router = router;