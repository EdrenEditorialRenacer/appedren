const pool = require('../database');




module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    },
    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {

            return next();
        }
        return res.redirect('/home');
    },
    authRole(role) {
        return (req, res, next) => {
            if (req.user.role !== role) {
                res.status(401)
                return res.send('No Authorized')
            }
            next()
        }
    }

}