# SEI-12-12-Project-2

# Overview
Name: Dream Restuarant

The Dream Restaurant application will allow users to build their dream restaurant wherever they want in the world with their favorite menu items included. Users will see previously posted dream restaurants to get ideas for thier own restaurant. They will be able to build out a menu including their favorite appetizers, entrees, and desserts. They will also be able to locate their restaurant anywhere in the world that they desire. Users will be able to see on their list of dream restaurants, change menu items as their desires change, relocate thier restaurant when needed, or delete their choices if they change their mind. They will also see ideas from a list of world renowned chefs and influencers. 

# User Stories

  - As a user, I want the ability to sign up.
  - As a user, I want the ability to sign in. 
  - As a user, I want the ability to sign out. 
  - As a user, I want the ability to create my own dream restaurants. 
  - As a user, I want the ability to create my own menus. 
  - As a user, I want the ability to pick my own appetizers, entrees, and desserts. 
  - As a user, I want the ability to locate my restaurant anywhere in the world.
  - As a user, I want the ability to see other restaurants for potential ideas.
  - As a user, I want the ability to delete my own restaurant ideas if I change my mind. 

  ## Bonus abilities
  - As a user, I want the ability to comment on all restaurants. 
  - As a user, I want the ability to see famous dishes from other restaurants. 
  - As a user, I want the ability to see what dishes are famous in certain locations. 
  - As a user, I want the ability to see other peoples comments on my restuarant. 
  - As a user, I want the ability to suggestions on dishes for similar type restaurants (example - Italian, Chinese, Sushi, etc.). 


# Wireframes

Home Navigation Page

![Alt text](readmePics/Screenshot%202023-01-21%20at%202.36.44%20PM.png)

Index page, show all restaurants

![Alt text](readmePics/Screenshot%202023-01-21%20at%202.36.30%20PM.png)

Index page, closer look at one card

![Alt text](readmePics/Screenshot%202023-01-21%20at%202.35.22%20PM.png)

Show page, page with only 1 card info

![Alt text](readmePics/Screenshot%202023-01-21%20at%202.37.08%20PM.png)

Restaurant CREATE page

![Alt text](readmePics/Screenshot%202023-01-21%20at%202.36.57%20PM.png)

Sign up OR Log in page

![Alt text](readmePics/Screenshot%202023-01-21%20at%202.58.48%20PM.png)

# Route Tables

### Restaurant Routes

| **URL**          | **HTTP Verb**|**Action**|
|------------------|--------------|----------|
|   /rest/         | GET          | index  
|   /rest/:id      | GET          | show       
|   /rest/new      | GET          | new   
|   /rest          | POST         | create   
|   /rest/:id/edit | GET          | edit       
|   /rest/:id      | PATCH/PUT    | update    
|   /rest/:id      | DELETE       | destroy  

### User Routes

| **URL**          | **HTTP Verb**|**Action**|
|------------------|--------------|----------|
| /users/signup    | GET          | new  
| /users/signup    | POST         | create  
| /users/login     | GET          | login  
| /users/login     | POST         | create       
| /users/logout    | DELETE       | destroy   
 

### BONUS - Comment Routes

| **URL**                                   | **HTTP Verb**|**Action**|
|-------------------------------------------|--------------|----------|
| /comments/:restId                        | POST         | create  
| /comments/delete/:restId/:commentId      | DELETE       | destroy       


# Entity Relationship Diagrams


![Alt text](readmePics/Screenshot%202023-01-23%20at%2010.15.23%20AM.png)


# Technologies Used
 - Javascript
 - Mongodb and Mongoose
 - HTML and CSS
 - Express, Liquid, Bootstrap





