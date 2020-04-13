const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema (
  {
    name: {type: String},
    type: {type: String},
    description: {type: String},
    groups: { type: Array },
    assignmentId:{type:String}
  },
  {timestamps: true}
);

const AssignmentModel = mongoose.model("assignment", AssignmentSchema);

module.exports = AssignmentModel;

