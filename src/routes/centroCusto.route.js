const centroCustoController = require('../controllers/centroCusto.controller');

module.exports = app => {
    app.post('/centroCusto', (req, res, next) => {
        centroCustoController.create(req, res, next);
    });

    app.get('/centroCusto/list', (req, res, next) => {
        centroCustoController.listAll(req, res, next);
    });
}
