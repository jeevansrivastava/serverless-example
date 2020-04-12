const Assignment = require('../model/assignment');


module.exports = {

async createAssignment (assignment) {
  let result = await Assignment.create(assignment);
  if(result) {
    return {
      data: assignment,
      message: "Assignment successfully created!"
    };
  }
return "Error creating new Assignment"

},


async getAllAssignment()  {
  let assignments = await Assignment.find();
  if(assignments)  return assignments;
  return "Error fetching assignments from db"
},


async getAssignmentById(assignmentId)  {
  let product = await Assignment.findOne(assignmentId);
  if(product) return product;
  return "Error fetching product from db";
},
};
