/*Author: Diva
Date Created: 11/02/18
Description: http methods for retrieving students for a teacher
Modified By:
Modified Date:
*/

var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/dashboard";

router.post('/', function(req, res) {

    mongoClient.connect(url, function(err, db) {
        db.collection("school").find({ "teacher": req.body.email }).toArray(function(err, result) {
            if (null==result ||
                                undefined==result || result.length == 0) {
                    res.status(200)
                        .json({
                            success: false,
                            message: 'Teacher does not exist'
                        });
                db.close();
            } else {

                var students = []
                for(var index=0;index<result[0].students.length;index++){
                    students.push(result[0].students[index].email);
                }

                console.log(students);

                res.status(200)
                    .json({
                        success: true,
                        students: students
                    });
                db.close();
            }
        });
    });
});

module.exports.router = router;