var express = require('express');
var router = express.Router();
const query = require('../lib/datasource/mysql_connection_promise');  // Database connection
const { verifyToken, generateToken,get_uid } = require('../lib/encrypt/token');
const {error_control}=require('../lib/life_cycle/error_control');

router.post('/add_CounselingRecords', async (req, res, next) => {
    try {
        let token = req.headers.token;
        let { AppointmentID, StartTime, EndTime, Content, CounselorFeedback } = req.body;

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

        // 插入操作
        const result = await query({
            sql: `INSERT INTO jinitaimei.CounselingRecords 
                  (AppointmentID, StartTime, EndTime, Content, CounselorFeedback)
                  VALUES (?, ?, ?, ?, ?);`,
            values: [AppointmentID, StartTime, EndTime, Content, CounselorFeedback],
        });
        
        return res.status(200).json({ message: 'Counseling record added successfully.' });
    } catch (error) {
        console.error(error);
        error_control(error, res, req, true);
    }
});

router.post('/update_CounselingRecords', async (req, res, next) => {
    try {
        let token = req.headers.token;
        let { AppointmentID, StartTime, EndTime, Content, CounselorFeedback } = req.body;

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
            sql: `UPDATE jinitaimei.CounselingRecords
                  SET StartTime = ?, EndTime = ?, Content = ?, CounselorFeedback = ?
                  WHERE AppointmentID = ?;`,
            values: [StartTime, EndTime, Content, CounselorFeedback, AppointmentID],
        });
        
        return res.status(200).json({ message: 'Counseling record updated successfully.' });
    } catch (error) {
        console.error(error);
        error_control(error, res, req, true);
    }
});

router.post('/delete_CounselingRecords', async (req, res, next) => {
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
            sql: `DELETE FROM jinitaimei.CounselingRecords
                  WHERE AppointmentID = ?;`,
            values: [AppointmentID],
        });
        
        return res.status(200).json({ message: 'Counseling record deleted successfully.' });
    } catch (error) {
        console.error(error);
        error_control(error, res, req, true);
    }
});

router.post('/get_CounselingRecord', async (req, res, next) => {
    try {
        let token = req.headers.token;
        let { RecordID, AppointmentID } = req.body;

        if (!token) {
            return res.status(401).json({ message: 'Token is required.' });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }

        if (!RecordID && !AppointmentID) {
            return res.status(400).json({ message: 'Either RecordID or AppointmentID is required.' });
        }

        let sql = 'SELECT * FROM jinitaimei.CounselingRecords WHERE';
        let values = [];

        if (RecordID) {
            sql += ' RecordID = ?';
            values.push(RecordID);
        } 
        
        if (AppointmentID) {
            if (values.length > 0) {
                sql += ' OR';
            }
            sql += ' AppointmentID = ?';
            values.push(AppointmentID);
        }

        const result = await query({
            sql: sql,
            values: values,
        });

        if (result.length === 0) {
            return res.status(404).json({ message: 'Record not found.' });
        }

        return res.status(200).json({ record: result });
    } catch (error) {
        console.error(error);
        error_control(error, res, req, true);
    }
});

module.exports = router;