import jwt = require('jsonwebtoken');

export function getJWTToken(data: any) {
    return jwt.sign(data, process.env.JWTPrivateKey);
}

function verifyJWTToken(token: string) {
    return jwt.verify(token, process.env.JWTPrivateKey);
}

export function parseTokenFromHeader(req) {
    let authHeader: string = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return;
    }
    let token = authHeader.split(' ')[1];
    req.user = verifyJWTToken(token);
}