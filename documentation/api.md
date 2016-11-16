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

#### Get projects of a user
Method: GET
Path: /api/project/"userId"
Input: userId through the url
Response: 200 and Array of projectObjects


--------------------------------------------------------------

### Projects

projectObject = {
  id: (integer),
  name: (string),
  project_tree: (string)
}

#### Get All Projects
Method: GET
Path: /api/project/
Input: None
Response: Array of projectObjects


#### Get One Project
Method: GET
Path: /api/project/<projectId>
Input: projectId via route parameter
Response: projectObject


#### Create Project
Method: POST
Path: /api/project/
Input:
{
  projectSettings: {
    userId: (integer),
    permissionId: (integer),
  }
  projectProps: {
    name: (string),
    project_tree: (string)
  }
}
Response: projectObject (newly created one)


#### Update Project
Method: PUT
Path: /api/project/<projectId>
Input: projectId via route parameter
projectProps {
  id: (integer) //OPTIONAL <--- please do not to put this,
  name: (string), //OPTIONAL
  project_tree: (string), //OPTIONAL
}
Response: projectObject (newly updated one)


#### Delete Project
Method: DELETE
Path: /api/project/<projectId>
Input: projectId via route parameter
Response: projectObject (removed one)


#### Generate Project
Method: POST
Path: /api/project/generate
Input: JSON with property username and password
Response: 200 and Object with properties token, username and userId
