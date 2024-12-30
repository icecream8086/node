const query = require('../datasource/mysql_connection_promise');
const { verifyToken } = require('./token');
const { error_control } = require('../life_cycle/error_control');

// @ts-ignore
async function checkAdminPermission(req, res, next) {
    try {
        let token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: 'Token is required.' });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }

        // @ts-ignore
        if (decoded.CounselorID) {
            // 检查 Counselor 是否有管理员权限
            const checkAdminQuery = await query({
                sql: `SELECT IsAdmin FROM CounselorLogins WHERE CounselorID = ?;`,
                // @ts-ignore
                values: [decoded.CounselorID],
            });

            let adminResult = JSON.parse(JSON.stringify(checkAdminQuery));

            if (adminResult.length === 0) {
                return res.status(404).json({ message: 'Counselor not found.' });
            }

            if (adminResult[0].IsAdmin) {
                return next();
            } else {
                return res.status(403).json({ message: 'User does not have admin permission.' });
            }
            // @ts-ignore
        } else if (decoded.UserID) {
            // 针对 User 检查管理员权限（假设有类似 UserLogins 表）
            const checkUserAdminQuery = await query({
                sql: `SELECT IsAdmin FROM UserLogins WHERE UserID = ?;`,
                // @ts-ignore
                values: [decoded.UserID],
            });

            let userAdminResult = JSON.parse(JSON.stringify(checkUserAdminQuery));

            if (userAdminResult.length === 0) {
                return res.status(404).json({ message: `User not found.` });
            }

            if (userAdminResult[0].IsAdmin) {
                return next();
            } else {
                return res.status(403).json({ message: 'User does not have admin permission.' });
            }
        } else {
            return res.status(400).json({ message: `Invalid token payload.` });
        }
    } catch (error) {
        return error_control(error, res, req);
    }
}

module.exports = { checkAdminPermission };