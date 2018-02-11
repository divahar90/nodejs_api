/*Author: Diva
Date Created: 11/02/18
Description: http methods for registering teachers and students
Modified By:
Modified Date:
*/

var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/dashboard";

router.post('/', function(req, res) {

    var students = []
    for(var index=0;index<req.body.students.length;index++){
        var student = {"email": req.body.students[index], "suspend": false};
        students.push(student);
    }

    console.log(students);
    req.body.students = students;

    mongoClient.connect(url, function(err, db) {
            db.collection("school").insertOne(req.body, function(err, result) {
                if (err) {
                        if (err.code == 11000) {
                            res.status(200)
                                .json({
                                     success: false,
                                     message: 'Teacher already registered'
                                });
                        } else
                            throw err;
                    db.close();
                } else {
                    res.status(200)
                        .json({
                            success: true
                        });
                    db.close();
                }
            });
        });
});

module.exports.router = router;