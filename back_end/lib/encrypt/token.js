const jwt = require('jsonwebtoken');
var se=require('../../config');
const secretKey =se.secret_key.uuid;

function generateToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: '2h' });
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        console.log('Decoded:', decoded);
        return decoded;
    } catch (err) {
        console.error('Invalid token:', err.message);
        return null;
    }
}

// Token 校验中间件
function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Token is required.' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    req.user = decoded; // 存储解码后的用户信息，以便后续使用
    next(); // Token校验通过，继续执行后续处理逻辑
}

module.exports = { generateToken, verifyToken, authMiddleware };