const db = require('../models');
const moment = require('moment');
const User = db.user;

checkData = (req,res, next) => {
    if(
        !req.body.firstname ||
        !req.body.email ||
        !req.body.password
    ) return res.status(401).send({ error: true, message: "L'une ou plusieurs des données obligatoire sont manquantes" });

    if(req.body.date_naissance) {
        if(!moment(req.body.date_naissance, 'MM-DD-YYYY').isValid()) 
            return res.status(401).send({ error: true, message: "L'un des données obligatoire ne sont pas conformes" })
    }
    next()
}

checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if(err) return res.status(500).send({ error: true, message: err });

        if(user) return res.status(401).send({ error: true, message: "Votre email n'est pas correct" });

        next()
    })
}

const verifyRegister = {
    checkData,
    checkDuplicateEmail
}

module.exports = verifyRegister