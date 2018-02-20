/*Author: Diva
Date Created: 20/02/18
Description: unit test for register teacher
Modified By:
Modified Date:
*/

var app = require('../app');
var chai = require("chai");
var request = require("supertest");
var expect = chai.expect;

describe('Register teacher test', function() {
    describe('Register teacher', () => {
        var payload = {
            "teacher": "teacherken10@gmail.com",
            "students":
                [
                    "studentjon10@example.com"
                ]
        };

        it('should register teacher with students', (done) => {

        request(app).post('/api/register').send(payload)
        .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.equal(true);
            done();
        });
    });
});


    describe('Register exisitng teacher Id', () => {
        var payload = {
            "teacher": "teacherken2@gmail.com",
            "students":
                [
                    "studentjon2@example.com"
                ]
        };

       it('should not register teacher who is already registered', (done) => {

        request(app).post('/api/register').send(payload)
        .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Teacher already registered');
            done();
        });
      });
    });
});