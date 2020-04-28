const centroCustoModel = require('../models/centroCusto.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    create: function (req, res, next) {
        centroCustoModel.create({
            nome: req.body.nome,
        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Centro de custo adicionado com sucesso", data: null });
        });
    },
    listAll: (req, res, next) => {
        centroCustoModel.find((err, resp) => {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Centros de custo listados com sucesso", data: resp });
        })
    }
}
