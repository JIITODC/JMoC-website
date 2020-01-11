const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  mentor: String,
  email: String,
  chat: String
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
