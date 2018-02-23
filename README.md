# nodejs_api
API to handle dashboard for teachers and students

The API endpoints are written to build an administrative dashboard for teachers to register and query their students in school. Some context - A teacher can register multiple students. A student can be registered under multiple teachers. Teachers can send notifications to students to inform students of important announcements.

### Technology used

* node.js
* express.js

### Installation and Configuration

* Persistence: mongodb (Since Node.js and Mongo DB goes hand in hand)
* url: mongodb://localhost:27017/dashboard (For local machine)
* url: mongodb://mongo/dashboard (For docker)

### Steps to run the app using docker compose:
1. Clone the repository into a folder
2. Open the path and run docker-compose up --build
3. Open one more docker terminal and execute these DB commands:
	
	* docker exec -it nodejsapi_mongo_1 bash (nodejsapi_mongo_1 is the mongo container created for me. Please check docker logs to get your mongo container name)
	* Type mongo
	* Type use dashboard
	* Type db.createCollection("school")
	* Type db.school.ensureIndex( { teacher: 1 }, { unique: true } )
	
### Tests for each service end point are in test folder (Using mocha and Chai)

### Screen prints (Tested in my Docker locally)
### 1. As a teacher, I should be able to register one or more students.

Success flow

![alt text](/misc/reg1.jpg "Title")

When teacher is already registered

![alt text](/misc/reg2.jpg "Title")

### 2. As a teacher, I should be able to retrieve the list of students under a specified email.

Success flow

![alt text](/misc/ret1.jpg "Title")

When no teacher exists with the email id provided

![alt text](/misc/ret2.jpg "Title")


### 3. If given two teachers' emails, I should be able to retrieve the list of common students they have.

Success flow

![alt text](/misc/comm1.jpg "Title")

When insufficient number of teachers are specified

![alt text](/misc/comm2.jpg "Title")

### 4. When a student is suspended, he will not be able to receive any teacher's notifications anymore.

```
I have handled this use case by introducing a flag for each student email while registering. By default, the suspend flag for each student id will be false.

Once a student Id is suspended, this flag is set to true, thereby making the students not to receive notifications.
```

![alt text](/misc/sus1.jpg "Title")

### 5. As a teacher, I should be able to retrieve all student emails that can receive notifications from a teacher's email.

Student ID associated with a teacher (When not suspended)

![alt text](/misc/not1.jpg "Title")

Student IDs associated with a teacher and also mentioned in notification (Duplicates avoided in response)

![alt text](/misc/not2.jpg "Title")
