/*Author: Diva
Date Created: 11/02/18
Description: http methods for retrieving common students for a teacher
Modified By:
Modified Date:
*/

var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/dashboard";

router.post('/', function(req, res) {


    if(req.body.teachers.length !=2) {
        res.status(200)
            .json({
                success: false,
                message: 'Exactly 2 teacher emails required'
            });
    }

    var std1 = [];
    var std2 = [];

    mongoClient.connect(url, function (err, db) {
        db.collection("school").find({"teacher": req.body.teachers[0]}).toArray(function (err, result) {

            if(null!=result &&
                        undefined!=result && result.length>0){
            std1 = result[0].students;
            }

            db.close();
        });

        db.collection("school").find({"teacher": req.body.teachers[1]}).toArray(function (err, result) {

            if(null!=result &&
                undefined!=result && result.length>0) {
                std2 = result[0].students;
            }

            db.close();

        var commonStuds = [];

        for (var index1 = 0; index1 < std1.length; index1++) {
            for (var index2 = 0; index2 < std2.length; index2++) {
                if (std1[index1].email ==
                    std2[index2].email) {
                    commonStuds.push(std2[index2].email);
                }
            }
        }

        res.status(200)
            .json({
                success: true,
                students: commonStuds
            });
        });
    });
});

module.exports.router = router;