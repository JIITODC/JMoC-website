const Project = require('../models/Project');

exports.getAllProjects = (req, res) => {
  Project.find({}, (err, projects) => {
    res.render('projects', {
      title: 'Projects',
      projects
    });
  });
  // res.render('home', { title: 'Hello' });
};

exports.getNewProject = (req, res) => {
  res.render('project/new_project', { title: 'New Project' });
};

exports.postNewProject = (req, res, next) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    mentor: req.body.url,
    email: req.user.email
  });
  project.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
