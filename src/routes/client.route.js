const clientsController = require('../controllers/client.controller');

module.exports = app => {
    app.post('/clients', (req, res, next) => {
        clientsController.create(req, res, next);
    });

    app.get('/clients/list', (req, res, next) => {
        clientsController.listAll(req, res, next);
    });
}
