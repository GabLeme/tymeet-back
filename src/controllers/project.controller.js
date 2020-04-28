const projectModel = require('../models/project.model');
const userModel = require('../models/user.model');
const async = require('async');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    create: function (req, res, next) {
        projectModel.create({
            nome: req.body.nome,
        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Projeto adicionado com sucesso", data: null });
        });
    },
    listByUser: (req, res, next) => {

        console.log(req.query.user)
        async.waterfall([
            (cb) => {
                userModel.findById(req.query.user, (err, user) => {
                    if (!err)
                        cb(null, user['projetos']);
                    else
                        cb(err);
                })
            },
            (projectsId, cb) => {
                console.log(projectsId)
                projectModel
                .find()
                .where('_id')
                .in(projectsId)
                .exec((err, projects) => {
                    console.log(err, projects)
                    if (!err)
                        res.json({ status: "success", message: "Projetos listados com sucesso", data: projects });
                    else
                        cb(err);
                })
            }
        ], (err) => {
            next(err);
        })
    }
}
