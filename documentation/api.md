# React-ion API documentation

## API endpoints
--------------------------------------------------------------

### Users

userObject = {
  id: (integer)
}

#### Create a User
Method: POST
Path: /api/user/
Input: userObject
Response: 200 and status object

#### Delete a User
Method: DELETE
Path: /api/meal/delete
Input: userObject
Response: 200 and status Object

#### Get a User
Method: GET
Path: /api/user/"userId"
Input: userId through the url
Response: 200 and userObject

#### Get all Users
Method: GET
Path: /api/user/
Input: 
Response: 200 and Array of userObjects

--------------------------------------------------------------

### Projects

projectObject = {
  id: (integer),
  name: (string),
  project_tree: (string)
}

#### Get projects of a user
Method: GET
Path: /api/project/"userId"
Input: userId through the url
Response: 200 and Array of projectObjects

#### Create Projects
Method: POST
Path: /api/project/
Input:
{
  userId: (integer),
  name: (string),
  project_tree: (string)
}
Response: 200 and projectId, as string

#### Remove Project
Method: DELETE
Path: /api/project/remove
Input: projectId,
{
  id: (string)
}
Response: 200 and projectObject (of removed project)

#### Update Project
Method: PUT
Path: /api/project/update
Input: projectObject
Response: 200 and status Object

#### Generate Project
Method: POST
Path: /api/project/generate
Input: JSON with property username and password
Response: 200 and Object with properties token, username and userId
