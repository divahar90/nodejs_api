/*Author: Diva
Date Created: 20/02/18
Description: unit test for suspending notifications to a student
Modified By:
Modified Date:
*/

var app = require('../app');
var chai = require("chai");
var request = require("supertest");
var expect = chai.expect;

describe('Suspend Notifications', function() {
    describe('Suspend a student from receiving notifications', () => {
        var payload = {
            "student":"studentjon2@example.com"
        };

    it('should send success on suspending the notifications', (done) => {

        request(app).post('/api/suspend').send(payload)
        .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.equal(true);
            done();
        });
    });
});


    describe('When no student email specified', () => {
        var payload = {
        };

    it('should throw error no student email specified', (done) => {

        request(app).post('/api/suspend').send(payload)
        .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Student Email required');
            done();
        });
     });
  });
});