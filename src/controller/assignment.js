const serverless = require('serverless-http');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const uuid = require('uuid/v4');

const dbConnection = require('../../dbConfigs');
const AssignmentService = require('../services/assignment');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//  base url to test our API
app.get('/index', async (req, res) => {
   await res.send("<h3>Welcome to the Assignment API!!</h3>")
})

//  function for creating a new assignment
app.post('/', async (req, res) => {
  try {
   await dbConnection();
   const data  = req.body;
   const {name, type, description, groups} = data;
 if(!data) {
     return "Please pass all required fields!"
   }
   const dataToSave = {name,type,description,groups,assignmentId:uuid()};
   let createAssignment =  await AssignmentService.createAssignment(dataToSave);
   if (createAssignment) {
     return res.status(200).send(
      createAssignment
    )
   }
  } catch (error) {
    //  handle errors here
    console.log(error, "error!!");
  }
})

//  function for getting all assignments
app.get('/', async (req, res) => {
try {
    await dbConnection();
    const allAssignments = await AssignmentService.getAllAssignment();
    if (allAssignments) {
      return res.status(200).send({
        data: allAssignments
      })
    }
  } catch (error) {
     //  handle errors here
     console.log(error, "error!!");
  }
})


//  function for getting a  assignment by Id
app.get('/:assignmentId/', async (req, res) => {
  try {
    await dbConnection();
    const {assignmentId} = req.params;
    const getAssignment = await AssignmentService.getAssignmentById({assignmentId});
    if(getAssignment) {
      return res.status(200).send({
        data: getAssignment
      })
    }
  } catch (error) {
     //  handle errors here
     console.log(error, "error!!");
  }
});

module.exports.handler = serverless(app);
