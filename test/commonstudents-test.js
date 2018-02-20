/*Author: Diva
Date Created: 20/02/18
Description: unit test for retrieving common students for 2 teachers
Modified By:
Modified Date:
*/

var app = require('../app');
var chai = require("chai");
var request = require("supertest");
var expect = chai.expect;

describe('Retrieve common Students', function() {
    describe('Retrieve common students for a teacher ids', () => {
        var payload = {
            "teachers":
                [
                    "teacherken@gmail.com","teacherken1@gmail.com"
                ]
        };

    it('should retrieve all students for the email id', (done) => {

        request(app).post('/api/commonstudents').send(payload)
        .end(function(err, res) {
            console.log(res.body.students);
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.equal(true);
            expect(res.body.students[0]).to.equal('studentjon1@example.com');
            done();
        });
  });
});


    describe('Case when no 2 ids are provided in request', () => {
        var payload = {
            "teachers":
                [
                    "teacherken@gmail.com"
                ]
        };

    it('should throw error if no 2 ids are specified', (done) => {

        request(app).post('/api/commonstudents').send(payload)
        .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Exactly 2 teacher emails required');
            done();
        });
    });
  });
});