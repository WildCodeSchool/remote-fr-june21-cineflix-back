const jwt = require("jsonwebtoken");

function verify(req, res, next) {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) res.status(403).json("le token n'est pas valide!");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("vous n'êtes pas authentifié");
    }
}

module.exports = verify;