const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if(err instanceof TokenExpiredError) return res.status(401).send({ error: true, message: "Votre token n'est plus valide, veuillez le reinitialiser" });

    return res.status(401).send({ error: true, message: "Le token envoyez n'existe pas" })
}

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if(!token) {
        return res.status(401).send({ message: "Token envoyez n'est pas conforme" })
    }

    jwt.verify(token, config.jwt_key, (err, decoded) => {
        if(err) return catchError(err, res);
        next()
    })
}

const authJwt = {
    verifyToken
};

module.exports = authJwt
