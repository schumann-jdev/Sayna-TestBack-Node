const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;


exports.user = (req, res) => {
    let token = req.headers["x-access-token"];

    jwt.verify(token, config.jwt_key, (err, decoded) => {
        if(err) return res.status(500).send({ error: true, message: err });
        User.findById(decoded.id).exec((err, user) => {
            if(err) return res.status(500).send({ error: true, mesage: err });

            res.status(200).send({
                error: false,
                user: {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    date_naissance: user.date_naissance,
                    sexe: user.sexe,
                    createdAt: new Date(decoded.iat *1000).toLocaleString('fr-FR', { timezone: 'UTC' })
                }
            })
        })

    })
}

exports.editUser = (req, res) => {
    if(!req.body.firstname && !req.body.lastname && !req.body.date_naissance && !req.body.sexe) {
        return res.status(401).send({ error: true, message: "Aucun données n'a été envoyée" })
    }

    let token = req.headers["x-access-token"];

    jwt.verify(token, config.jwt_key, (err, decoded) => {
        if(err) return res.status(500).send({ error: true, message: err });
        
        User.findById(decoded.id).exec((err, user) => {
            if(err) return res.status(500).send({ error: true, message: err });

            if(req.body.firstname) user.firstname = req.body.firstname;
            
            if(req.body.lastname) user.lastname = req.body.lastname;

            if(req.body.date_naissance) user.date_naissance = req.body.date_naissance;

            if(req.body.sexe) user.sexe = user.sexe = req.body.sexe;

            user.save(err => {
                if(err) return res.status(500).send({ error: true, message: err });

                res.status(200).send("Lútilisateur à été modifiée avec succès")
            })
        }) 
    })
}

exports.allUsers = (req, res) => {
    User.find().select('firstname lastname email sexe').exec((err, users) => {
        if(err) return res.status(500).send({ erro: true, message: err });
        return res.status(200).send({ error: false, users: users })
    })
}

exports.logout = (req, res) => {
    let token = req.headers["x-access-token"];
    jwt.verify(token, config.jwt_key, (err, decoded) => {
        User.findOne({
                _id: decoded.id
        })
            .exec((err, user) => {
                if(err) return res.status(500).send({ error: true, message: err });
                if(user) {
                    user.token = null;
                    user.authError = 0;
                    user.profilActive = true;
                    user.refresh_token = null;
                    user.save(err => {
                        if(err) return res.status(500).send({ message: err });

                        res.send({ message: "User loged out successfully" })
                    })
                }
            })
    })
}