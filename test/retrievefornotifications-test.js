/*Author: Diva
Date Created: 20/02/18
Description: unit test for retrieving the recipients of a notification
Modified By:
Modified Date:
*/

var app = require('../app');
var chai = require("chai");
var request = require("supertest");
var expect = chai.expect;

describe('Retrieve Notification recipients', function() {
    describe('Retrieve notification recipents based on a teacher', () => {
        var payload = {
            "teacher":  "teacherken10@gmail.com",
            "notification": "Hello students!"
        };

    it('should retrieve all students for the email id', (done) => {

        request(app).post('/api/retrievefornotifications').send(payload)
        .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.equal(true);
            expect(res.body.recipients[0]).to.equal('studentjon10@example.com');
            done();
        });
     });
  });

    describe('Retrieve recipient from notifications', () => {
        var payload = {
            "teacher":  "teacherken10@gmail.com",
            "notification": "Hello students! studentagnes10@example.com studentagnes11@example.com"
        };

    it('should return IDs associated to teacher as well IDs in notification', (done) => {

        request(app).post('/api/retrievefornotifications').send(payload)
        .end(function(err, res) {
            console.log(res.body.recipients)
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.equal(true);
            expect(res.body.recipients).to.eql([
                "studentjon10@example.com",
                "studentagnes10@example.com",
                "studentagnes11@example.com"
            ]);
            done();
        });
});
});

    describe('Retrieve recipient from notifications with duplicate input IDs', () => {
        var payload = {
            "teacher":  "teacherken10@gmail.com",
            "notification": "Hello students! studentagnes10@example.com studentagnes10@example.com"
        };

    it('should return unique IDs from teacher as well as notification', (done) => {

        request(app).post('/api/retrievefornotifications').send(payload)
        .end(function(err, res) {
            console.log(res.body.recipients)
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.equal(true);
            expect(res.body.recipients).to.eql([
                "studentjon10@example.com",
                "studentagnes10@example.com"
            ]);
            done();
        });
      });
   });
});