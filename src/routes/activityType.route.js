const activityTypeController = require('../controllers/activityType.controller');

module.exports = app => {
    app.post('/activityType', (req, res, next) => {
        activityTypeController.create(req, res, next);
    });

    app.get('/activityType/list', (req, res, next) => {
        activityTypeController.listAll(req, res, next);
    });
}
