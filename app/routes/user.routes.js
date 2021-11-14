const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next()
    });

    app.get(
        "/user",
        [
            authJwt.verifyToken
        ],
        controller.user
    );
    app.put(
        "/user",
        [
            authJwt.verifyToken
        ],
        controller.editUser
    );
    app.get(
        "/users",
        [
            authJwt.verifyToken,
        ],
        controller.allUsers
    );
    app.delete("/user", controller.logout)
}