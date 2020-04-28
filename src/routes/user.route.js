const userController = require('../controllers/user.controller');

module.exports = app => {
    app.post('/users/register', (req, res, next) => {
        userController.create(req, res, next);
    });
    app.post('/users/authenticate', (req, res, next) => {
        userController.authenticate(req, res, next);
    });
    app.get('/users/list', (req, res, next) => {
        userController.listAll(req, res, next);
    });

}
