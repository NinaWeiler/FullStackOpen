# Bloglist #

Starting a project steps:

npm init

* create .gitignore file and add node_modules in it

npm install --save-dev nodemon

packages to install:

express 

cors

mongoose


*package.json:*
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "\"echo \\ \"Error: no test specified\\\" && exit 1\""
  },


## Connecting to MongoDB ##
* Create a new project
* Create a cluster
    * AWS, Frankfurt
* Database Access 
    * Add a New user with read and write permissions
* Network Access
    * Allow access from anywhere
* Clusters -> Connect
    * Connect your application
    * MongoDB URI 

## Secure database ##
* npm install dotenv
* create .env file
* add .env to the .gitignore

## Running the project ##

run with nodemon:
```
npm run dev 

## Testing ##
npm install --save-dev jest

*package.json:*
"test": "jest --verbose"
// at the end of the file
 "jest": {
    "testEnvironment": "node"
  }


