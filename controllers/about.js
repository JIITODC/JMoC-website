exports.getAbout = (req, res) => {
    res.render('about', {
        title: 'About'
    });
};