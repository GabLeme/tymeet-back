const projectController = require('../controllers/project.controller');

module.exports = app => {
    app.post('/projects', (req, res, next) => {
        projectController.create(req, res, next);
    });

    app.get('/projects/list', (req, res, next) => {
        projectController.listByUser(req, res, next);
    });
}
