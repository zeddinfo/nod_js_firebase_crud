require('dotenv').config();
const {
    ACCESS_TOKEN
} = process.env;

const jwt = require('jsonwebtoken');

const generateJwt = (params) => {
    const jwtToken = jwt.sign(params, ACCESS_TOKEN);

    return jwtToken;
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, ACCESS_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN, { expiresIn: '60m' });
}

module.exports = {
    generateJwt,
    authenticateToken,
    generateAccessToken,
};