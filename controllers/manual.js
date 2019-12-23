
exports.getStudentManual = (req, res) => {
  res.render('man_student', {
    title: 'Student Manual'
  });
};

exports.getMentorManual = (req, res) => {
  res.render('man_mentor', {
    title: 'Mentor Manual'
  });
};
