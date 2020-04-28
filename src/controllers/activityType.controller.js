const activityTypeModel = require('../models/activityType.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    create: function (req, res, next) {
        activityTypeModel.create({
            nome: req.body.nome,
        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Tipo de atividade adicionada com sucesso", data: null });
        });
    },
    listAll: (req, res, next) => {
        activityTypeModel.find((err, resp) => {
            if(err)
                next(err);
            else
                res.json({ status: "success", message: "Tipos de atividades listada com sucesso", data: resp });
        })
    }
}
