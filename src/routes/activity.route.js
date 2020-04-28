const activityController = require('../controllers/activity.controller');

module.exports = app => {
    app.post('/activities', (req, res, next) => {
        activityController.create(req, res, next);
    });

    app.get('/activities', (req, res, next) => {
        activityController.list(req, res, next);
    });

    app.get('/activities/findby/:id', (req, res, next) => {
        activityController.listById(req, res, next);
    });

    app.get('/activities/totalHours', (req, res, next) => {
        activityController.sumTotalHoursByUser(req, res, next);
    });

    app.get('/activities/totalByProject', (req, res, next) => {
        activityController.totalByProject(req, res, next);
    });

    app.get('/activities/totalByActivityType', (req, res, next) => {
        activityController.totalByActivityType(req, res, next);
    });
}
