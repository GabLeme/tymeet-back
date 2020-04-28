const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    create: function (req, res, next) {
        userModel.create({ email: req.body.email, senha: req.body.senha, role: req.body.role, projetos: req.body.projetos }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "User added successfully!!!", data: null });

        });
    }, authenticate: function (req, res, next) {
        //console.log(req.body)
        userModel.findOne({ email: req.body.email }, function (err, userInfo) {
            if (err || userInfo == null) {
                next(err);
            } else {
                if (bcrypt.compareSync(req.body.senha, userInfo.senha)) {
                    const token = jwt.sign(
                        { id: userInfo._id },
                        req.app.get('secretKey'),
                        { expiresIn: '1h' });
                    res.json({
                        status: "success",
                        message: "user found!!!",
                        data: {
                            user:
                                userInfo,
                            token: token
                        }
                    });
                } else {
                    res.json({
                        status: "error",
                        message: "invalid e-mail or password",
                        data: null
                    });
                }
            }
        });
    },
    listAll: (req, res, next) => {
        userModel.find((err, results) => {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Usuarios listados com sucesso!!!", data: results });
        })
    }
}