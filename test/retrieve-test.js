/*Author: Diva
Date Created: 20/02/18
Description: unit test for retrieve students
Modified By:
Modified Date:
*/

var app = require('../app');
var chai = require("chai");
var request = require("supertest");
var expect = chai.expect;

describe('Retrieve Students test', function() {
    describe('Retrieve students for a teacher', () => {
        var payload = {
        "email": "teacherken2@gmail.com"
        };

    it('should retrieve all students for the email id', (done) => {

        request(app).post('/api/retrieve').send(payload)
        .end(function(err, res) {
            console.log(res.body.students);
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.equal(true);
            expect(res.body.students[0]).to.equal('studentjon2@example.com');
            done();
        });
   });
});


    describe('Retrieve Id that is not registered', () => {
        var payload = {
            "email": "teachernotexist@gmail.com"
        };

    it('should throw error if a teacher is not registered', (done) => {

        request(app).post('/api/retrieve').send(payload)
        .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Teacher does not exist');
            done();
        });
    });
  });
});