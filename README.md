# nodejs_api
API to handle dashboard for teachers and students

The API endpoints are written to build an administrative dashboard for teachers to register and query their students in school. Some context - A teacher can register multiple students. A student can be registered under multiple teachers. Teachers can send notifications to students to inform students of important announcements.

### Technology used

* node.js
* express.js

### Installation and Configuration

Persistence: mongodb
url: mongodb://localhost:27017/dashboard

DB Name: dashboard
Collection: school
Index: 
{
    "teacher" : 1.0
}

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