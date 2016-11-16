# React-ion API documentation

## API endpoints
--------------------------------------------------------------

### Authentication

userObject = {
  id: (integer),
  username: (string),
  password: (string),
  salt: (string)
}


#### Create a User / Sign Up
Method: POST
Path: /signup
Input:
{
  username: (string),
  password: (string),
}
Response:
{
  id: (integer),
  username: (string),
}


#### Login
Method: POST
Path: /login
Input:
{
  username: (string),
  password: (string),
}
Response: 200 and userObject


#### Logout
Method: GET
Path: /logout
Input: None
Response: 'Logout Successful'


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


--------------------------------------------------------------

### Authentication

#### Get projects of a user
Method: GET
Path: /api/user/projects
Input: None but need to be authenticated 
Response: Array of projectObjects
