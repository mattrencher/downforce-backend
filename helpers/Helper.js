const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_EXPIRE_TIME = 2629746;

exports.verify_token = (token) => {
    try {
        let user = jwt.verify(token, process.env.TOKEN_KEY);
        return {"status": true, "user": user};
    } catch (err) {
        return {"status": false, "user": {}};
    }
}

exports.get_bearer_token = (authorization) => {
    return authorization.replace(/^Bearer\s+/, "");
}

exports.check_password = (password, hash) => {
    return bcrypt.compare(password, hash);
}

exports.generate_password = (password) => {
    return bcrypt.hash(password, 10);
}

exports.generate_token = (id, username) => {
    return jwt.sign(
        {
            'username': username,
            'id': id
        },
        process.env.TOKEN_KEY,
        {
            expiresIn: JWT_EXPIRE_TIME
        });
}