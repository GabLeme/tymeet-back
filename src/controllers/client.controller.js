const clientModel = require('../models/client.model');
const async = require('async');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    create: function (req, res, next) {
        clientModel.create({
            nome: req.body.nome,
        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Cliente adicionado com sucesso", data: null });
        });
    },
    listAll: (req, res, next) => {
        clientModel.find((err, resp) => {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Clientes listados com sucesso", data: resp });
        })
    }
}
