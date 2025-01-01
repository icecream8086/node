// @ts-nocheck
var express = require('express');
var router = express.Router();
const query = require('../lib/datasource/mysql_connection_promise');  // Database connection
const { verifyToken, generateToken, get_counselorID, get_uid } = require('../lib/encrypt/token');
const { error_control } = require('../lib/life_cycle/error_control');
const { checkAdminPermission } = require('../lib/encrypt/permission');

router.post('/login', async (req, res) => {
    try {
        let { usernameOrEmail, password } = req.body;
        if (!usernameOrEmail || !password) {
            return res.status(400).json({ message: 'Username or email and password are required.' });
        }

        // 查询咨询员的密码
        const checkPasswordQuery = await query({
            sql: `SELECT Password FROM CounselorLogins WHERE Username = ?;`,
            values: [usernameOrEmail],
        });

        let passwordResult = JSON.parse(JSON.stringify(checkPasswordQuery));

        // 获取咨询员信息
        const getUserInfoQuery = await query({
            sql: `SELECT LoginID, CounselorID, Username FROM CounselorLogins WHERE Username = ?;`,
            values: [usernameOrEmail],
        });

        let userInfo = JSON.parse(JSON.stringify(getUserInfoQuery));

        if (passwordResult.length > 0 && passwordResult[0].Password === password) {
            var payload = userInfo[0];
            //console.log(payload);
            // { LoginID: 2, CounselorID: 2, Username: 'abss' }
            const token = generateToken(payload);
            return res.status(200).json({ token: token });
        } else {
            return res.status(401).json({ message: 'Incorrect username or password.' });
        }
    } catch (error) {
        error_control(error, res, req);
    }
});

router.post('/register', async (req, res) => {
    try {
        let {
            name = null,
            gender = null,
            birthdate = null,
            contactInfo = null,
            certificationNumber = null,
            specialtyArea = null,
            department = null,
            username,
            password,
            isAdmin = 0
        } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        // 插入咨询员信息
        const insertCounselorQuery = await query({
            sql: `INSERT INTO Counselors (Name, Gender, Birthdate, ContactInfo, CertificationNumber, SpecialtyArea, Department) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            values: [name, gender, birthdate, contactInfo, certificationNumber, specialtyArea, department],
        });

        // 获取新插入咨询员的ID
        const counselorID = insertCounselorQuery.insertId;

        // 插入登录信息
        const insertLoginQuery = await query({
            sql: `INSERT INTO CounselorLogins (CounselorID, Username, Password, IsAdmin) VALUES (?, ?, ?, ?)`,
            values: [counselorID, username, password, isAdmin],
        });

        res.status(201).json({
            message: 'Registration successful.',
            counselorID: counselorID,
            username: username
        });
    } catch (error) {
        error_control(error, res, req);
    }
});

router.post('/updateCounselorInfo', async (req, res) => {
    try {
        let token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: 'Token is required.' });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }

        let { name, gender, birthdate, contactInfo, certificationNumber, specialtyArea, department } = req.body;
        const results = verifyToken(token);
        counselorID = get_counselorID(token);
        // 构建动态更新的SQL语句
        let updateFields = [];
        let values = [];

        if (name) {
            updateFields.push("Name = ?");
            values.push(name);
        }
        if (gender) {
            updateFields.push("Gender = ?");
            values.push(gender);
        }
        if (birthdate) {
            updateFields.push("Birthdate = ?");
            values.push(birthdate);
        }
        if (contactInfo) {
            updateFields.push("ContactInfo = ?");
            values.push(contactInfo);
        }
        if (certificationNumber) {
            updateFields.push("CertificationNumber = ?");
            values.push(certificationNumber);
        }
        if (specialtyArea) {
            updateFields.push("SpecialtyArea = ?");
            values.push(specialtyArea);
        }
        if (department) {
            updateFields.push("Department = ?");
            values.push(department);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ message: 'No fields to update.' });
        }

        values.push(counselorID);

        const sql = `UPDATE Counselors SET ${updateFields.join(", ")} WHERE CounselorID = ?`;

        await query({ sql, values });

        return res.status(200).json({ message: 'Counselor information updated successfully.' });

    } catch (error) {
        error_control(error, res, req);
    }
});

router.post('/updatePassword', async (req, res) => {
    try {
        let token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: 'Token is required.' });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }

        let { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Old and new passwords are required.' });
        }

        const results = verifyToken(token);
        const counselorID = results.CounselorID;
        if (!counselorID) {
            return res.status(400).json({ message: 'Counselor ID is required.' });
        }

        // 查询当前密码
        const checkPasswordQuery = await query({
            sql: `SELECT Password FROM CounselorLogins WHERE CounselorID = ?;`,
            values: [counselorID],
        });

        let passwordResult = JSON.parse(JSON.stringify(checkPasswordQuery));

        if (passwordResult.length === 0) {
            return res.status(404).json({ message: 'Counselor not found.' });
        }

        if (passwordResult[0].Password !== oldPassword) {
            return res.status(401).json({ message: 'Old password is incorrect.' });
        }

        // 更新密码
        await query({
            sql: `UPDATE CounselorLogins SET Password = ? WHERE CounselorID = ?;`,
            values: [newPassword, counselorID],
        });

        return res.status(200).json({ message: 'Password updated successfully.' });

    } catch (error) {
        errorControl(error, res, req);
    }
});

router.post('/updateCounselorInfo_admin', checkAdminPermission, async (req, res) => {
    try {
        let token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: 'Token is required.' });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }

        let { counselorID, name, gender, birthdate, contactInfo, certificationNumber, specialtyArea, department } = req.body;
        const results = verifyToken(token);
        counselorID = results.CounselorID;
        if (!counselorID) {
            return res.status(400).json({ message: 'Counselor ID is required.' });
        }

        // 构建动态更新的SQL语句
        let updateFields = [];
        let values = [];

        if (name) {
            updateFields.push("Name = ?");
            values.push(name);
        }
        if (gender) {
            updateFields.push("Gender = ?");
            values.push(gender);
        }
        if (birthdate) {
            updateFields.push("Birthdate = ?");
            values.push(birthdate);
        }
        if (contactInfo) {
            updateFields.push("ContactInfo = ?");
            values.push(contactInfo);
        }
        if (certificationNumber) {
            updateFields.push("CertificationNumber = ?");
            values.push(certificationNumber);
        }
        if (specialtyArea) {
            updateFields.push("SpecialtyArea = ?");
            values.push(specialtyArea);
        }
        if (department) {
            updateFields.push("Department = ?");
            values.push(department);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ message: 'No fields to update.' });
        }

        values.push(counselorID);

        const sql = `UPDATE Counselors SET ${updateFields.join(", ")} WHERE CounselorID = ?`;

        await query({ sql, values });

        return res.status(200).json({ message: 'Counselor information updated successfully.' });

    } catch (error) {
        error_control(error, res, req);
    }
});

router.post('/get_all', async (req, res) => {
    try {


        const getUserInfoQuery = await query({
            sql: `SELECT * FROM Counselors;`,
        });

        let userInfo = JSON.parse(JSON.stringify(getUserInfoQuery));
        res.status(200).json({ counselor: userInfo });

    } catch (error) {
        error_control(error, res, req);
    }
});

// // 示例路由，只有管理员可以访问
// app.post('/protected', checkAdminPermission, (req, res) => {
//   return res.status(200).json({ message: 'Welcome, Admin!' });
// });
module.exports = router;