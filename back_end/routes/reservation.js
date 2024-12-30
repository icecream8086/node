var express = require('express');
var router = express.Router();
const query = require('../lib/datasource/mysql_connection_promise');  // Database connection
const { verifyToken, generateToken,get_uid } = require('../lib/encrypt/token');
const {error_control}=require('../lib/life_cycle/error_control');

router.post('/add_PsychologicalRecords', async (req, res, next) => {
    try {
        let token = req.headers.token;
        let { CounselorID, AppointmentDate, AppointmentTime, AppointmentStatus = '否' } = req.body;

        if (!token) {
            return res.status(401).json({ message: 'Token is required.' });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }
        
        let UserID = get_uid(token);  // 从token获取user_id

        if (!CounselorID || !AppointmentDate || !AppointmentTime) {
            return res.status(400).json({ message: 'CounselorID, AppointmentDate, and AppointmentTime are required.' });
        }

        const result = await query({
            sql: `INSERT INTO jinitaimei.Appointments (UserID, CounselorID, AppointmentDate, AppointmentTime, AppointmentStatus)
                  VALUES (?, ?, ?, ?, ?);`,
            values: [UserID, CounselorID, AppointmentDate, AppointmentTime, AppointmentStatus],
        });
        return res.status(200).json({ message: 'Appointment added successfully.' });
    } catch (error) {
        console.error(error);
        error_control(error, res, req, true);
    }
});
router.post('/update_PsychologicalRecords', async (req, res, next) => {
    try {
        let token = req.headers.token;
        let { AppointmentID, AppointmentDate, AppointmentTime, AppointmentStatus } = req.body;

        if (!token) {
            return res.status(401).json({ message: 'Token is required.' });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }

        let UserID = get_uid(token);  // 从 token 获取 user_id

        if (!AppointmentID) {
            return res.status(400).json({ message: 'AppointmentID is required.' });
        }

        // 更新操作
        const result = await query({
            sql: `UPDATE Appointments
                  SET UserID = ?, AppointmentDate = ?, AppointmentTime = ?, AppointmentStatus = ?
                  WHERE AppointmentID = ?;`,
            values: [UserID, AppointmentDate, AppointmentTime, AppointmentStatus, AppointmentID],
        });        
        return res.status(200).json({ message: 'Psychological record updated successfully.' });
    } catch (error) {
        console.error(error);
        error_control(error, res, req, true);
    }
});

router.post('/delete_PsychologicalRecords', async (req, res, next) => {
    try {
        let token = req.headers.token;
        let { AppointmentID } = req.body;

        if (!token) {
            return res.status(401).json({ message: 'Token is required.' });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }

        let UserID = get_uid(token);  // 从 token 获取 user_id

        if (!AppointmentID) {
            return res.status(400).json({ message: 'AppointmentID is required.' });
        }

        // 删除操作
        const result = await query({
            sql: `DELETE FROM Appointments
                  WHERE AppointmentID = ? AND UserID = ?;`,
            values: [AppointmentID, UserID],
        });
        
        return res.status(200).json({ message: 'Psychological record deleted successfully.' });
    } catch (error) {
        console.error(error);
        error_control(error, res, req, true);
    }
});

router.get('/get_PsychologicalRecords', async (req, res, next) => {
    try {
        let token = req.headers.token;

        if (!token) {
            return res.status(401).json({ message: 'Token is required.' });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }
        
        var UserID = get_uid(token);  
        const result = await query({
            sql: `SELECT * FROM Appointments WHERE UserID = ?`,
            values: [UserID],
        });

        if (result.length === 0) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        return res.status(200).json({ record: result[0] });
    } catch (error) {
        console.error(error);
        error_control(error, res, req, true);
    }
});


module.exports = router;