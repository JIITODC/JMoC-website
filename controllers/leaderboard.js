exports.getLeaderboard = (req, res) => {
    res.render('leaderboard', {
        title: 'Leaderboard'
    });
};