const activityModel = require('../models/activity.model');
const userModel = require('../models/user.model');
const projectModel = require('../models/project.model');
const activityTypeModel = require('../models/activityType.model');
const async = require('async');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    create: function (req, res, next) {
        if(req.body._id != '' && req.body._id != null && req.body._id != undefined) {
            console.log('entrei update')
            console.log(req.body._id)
            activityModel.findByIdAndUpdate(req.body._id,{
                usuario: req.body.usuario,
                nomeDemanda: req.body.nomeDemanda,
                projeto: req.body.projeto,
                tipoAtividade: req.body.tipoAtividade,
                dataAtividade: req.body.dataAtividade,
                minutosTrabalhados: req.body.minutosTrabalhados,
                descricaoAtividade: req.body.descricaoAtividade,
                centroCusto: req.body.centroCusto
            }, function (err, result) {
                if (err)
                    next(err);
                else
                    res.json({ status: "success", message: "Atividade adicionada com sucesso", data: null });
            });
        }
        else {
            console.log('entrei insert      ')
            activityModel.create({
                usuario: req.body.usuario,
                nomeDemanda: req.body.nomeDemanda,
                projeto: req.body.projeto,
                tipoAtividade: req.body.tipoAtividade,
                dataAtividade: req.body.dataAtividade,
                minutosTrabalhados: req.body.minutosTrabalhados,
                descricaoAtividade: req.body.descricaoAtividade,
                centroCusto: req.body.centroCusto
            }, function (err, result) {
                if (err)
                    next(err);
                else
                    res.json({ status: "success", message: "Atividade adicionada com sucesso", data: null });
            });
        }
    },
    sumTotalHoursByUser: function (req, res, next) {
        activityModel.find(
            {
                'usuario': req.query.user
            },
            (err, result) => {
                let sum = 0;
                result.forEach((activity) => {
                    sum += activity['minutosTrabalhados'];
                })

                if (err) next(err);
                else res.json({
                    status: "success", message: "Total de horas trabalhadas", data: {
                        total: sum
                    }
                })
            })
    },
    totalByProject: (req, res, next) => {
        async.waterfall([
            (cb) => {
                if (req.query.user != 'unselected') {

                    userModel.findById(req.query.user, (err, user) => {
                        if (!err)
                            cb(null, user['projetos'], req.query.user);
                        else
                            cb(err);
                    })
                } else {
                    projectModel.find((err, results) => {
                        if (err) cb(err)
                        else {
                            let ids = [];
                            results.forEach((project) => {
                                ids.push(project['_id']);
                            })

                            cb(null, ids, "unselected");
                        }
                    })
                }
            },
            (projectsId, userId, cb) => {

                if (userId != "unselected") {
                    activityModel.aggregate([
                        {
                            $match: {
                                usuario: mongoose.Types.ObjectId(userId)
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    projeto: "$projeto",
                                },
                                total: {
                                    $sum: "$minutosTrabalhados",
                                }
                            }
                        }
                    ], (err, result) => {
                        if (err) cb(err);
                        else cb(null, result)
                    })
                }
                else {
                    activityModel.aggregate([
                        {
                            $group: {
                                _id: {
                                    projeto: "$projeto",
                                },
                                total: {
                                    $sum: "$minutosTrabalhados",
                                }
                            }
                        }
                    ], (err, result) => {
                        if (err) cb(err);
                        else cb(null, result)
                    })
                }
            },
            (result, cb) => {
                let data = JSON.parse(JSON.stringify(result));
                let metrics = [];
                projectModel.find((err, projects) => {
                    data.forEach((metrica) => {
                        projects.forEach((project) => {
                            if (metrica['_id']['projeto'] == project['_id']) {
                                metrics.push({
                                    projeto: project['nome'],
                                    total: metrica['total']
                                })
                            }
                        })
                    })
                    console.log(metrics)
                    res.json({ status: "success", message: "Metricas retornadas com sucesso", data: metrics });
                })
            }
        ], (err) => {
            next(err);
        })
    },
    totalByActivityType: (req, res, next) => {
        async.waterfall([
            (cb) => {
                if (req.query.user == 'unselected') {
                    activityModel.aggregate([
                        {
                            $group: {
                                _id: {
                                    tipoAtividade: "$tipoAtividade",
                                },
                                total: {
                                    $sum: "$minutosTrabalhados",
                                }
                            }
                        }
                    ], (err, result) => {
                        console.log(result)
                        if (err) cb(err);
                        else cb(null, result)
                    })
                }
                else {
                    activityModel.aggregate([
                        {
                            $match: {
                                usuario: mongoose.Types.ObjectId(req.query.user)
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    tipoAtividade: "$tipoAtividade",
                                },
                                total: {
                                    $sum: "$minutosTrabalhados",
                                }
                            }
                        }
                    ], (err, result) => {
                        console.log(result)
                        if (err) cb(err);
                        else cb(null, result)
                    })
                }
            },
            (result, cb) => {
                let data = JSON.parse(JSON.stringify(result));
                let metrics = [];
                activityTypeModel.find((err, activityType) => {
                    data.forEach((metrica) => {
                        activityType.forEach((acType) => {
                            if (metrica['_id']['tipoAtividade'] == acType['_id']) {
                                metrics.push({
                                    tipoAtividade: acType['nome'],
                                    total: metrica['total']
                                })
                            }
                        })
                    })
                    console.log(metrics)
                    res.json({ status: "success", message: "Metricas retornadas com sucesso", data: metrics });
                })
            }
        ], (err) => {
            next(err);
        })
    },
    list: (req, res, next) => {
        activityModel.find({
            'usuario': req.query.user
        }, (err, activities) => {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Atividades retornadas com sucesso", data: activities });
        })
    },
    listById: (req, res, next) => {
        activityModel.findById(req.params.id, (err, activity) => {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Atividade retornada com sucesso", data: activity });
        })
    }

}