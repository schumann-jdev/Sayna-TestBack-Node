const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

exports.register = (req, res) => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        date_naissance: req.body.date_naissance,
        sexe: req.body.sexe
    });
    let refreshToken = uuidv4();

    user.save((err, user) => {
        if(err) return res.status(500).send({ error: true, message: err });
        let token = jwt.sign(
            {
                id: user.id
            },
            config.jwt_key,
            {
                expiresIn: config.jwt_Expiration
            }
        );
        res.status(201).send({
            error: false,
            message: "L'utilisateur a bien été créé avec succès",
            tokens: {
                token: token,
                refresh_token: refreshToken,
                createdAt: new Date(jwt.decode(token, config.jwt_key).iat *1000).toLocaleString('fr-FR', { timezone: 'UTC' })
            }
        })
    })
}

exports.login = (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .exec((err, user) => {
            if(err) return res.status(500).send({ error: true, message: err });

            if(!user) return res.status(401).send({ error: true, message: "Votre email ou password est erroné" });

            if(user.profilActive === false) {
                if(!user.activeAt) {

                } else {
                    let diff = Math.abs(new Date() - new Date(user.activeAt));
                    let diffInMinute = Math.floor((diff/1000)/60);
                    if(diffInMinute > 1) {
                        user.authError = 0;
                        user.profilActive = true
                    } else return res.status(409).send({ error: true, message: `Trop de tentative sur l'email ${user.email} - Veuillez patientez ${60 - diffInMinute}mn` })
                }
            }

            let passIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if(!passIsValid) {
                user.authError += 1;
                if(user.authError > 2) {user.profilActive = false; user.activeAt = new Date()};

                user.save(err => {
                    if(err) res.status(500).send({ error: true, message: err })
                });
                return res.status(401).send({ error: true, message: "Votre email ou password est erroné" })
            }

            let token = jwt.sign(
                {
                    id: user.id
                },
                config.jwt_key,
                {
                    expiresIn: config.jwt_Expiration
                }
            );
            let refreshToken = uuidv4();
            user.authError = 0;
            user.token = token;
            user.save(err => {
                if(err) res.status(500).send({ error: true, message: err })
            });

            res.status(200).send({
                error: false,
                message: "L'utilisateur a été authentifié avec succès",
                tokens: {
                    token: token,
                    refresh_token: refreshToken,
                    createdAt: new Date(jwt.decode(token, config.jwt_key).iat *1000).toLocaleString('fr-FR', { timezone: 'UTC' })
                }
            })
        })
}